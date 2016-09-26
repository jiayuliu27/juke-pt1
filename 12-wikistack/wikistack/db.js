const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/wikistack')

const marked = require('marked')
const Page = db.define('page', {
  title: {
    type: Sequelize.STRING
  },
  urlTitle: {
    type: Sequelize.STRING,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
}, {
  getterMethods: {
    html() {
      return new Promise((ok, fail) =>
                         marked(wikiToMarkdown(this.content),
                                (err, content) => err ? fail(err) : ok(content)))
    }
  }
})

// wikify(content: String) -> String
//
// Convert "[[wiki links]]" within content into markdown-style
// "[wiki links](wiki_links)".
//
// Will also convert "[[some title|with different text]]" into
// "[with different text](some_title)".
function wikiToMarkdown(content) {
  return (content || '').replace(/\[\[([\w\s\d]+)(\|([\w\s\d]+))?\]\]/g,
                                 (match, title, _, text) => {
                                   console.log('in rpelace', match, text, title)
                                   return `[${(text || title).trim()}](${asLink(title)})`
                                 })
}

// asLink(title: String) -> String
//
// Convert "wiki links" into "wiki_links"
function asLink(title) {
  return title.replace(/\s/g, '_')
}

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
})

Page.belongsTo(User, {as: 'author'})

module.exports = {db, Page, User}
