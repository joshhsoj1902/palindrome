/*jshint expr: true*/
//'use strict';

var chai = require('chai');
var expect = chai.expect;

var Message = require('../models/message');
var MessageController = require('../components/message/messages.js');


describe('Message Controller', function () {

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
      if (err) {
        //Todo: Something better could be done here, but future tests will fail anyway...
        console.log("Saving message failed: ", err);
      }
      done();
    });
  });
  afterEach(function (done) {
    Message.collection.drop();
    done();
  });


  it('CreateMessage should create a single message', function (done) {
    Message.collection.drop();
    MessageController.createMessage("New Message", function (err) {
      expect(err).to.be.a('null');
      Message.count({}, function (err, c) {
        expect(err).to.be.a('null');
        c.should.equal(1);
        Message.findOne({ 'body': 'New Message' }, function (err, message) {
          expect(err).to.be.a('null');
          message.should.have.property('body');
          message.should.have.property('_id');
          message.should.have.property('isPalindrome');
          message.should.have.property('created_at');
          message.should.have.property('updated_at');
          done();
        });
      });
    });
  });

  it('getAllMessages should return all Messages', function (done) {

    var currentDate = new Date();
    var newMessage = new Message({
      body: 'Test Message2',
      created_at: currentDate,
      updated_at: currentDate,
      isPalindrome: false
    });
    newMessage.save(function (err) {
      expect(err).to.be.a('null');
      MessageController.getAllMessages(function (err, messages) {
        expect(err).to.be.a('null');
        expect(messages).to.be.a('array');
        expect(messages).to.have.length(2);
        messages[0].should.have.property('body');
        messages[0].should.have.property('_id');
        messages[0].should.have.property('isPalindrome');
        messages[0].should.have.property('created_at');
        messages[0].should.have.property('updated_at');
        messages[0].body.should.equal('Test Message');
        messages[1].should.have.property('body');
        messages[1].should.have.property('_id');
        messages[1].should.have.property('isPalindrome');
        messages[1].should.have.property('created_at');
        messages[1].should.have.property('updated_at');
        messages[1].body.should.equal('Test Message2');
        done();
      });

    });
  });

  it('getMessage should return a single Message', function (done) {

    var currentDate = new Date();
    var newMessage = new Message({
      body: 'Test Message2',
      created_at: currentDate,
      updated_at: currentDate,
      isPalindrome: false
    });
    newMessage.save(function (err, data) {
      expect(err).to.be.a('null');
      MessageController.getMessage(data._id, function (err, message) {
        expect(err).to.be.a('null');
        expect(message).to.be.a('object');

        message.should.have.property('body');
        message.should.have.property('_id');
        message.should.have.property('isPalindrome');
        message.should.have.property('created_at');
        message.should.have.property('updated_at');
        message.body.should.equal('Test Message2');
        done();
      });

    });
  });

  it('updateMessageBody should update the message body', function (done) {
    var currentDate = new Date();
    var newMessage = new Message({
      body: 'Test Message2',
      created_at: currentDate,
      updated_at: currentDate,
      isPalindrome: false
    });
    newMessage.save(function (err, data) {
      expect(err).to.be.a('null');
      MessageController.updateMessageBody(data._id, "Test Message3", function (err) {
        expect(err).to.be.a('null');
        Message.findById(data._id, function (err, message) {
          expect(message).to.be.a('object');
          message.should.have.property('body');
          message.should.have.property('_id');
          message.should.have.property('isPalindrome');
          message.should.have.property('created_at');
          message.should.have.property('updated_at');
          expect(message.body).to.equal('Test Message3');
          message.body.should.equal('Test Message3');
          done();
        });
      });

    });
  });

  it('should delete a SINGLE message on /api/message/<id> DELETE', function (done) {
    var currentDate = new Date();
    var newMessage = new Message({
      body: 'Test Message2',
      created_at: currentDate,
      updated_at: currentDate,
      isPalindrome: false
    });
    newMessage.save(function (err, data) {
      expect(err).to.be.a('null');
      MessageController.deleteMessage(data._id, function (err) {
        expect(err).to.be.a('null');
        Message.count({}, function (err, c) {
          expect(err).to.be.a('null');
          c.should.equal(1);
          done();
        });
      });
    });
  });
});