// var Page = require('../models').Page;
// var chai = require('chai');
// chai.use(require('chai-things'));
// chai.use(require('chai-as-promised'));
// var expect = chai.expect;
// var Promise = require('bluebird');

// describe('Page model (promise-y tests)', function () {
//   before(function(){
//     return Page.sync({force: true});
//   });

//   beforeEach(function(){
//     return Page.truncate();
//   });

//   describe('Virtuals', function () {
//     var page;
//     describe('route', function () {
//       it('returns the url_name prepended by "/wiki/"', function(){
//         page = Page.build({
//           urlTitle: 'Test'
//         });

//         expect(page.route).to.equal('/wiki/Test');
//       });
//     });
//     describe('renderedContent', function () {
//       it('converts the markdown-formatted content into HTML', function(){
//         page = Page.build({
//           content: '# This is a header'
//         });

//         expect(page.renderedContent.trim()).to.equal('<h1 id="this-is-a-header">This is a header</h1>');
//       });
//     });
//   });

//   describe('Class methods', function () {
//     beforeEach(function(){
//       return Promise.all([
//         Page.create({
//           title: 'Test1',
//           content: 'This is only a test.',
//           tags: ['test']
//         }),
//         Page.create({
//           title: 'Test2',
//           content: 'This is also a test.',
//           tags: ['test', 'gha']
//         }),
//         Page.create({
//           title: 'Test3',
//           content: 'This is merely a test.',
//           tags: ['wikistack']
//         })
//       ]);
//     });

//     describe('findByTag', function () {
//       it('gets pages with the test tag', function(){
//         return expect(Page.findByTag('test')).to.eventually.have.lengthOf(2);
//       });

//       it('does not get pages without the search tag', function(){
//         return expect(Page.findByTag('pancake')).to.eventually.have.lengthOf(0);
//       });
//     });
//   });

//   describe('Instance methods', function () {
//     var page1, page2, page3;

//     describe('findSimilar', function () {
//       beforeEach(function(){
//         return Promise.all([
//           Page.create({
//             title: 'Rose',
//             content: 'Pretty flowers, watch out for thorns',
//             tags: ['flower', 'red']
//           }),
//           Page.create({
//             title: 'Strawberry',
//             content: 'Edible things, dip in chocolate',
//             tags: ['red', 'fruit']
//           }),
//           Page.create({
//             title: 'Banana',
//             content: 'Edible things, dip in peanut butter',
//             tags: ['fruit', 'yellow']
//           })
//         ])
//         .spread(function(_page1, _page2, _page3){
//           page1 = _page1;
//           page2 = _page2;
//           page3 = _page3;
//         });
//       });

//       it('never gets itself', function(){
//         return expect(page1.findSimilar()).to.eventually.not.contain.a.thing.with.property('id', page1.id);
//       });

//       it('gets other pages with any common tags', function(){
//         expect(page1.findSimilar()).to.eventually.contain.a.thing.with.property('id', page2.id);
//       });

//       it('does not get other pages without any common tags', function(){
//         return expect(page1.findSimilar()).to.eventually.not.contain.a.thing.with.property('id', page3.id);
//       });
//     });
//   });

//   describe('Validations', function () {
//     var page;
//     it('errors without title', function(){
//       page = Page.build({content: 'This page has no title'});
//       return page.validate()
//       .then(function(err){
//         expect(err).to.exist;
//         expect(err.errors).to.contain.a.thing.with.property('path', 'title');
//       })
//   // Promise-y refactor gets a bit hairy when you start using Promise.all and chai-things...
//       // return Promise.all([
//       //   expect(pageValidationErr).to.eventually.exist,
//       //   expect(pageValidationErr.errors).to.eventually.contain.a.thing.with.property('path', 'title')
//       // ]);
//     });

//     it('errors without content', function(){
//       page = Page.build({title: 'This page has no content'});
//       return page.validate()
//       .then(function(err){
//         expect(err).to.exist;
//         expect(err.errors).to.contain.a.thing.with.property('path', 'content');
//       });
//     });

//     it('errors given an invalid status', function(){
//       page = Page.build({
//         title: 'Yet another test',
//         urlTitle: 'Yet_another_test',
//         content: 'Yup, same old thing',
//         status: 'test'
//       })

//       // have to actually save to run the enum validation, can't just .validate
//       return page.save()
//       .then(null, function(err){
//         expect(err.message).to.contain('status');
//       });
//     });
//   });

//   describe('Hooks', function () {
//     it('it sets urlTitle based on title before validating', function(){
//       var page = Page.build({
//         title: 'The Who',
//         content: 'A band on first base'
//       });

//       return expect(page.save()).to.eventually.have.property('urlTitle', 'The_Who');
//     });
//   });
// });

