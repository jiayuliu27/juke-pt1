// var supertest = require('supertest-as-promised');
// var app = require('../app');
// var agent = supertest(app);
// var Page = require('../models').Page;
// var User = require('../models').User;
// var chai = require('chai');
// chai.use(require('chai-as-promised'));
// var expect = chai.expect;

// describe('http requests', function () {

//   // let's clear out the User too, since our POST route is finding or creating a user
//   before(function(){
//     return Page.sync({force: true})
//     .then(function(){
//       return User.sync({force: true});
//     });
//   });

//   beforeEach(function(){
//     return Page.truncate()
//     .then(function(){
//       return User.truncate();
//     });
//   });

//   describe('GET /wiki/', function () {
//     it('responds with 200', function(){
//     	return agent
//     	.get('/wiki')
//     	.expect(200);
//     });
//   });

//   describe('GET /wiki/add', function () {
//     it('responds with 200', function(){
//     	return agent
//     	.get('/wiki/add')
//     	.expect(200);
//     });
//   });

//   describe('GET /wiki/:urlTitle', function () {
//     it('responds with 404 on page that does not exist', function(){
//     	return agent
//     	.get('/wiki/Grace_Hopper')
//     	.expect(404);
//     });

//     it('responds with 200 on page that does exist', function(){
//     	return Page.create({
//     		title: 'Grace Hopper',
//     		content: 'Really good at computers and stuff.'
//     	})
//     	.then(function(createdPage){
//     		return agent.get('/wiki/Grace_Hopper')
//     		.expect(200);
//     	});
//     });
//   });

//   describe('GET /wiki/search/:tag', function () {
//     it('responds with 200', function(){
//     	return agent
//     	.get('/wiki/search/tag')
//     	.expect(200)
//     });
//   });

//   describe('GET /wiki/:urlTitle/similar', function () {
//     it('responds with 404 for page that does not exist', function(){
//     	return agent
//     	.get('/wiki/Ada_Lovelace/similar')
//     	.expect(404);
//     });
//     it('responds with 200 for similar page', function(){
//     	return Page.create({
//     		title: 'Ada Lovelace',
//     		content: 'She was also really good at computers.'
//     	})
//     	.then(function(createdPage){
//     		return agent
//     		.get('/wiki/Ada_Lovelace/similar')
//     		.expect(200)
//     	})
//     });
//   });

//   describe('POST /wiki', function () {
//     it('responds with 302', function(){
//     	return agent
//     	.post('/wiki')
//     	.send({
//     		authorName: 'Emily',
//     		authorEmail: 'emily@emily.emily',
//     		title: 'Apple Pie',
//     		content: 'This is my favorite kind of pie.'
//     	})
//     	.expect(302);
//     });

//     it('creates a page in the database', function(){
//     	return agent
//     	.post('/wiki')
//     	.send({
//     		authorName: 'Emily',
//     		authorEmail: 'emily@emily.emily',
//     		title: 'Apple Pie',
//     		content: 'This is my favorite kind of pie.'
//     	})
//     	.expect(302)
//     	.then(function(){
//     		return expect(Page.findAll()).to.eventually.have.lengthOf(1);
//     	});
//     });
//   });

// });

