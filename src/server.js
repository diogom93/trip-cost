const express = require('express');
const mongo = require('mongodb').MongoClient;

const app = express();

const url = 'mongodb://localhost:27017';

let db, trips, expenses;
mongo.connect(url, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  db = client.db('tripcost');
  trips = db.collection('trips');
  expenses = db.collection('expenses');
});

app.use(express.json());

app.get('/trips', (req, res) => {
  trips.find().toArray((err, result) => {
    if (err) {
      console.log(error);
      res.status(500).json({ok: false});
      return;
    }
    console.log(result);
    res.status(200).json({trips: result});
  });
});

app.post('/trips', (req, res) => {
  const name = req.body.name;
  trips.insertOne({name: name}, (err, result) => {
    if (err) {
      console.log(error);
      res.status(500).json({ok: false});
      return;
    }
    console.log(result);
    res.status(200).json({ok: true});
  });
});

app.get('/expenses', (req, res) => {

});

app.post('/expenses', (req, res) => {

});

app.listen(3000, () => console.log('Server up and ready!'));