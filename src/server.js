const MongoClient = require("mongodb").MongoClient;
const express = require("express");

const app = express();

const client = new MongoClient("mongodb://mongo:27017", {
  useUnifiedTopology: true,
});

let db, trips, expenses;
client.connect((err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  db = client.db("tripcost");
  trips = db.collection("trips");
  expenses = db.collection("expenses");
});

app.use(express.json());

app.get("/trips", (req, res) => {
  trips.find().toArray((err, result) => {
    if (err) {
      console.error(`Error getting trips: ${error}`);
      res.status(500).json({ ok: false });
      return;
    }
    res.status(200).json({ trips: result });
  });
});

app.post("/trips", (req, res) => {
  const name = req.body.name;
  trips.insertOne({ name: name }, (err) => {
    if (err) {
      console.error(`Error inserting trip: ${error}`);
      res.status(500).json({ ok: false });
      return;
    }
    res.status(200).json({ ok: true });
  });
});

app.get("/expenses", (req, res) => {
  expenses.find({ trip: req.query.trip }).toArray((err, result) => {
    if (err) {
      console.error(`Error getting expenses: ${error}`);
      res.status(500).json({ ok: false });
      return;
    }
    res.status(200).json({ expenses: result });
  });
});

app.post("/expenses", (req, res) => {
  expenses.insertOne(
    {
      trip: req.body.trip,
      date: req.body.date,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
    },
    (err) => {
      if (err) {
        console.error(`Error inserting expense: ${error}`);
        res.status(500).json({ ok: false });
        return;
      }
      res.status(200).json({ ok: true });
    }
  );
});

app.listen(3000, () => console.log("Server up and ready!"));
