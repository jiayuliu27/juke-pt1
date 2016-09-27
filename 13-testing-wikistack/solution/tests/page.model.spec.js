var Page = require('../models').Page;
var chai = require('chai');
var expect = chai.expect;
var Promise = require('bluebird');
chai.use(require('chai-things'));

describe('Page model', function () {
  before(function(){
    return Page.sync({force: true});
  });

  beforeEach(function(){
    return Page.truncate();
  });

  describe('Virtuals', function () {
    var page;
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function(){
        page = Page.build({
          urlTitle: 'Test'
        });

        expect(page.route).to.equal('/wiki/Test');
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function(){
        page = Page.build({
          content: '# This is a header'
        });

        expect(page.renderedContent.trim()).to.equal('<h1 id="this-is-a-header">This is a header</h1>');
      });
    });
  });

  describe('Class methods', function () {
    beforeEach(function(){
      return Promise.all([
        Page.create({
          title: 'Test1',
          content: 'This is only a test.',
          tags: ['test']
        }),
        Page.create({
          title: 'Test2',
          content: 'This is also a test.',
          tags: ['test', 'gha']
        }),
        Page.create({
          title: 'Test3',
          content: 'This is merely a test.',
          tags: ['wikistack']
        })
      ]);
    });

    describe('findByTag', function () {
      it('gets pages with the test tag', function(){
        return Page.findByTag('test')
        .then(function(pages){
          expect(pages).to.have.lengthOf(2);
        })
        .catch(function(err){
          console.log(err);
        });
      });

      it('does not get pages without the search tag', function(done){
        Page.findByTag('pancake')
        .then(function(pages){
          expect(pages).to.have.lengthOf(0);
          done();
        })
        .catch(done);
      });
    });
  });

  describe('Instance methods', function () {
    var page1, page2, page3;

    describe('findSimilar', function () {
      beforeEach(function(){
        return Promise.all([
          Page.create({
            title: 'Rose',
            content: 'Pretty flowers, watch out for thorns',
            tags: ['flower', 'red']
          }),
          Page.create({
            title: 'Strawberry',
            content: 'Edible things, dip in chocolate',
            tags: ['red', 'fruit']
          }),
          Page.create({
            title: 'Banana',
            content: 'Edible things, dip in peanut butter',
            tags: ['fruit', 'yellow']
          })
        ])
        // .then(function(results){
        //   results === [page1, page2, page3];
        // });
        .spread(function(_page1, _page2, _page3){
          page1 = _page1;
          page2 = _page2;
          page3 = _page3;
        });
      });

      it('never gets itself', function(done){
        page1.findSimilar()
        .then(function(results){
          expect(results).to.not.contain.a.thing.with.property('id', page1.id);
          done();
        })
        .catch(done);
      });

      it('gets other pages with any common tags', function(done){
        page1.findSimilar()
        .then(function(results){
          expect(results).to.contain.a.thing.with.property('id', page2.id);
          done();
        })
        .catch(done);
      });

      it('does not get other pages without any common tags', function(done){
        page1.findSimilar()
        .then(function(results){
          expect(results).to.not.contain.a.thing.with.property('id', page3.id);
          done();
        })
        .catch(done);
      });
    });
  });

  describe('Validations', function () {
    var page;
    it('errors without title', function(done){
      page = Page.build({content: 'This page has no title'});
      page.validate()
      .then(function(err){
        expect(err).to.exist;
        expect(err.errors).to.contain.a.thing.with.property('path', 'title');
        done();
      })
      .catch(done);
    });

    it('errors without content', function(done){
      page = Page.build({title: 'This page has no content'});
      page.validate()
      .then(function(err){
        expect(err).to.exist;
        expect(err.errors).to.contain.a.thing.with.property('path', 'content');
        done();
      })
      .catch(done);
    });

    it('errors given an invalid status', function(done){
      page = Page.build({
        title: 'Yet another test',
        urlTitle: 'Yet_another_test',
        content: 'Yup, same old thing',
        status: 'test'
      })

      // have to actually save to run the enum validation, can't just .validate
      page.save()
      .then(null, function(err){
        expect(err.message).to.contain('status');
        done();
      });
    });
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating', function(done){
      var page = Page.build({
        title: 'The Who',
        content: 'A band on first base'
      });

      page.save()
      .then(function(page){
        expect(page.urlTitle).to.equal('The_Who');
        done();
      })
    });
  });
});

