const {Page} = require('./db')

module.exports = require('express').Router()
  .get('/:urlTitle?', (req, res, next) =>
       Page
       .findOne({where: {urlTitle: req.params.urlTitle || null}})
       .then(page => {
         const editing = 'edit' in req.query

         // This is a wiki! If the user tries to visit a page that doesn't exist,
         // we'll just redirect them to edit mode.
         if (!page && !editing) { return res.redirect(req.url + '?edit') }

         // Create a blank page if no such page exists in the DB.
         if (!page) page = Page.build({urlTitle: req.params.urlTitle})

         // Draw the page
         return res.render(editing? 'edit' : 'page', {page, editing})
       })
       .catch(next))
  .post('/:urlTitle?', (req, res, next) =>
        Page
        .upsert({
          title: req.body.title,
          content: req.body.content,
          urlTitle: req.params.urlTitle || null,
        })
        .then(ok => res.redirect(req.url))
        .catch(next))
           
