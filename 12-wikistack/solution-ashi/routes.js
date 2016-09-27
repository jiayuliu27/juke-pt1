const Promise = require('bluebird')
const {Page, User} = require('./db')

module.exports = require('express').Router()
  .get('/:urlTitle?', (req, res, next) =>
       Page
       .findOne({where: {urlTitle: req.params.urlTitle || null}})
       .then(page => {
         const editing = 'edit' in req.query

         // This is a wiki! If the user tries to visit a page that doesn't exist,
         // we'll just redirect them to edit mode.
         if (!page && !editing) { return res.redirect(req.url + '?edit') }

         // Create a blank page object if no page exists in the DB yet.
         if (!page) page = Page.build({urlTitle: req.params.urlTitle})

         if (editing)
           // We don't have to render markdown if we're in edit mode,
           // so just serve the view.           
           return Promise.props({
             page,
             editing,
             author: page.getAuthor(),
           }).then(props => res.render('edit', props))
         else
           return Promise.props({
             page,
             editing,
             author: page.getAuthor(),
             html: page.html,
           }).then(props => res.render('page', props))
       })
       .catch(next))

  // Redirect /wiki/page to /page
  .get('/wiki/:urlTitle?', (req, res) => res.redirect(`/${req.params.urlTitle || ''}`))

  .post('/:urlTitle?', (req, res, next) => {
    const author = User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      }
    }).then(([author, _wasCreated]) => author)

    const page = Page.findOrCreate({
      where: {urlTitle: req.params.urlTitle || null}
    }).then(([page, _wasCreated]) => page.update({
      title: req.body.title,
      content: req.body.content,
    }))

    return Promise
      .props({page, author})
      .then(({page, author}) => page.setAuthor(author))
      .then(ok => res.redirect(req.params.urlTitle || '/'))
      .catch(next)
  })
