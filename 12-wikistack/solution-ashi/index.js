const nunjucks = require('nunjucks')

const express = require('express')
const app = express()
      .use(require('body-parser').urlencoded({limit: '100mb', extended: false}))
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
    .sync({
      // Destroy the database and recreate tables if and only if we are
      // not running in production, and we've set the FORCE_SYNC_DB
      // environment variable.
      force: process.env.NODE_ENV !== 'production' &&
        'FORCE_SYNC_DB' in process.env})
    .then(_ => app.listen(process.env.PORT || 3000))
}
  
