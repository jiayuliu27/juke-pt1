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
           return res.render('edit', {page, editing})
         else
           // Render the markdown first, then serve the show view.
           return page.html.then(html =>
                                 res.render('page', {html, page, editing}))
       })
       .catch(next))
  // Redirect /wiki/page to /page
  .get('/wiki/:urlTitle?', (req, res) => {
    console.log('redirecting', req.url, 'to', req.params.urlTitle)
    res.redirect(`/${req.params.urlTitle || ''}`)
  })
  .post('/:urlTitle?', (req, res, next) =>
        User.findOrCreate({
          where: {
            name: req.body.name,
            email: req.body.email,
          }
        }).then(user =>
                Page
                .upsert({
                  title: req.body.title,
                  content: req.body.content,
                  urlTitle: req.params.urlTitle || null,
                  author: user,                  
                }))
        .then(ok => res.redirect(req.params.urlTitle || '/'))
        .catch(next))
           
