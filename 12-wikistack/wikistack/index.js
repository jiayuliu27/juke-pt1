const nunjucks = require('nunjucks')

const express = require('express')
const app = express()
      .use(require('body-parser').urlencoded({extended: false}))
      .use(require('morgan')('combined'))

      .set('view engine', 'html')
      .engine('html', nunjucks.render)
      .use(require('./routes'))

module.exports = app

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

if (!module.parent) {
  app.listen(process.env.PORT || 9898)  
}
  
