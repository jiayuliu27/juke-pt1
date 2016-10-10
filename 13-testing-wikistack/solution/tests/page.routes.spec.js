var supertest = require('supertest-as-promised');
var app = require('../app');
var agent = supertest(app);
var Page = require('../models').Page;
var User = require('../models').User;
var chai = require('chai');
var expect = chai.expect;

describe('http requests', function () {

	// let's clear out the User too, since our POST route is finding or creating a user
  before(function(){
    return Page.sync({force: true})
    .then(function(){
        return User.sync({force: true});
    });
  });

  beforeEach(function(){
    return Page.truncate()
    .then(function(){
        return User.truncate();
    });
  });

  describe('GET /wiki/', function () {
    it('responds with 200', function(done){
    	agent
    	.get('/wiki')
    	.expect(200, done);
    });
  });

  describe('GET /wiki/add', function () {
    it('responds with 200', function(done){
    	agent
    	.get('/wiki/add')
    	.expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle', function () {
    it('responds with 404 on page that does not exist', function(done){
    	agent
    	.get('/wiki/Grace_Hopper')
    	.expect(404, done);
    });

    it('responds with 200 on page that does exist', function(done){
    	Page.create({
    		title: 'Grace Hopper',
    		content: 'Really good at computers and stuff.'
    	})
    	.then(function(createdPage){
    		agent.get('/wiki/Grace_Hopper')
    		.expect(200, done);
    	});
    });
  });

  describe('GET /wiki/search/:tag', function () {
    it('responds with 200', function(done){
    	agent
    	.get('/wiki/search/tag')
    	.expect(200, done)
    });
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    it('responds with 404 for page that does not exist', function(done){
    	agent
    	.get('/wiki/Ada_Lovelace/similar')
    	.expect(404, done);
    });
    it('responds with 200 for similar page', function(done){
    	Page.create({
    		title: 'Ada Lovelace',
    		content: 'She was also really good at computers.'
    	})
    	.then(function(createdPage){
    		agent
    		.get('/wiki/Ada_Lovelace/similar')
    		.expect(200, done)
    	})
    });
  });

  describe('POST /wiki', function () {
    it('responds with 302', function(done){
    	agent
    	.post('/wiki')
    	.send({
    		authorName: 'Emily',
    		authorEmail: 'emily@emily.emily',
    		title: 'Apple Pie',
    		content: 'This is my favorite kind of pie.'
    	})
    	.expect(302, done);
    });

    it('creates a page in the database', function(){
    	return agent
    	.post('/wiki')
    	.send({
    		authorName: 'Emily',
    		authorEmail: 'emily@emily.emily',
    		title: 'Apple Pie',
    		content: 'This is my favorite kind of pie.'
    	})
    	.expect(302)
    	.then(function(){
    		return Page.findAll()
    	})
  		.then(function(results){
  			expect(results).to.have.lengthOf(1);
  		})
    });
  });

});

