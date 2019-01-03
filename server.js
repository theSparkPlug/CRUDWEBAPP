let bodyParser = require('body-parser');

let MongoClient = require('mongodb');

let express = require('express');


let app = express();

app.use(express.static('controller')) 

let mongoClient = MongoClient.MongoClient;

let dbUrl ='mongodb://<pk159>:<popiuy09>@ds237858.mlab.com:37858/aws_db';

let namesDb = null;

let path = require("path");

/*

 *  STRICT WARNING!!!

 *  PLEASE DON'T SEE THE CODE.

 *  YOU WILL GET SERIOUS HEADACHE! :p

 */


mongoClient.connect(

  dbUrl,

  { useNewUrlParser: true },

  (err, db) => {

    if (err) throw err;

    console.log('Database created!');

    namesDb = db.db('namesDB');

    namesDb.createCollection('names', (err, res) => {

      if (err) throw err;

      console.log('Collection created!');

    });

  });



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({

  extended: true

}));


app.get( '/',(req,res)=> { res.sendFile( path.join(__dirname+'/view/index.html' )) ; } ) ; 


app.get('/names', (req, res) => {

  console.log('Request received!');

  namesDb.collection('names').find({}).toArray((err, result) => {

    if (err) throw err;
     res.send(result);

  });

});



app.post('/names', (req, res) => {

  console.log('Got post request!');

  console.log(req.body);

  namesDb.collection('names').insertOne(req.body, (err, res) => {

    if (err) throw err;

    console.log('Inserted!');

  });

 // res.send('Post request sent succesfully!');
    res.redirect('/');
});



app.delete('/names', (req, res) => {

  console.log('Got delete request');

  console.log('Delete?' + req.query);

  namesDb.collection('names').deleteOne(req.query, (err, res) => {

    if (err) throw err;

    console.log('Deleted!');

  });

  res.send('Delete request sent!');

});



let server = app.listen(8000, () => {

  let host = server.address().address;

  let port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

});


