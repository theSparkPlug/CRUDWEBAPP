


// //let MongoClient = require('mongodb');

// var express = require('express');


// var app = express();

// var bodyParser = require('body-parser');


// app.set('port', (process.env.PORT || 5000))


// app.use(express.static(__dirname+'/controller')) 


// //let mongoClient = MongoClient.MongoClient;

// //let dbUrl = 'mongodb://noob:qwerty12@ds237858.mlab.com:37858/aws_db'

// //let dbUrl ='mongodb://localhost:27017';

// //let namesDb = null;

// var path = require("path");



// /*
//    mongodb://<pk159>:<pop***iuy09>@ds237858.mlab.com:37858/aws_db
//  *  STRICT WARNING!!!

//  *  PLEASE DON'T SEE THE CODE.

//  *  YOU WILL GET SERIOUS HEADACHE! :p

//  */


// // mongoClient.connect(

// //   dbUrl,

// //   { useNewUrlParser: true },

// //   (err, db) => {

// //     if (err) throw err;

// //     console.log('Database created!');

// //     namesDb = db.db('aws_db');

// //     namesDb.createCollection('names', (err, res) => {

// //       if (err) throw err;

// //       console.log('Collection created!');

// //     });

// //   });



//  app.use(bodyParser.json());

//  app.use(bodyParser.urlencoded({

//    extended: true

//  }));



 
// app.get( '/',(req,res)=> { res.sendFile(  path.join(__dirname+'/view/index.html') ) ; } ) ; 


// // app.get('/names', (req, res) => {

// //   console.log('Request received!');

// //   namesDb.collection('names').find({}).toArray((err, result) => {

// //     if (err) throw err;
// //      res.send(result);

// //   });

// // });



// // app.post('/names', (req, res) => {

// //   console.log('Got post request!');

// //   console.log(req.body);

// //   namesDb.collection('names').insertOne(req.body, (err, res) => {

// //     if (err) throw err;

// //     console.log('Inserted!');

// //   });

// //  // res.send('Post request sent succesfully!');
// //     res.redirect('/');
// // });



// // app.delete('/names', (req, res) => {

// //   console.log('Got delete request');

// //   console.log('Delete?' + req.query);

// //   namesDb.collection('names').deleteOne(req.query, (err, res) => {

// //     if (err) throw err;

// //     console.log('Deleted!');

// //   });

// //   res.send('Delete request sent!');

// // });


// var server = app.listen(app.get('port'), () => {

//   var host = server.address().address;

//   var port = server.address().port;

//   console.log('Listening at http://%s:%s', host, port);

// });




var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/controller'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
