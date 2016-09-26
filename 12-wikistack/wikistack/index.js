const nunjucks = require('nunjucks')

const express = require('express')
const app = express()
      .use(require('body-parser').urlencoded({extended: false}))
      .use(require('morgan')('combined'))

      .use('/static', express.static(__dirname + '/static'))

      .set('view engine', 'html')
      .engine('html', nunjucks.render)
      .use(require('./routes'))

module.exports = app

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
})

if (!module.parent) {
  require('./db').db
    .sync({force: true})
    .then(_ => app.listen(process.env.PORT || 9898))
}
  
