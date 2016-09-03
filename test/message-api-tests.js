var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
//var should = require('should');
var should = chai.should;
var expect = chai.expect;

var Message = require('../models/message')

chai.use(chaiHttp);


describe('Basic Server Access', function () {
  it('Home page should load: / GET', function (done) {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        //expect(res).to.have.should(200);
        res.should.have.property('status', 200);
        done();
      });
  });
});

describe('Messages', function () {

  Message.collection.drop();

  beforeEach(function (done) {
    var currentDate = new Date();
    var newMessage = new Message({
      body: 'Test Message',
      created_at: currentDate,
      updated_at: currentDate,
      isPalindrome: false
    });
    newMessage.save(function (err) {
      done();
    });
  });
  afterEach(function (done) {
    Message.collection.drop();
    done();
  });

  //////////////////
  //Getting messages
  ////////////////// 
  it('should list ALL Messages on /api/message GET', function (done) {
    chai.request(server)
      .get('/api/message')
      .end(function (err, res) {
        expect(err).to.be.a('null');
        res.should.have.property('status', 200);
        res.should.be.json;
        expect(res.body).to.be.a('array')
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('body');
        res.body[0].should.have.property('isPalindrome');
        res.body[0].body.should.equal('Test Message');
        res.body[0].isPalindrome.should.equal(false);
        done();
      });
  });

  it('should list a SINGLE Message on /api/message/<id> GET', function (done) {
    var currentDate = new Date();
    var newMessage = new Message({
      body: 'New Message',
      created_at: currentDate,
      updated_at: currentDate,
      isPalindrome: false
    });
    newMessage.save(function (err, data) {
      chai.request(server)
        .get('/api/message/' + data.id)
        .end(function (err, res) {
          expect(err).to.be.a('null');
          res.should.have.property('status', 200);
          res.should.be.json;
          expect(res.body).to.be.a('object')
          res.body.should.have.property('_id');
          res.body.should.have.property('body');
          res.body.should.have.property('isPalindrome');
          res.body.body.should.equal('New Message');
          res.body.isPalindrome.should.equal(false);
          res.body._id.should.equal(data.id);
          done();
        });
    });
  });

  it('should return a 404 when a requested message does not exist on /api/message/<id> GET', function (done) {
    Message.collection.drop();
    chai.request(server)
      .get('/api/message/57ca0324f2a40be819023a39')
      .end(function (err, res) {
        //expect(err).to.be.a('null');
        res.should.have.property('status', 404);
        // res.should.be.json;
        // expect(res.body).to.be.a('array')
        // res.body[0].should.have.property('_id');
        // res.body[0].should.have.property('body');
        // res.body[0].should.have.property('isPalindrome');
        // res.body[0].body.should.equal('Test Message');
        // res.body[0].isPalindrome.should.equal(false);
        done();
      });
  });

  ///////////////////
  //Creating messages
  ///////////////////
  it('should add a SINGLE message on /api/message PUT', function (done) {
    chai.request(server)
      .put('/api/message')
      .send({ 'body': 'Put Message' })
      .end(function (err, res) {
        expect(err).to.be.a('null');
        res.should.have.property('status', 200);
        res.should.be.json;

        expect(res.body).to.be.a('array');
        newMessage = res.body.find(x => x.body === 'Put Message');
        expect(newMessage).to.be.a('object');
        newMessage.should.have.property('body');
        newMessage.should.have.property('_id');
        newMessage.should.have.property('isPalindrome');
        newMessage.body.should.equal('Put Message');
        newMessage.isPalindrome.should.equal(false);
        done();
      });
  });

    it('should return 400 error when no body is provided on /api/message PUT', function (done) {
    chai.request(server)
      .put('/api/message')
      .end(function (err, res) {
        //expect(err).to.be.a('null');
        res.should.have.property('status', 400);
        //res.should.be.json;

        // expect(res.body).to.be.a('array');
        // newMessage = res.body.find(x => x.body === 'Put Message');
        // expect(newMessage).to.be.a('object');
        // newMessage.should.have.property('body');
        // newMessage.should.have.property('_id');
        // newMessage.should.have.property('isPalindrome');
        // newMessage.body.should.equal('Put Message');
        // newMessage.isPalindrome.should.equal(false);
        done();
      });
  });

      it('should return 400 error when an empty body is provided on /api/message PUT', function (done) {
    chai.request(server)
      .put('/api/message')
      .send({ 'body': '' })
      .end(function (err, res) {
        //expect(err).to.be.a('null');
        res.should.have.property('status', 400);
        //res.should.be.json;

        // expect(res.body).to.be.a('array');
        // newMessage = res.body.find(x => x.body === 'Put Message');
        // expect(newMessage).to.be.a('object');
        // newMessage.should.have.property('body');
        // newMessage.should.have.property('_id');
        // newMessage.should.have.property('isPalindrome');
        // newMessage.body.should.equal('Put Message');
        // newMessage.isPalindrome.should.equal(false);
        done();
      });
  });

  ///////////////////
  //Updating messages
  ///////////////////
  it('should update a SINGLE message on /api/message/<id> PUT', function (done) {
    chai.request(server)
      .get('/api/message')
      .end(function (err, res) {
        chai.request(server)
          .put('/api/message/' + res.body[0]._id)
          .send({ 'body': 'Updated Message egasseM detadpU' })
          .end(function (error, response) {
            response.should.have.property('status', 200);
            response.should.be.json;
            expect(response.body).to.be.a('array');
            updatedMessage = response.body.find(x => x._id === res.body[0]._id);
            expect(updatedMessage).to.be.a('object');
            updatedMessage.should.have.property('body');
            updatedMessage.should.have.property('_id');
            updatedMessage.should.have.property('isPalindrome');
            updatedMessage.body.should.equal('Updated Message egasseM detadpU');
            updatedMessage.isPalindrome.should.equal(true);
            done();
          });
      });
  });

  ///////////////////
  //Deleting messages
  ///////////////////
  it('should delete a SINGLE message on /api/message/<id> DELETE', function (done) {
    chai.request(server)
      .get('/api/message')
      .end(function (err, res) {
        chai.request(server)
          .delete('/api/message/' + res.body[0]._id)
          .end(function (error, response) {
            expect(error).to.be.a('null');
            response.should.have.property('status', 200);
            response.should.be.json;
            //TODO: I coould also Check to make sure that the deleted message isn't in the array
            //expect(response.body).to.ba.a('array')
            // deletedMessage = response.body.find(x => x._id === res.body[0]._id);
            // console.log("The message: ",deletedMessage);
            // expect(updatedMessage).to.be.a('null');


            chai.request(server)
            .get('/api/message/' + res.body[0]._id)
              .end(function (err2, res2) {
                expect(err2).to.be.a('null');
                res2.should.have.property('status', 404);
              });

            done();
          });
      });
  });
});