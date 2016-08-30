var express = require('express');
var app = express();
var router = express.Router();

app.use(router);




router.get('/message/:messageId', function (req, res) {
    console.log("Get single message");
    // Get single message
});  
router.get('/message', function (req, res) {
    console.log("Get all messages");
    // Get single message
});
router.put('/message/:messageId', function (req, res) { 
    console.log("put single message");
    // update message 
});
router.put('/message', function (req, res) { 
    console.log("add new message");
    // update message 
});
router.delete('/message/:messageId', function (req, res) {
    console.log("delete single message"); 
    // do something 
});  

router.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});