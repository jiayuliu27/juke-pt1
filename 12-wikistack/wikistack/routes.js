module.exports = require('express').Router()
  .get('/:urlTitle', (req, res, next) =>
       res.render('show', {
         page: {title: 'asdf', content: 'foo bar baz'}
       }))
