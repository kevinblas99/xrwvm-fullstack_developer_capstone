/* jshint esversion: 8 */


const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');  // Added missing semicolon
const app = express();
const port = 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

const reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("dealerships.json", 'utf8'));

mongoose.connect("mongodb://mongo_db:27017/", { 'dbName': 'dealershipsDB' });  // Properly spaced object

const Reviews = require('./review');
const Dealerships = require('./dealership');

try {
  Reviews.deleteMany({}).then(() => {
    Reviews.insertMany(reviews_data.reviews);  // Used dot notation
  });
  Dealerships.deleteMany({}).then(() => {
    Dealerships.insertMany(dealerships_data.dealerships);  // Used dot notation
  });
} catch (error) {
  res.status(500).json({ error: 'Error fetching documents' });
}

app.get('/', async (req, res) => {
  res.send("Welcome to the Mongoose API");
});

app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({ dealership: req.params.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchDealers', async (req, res) => {
  try {
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const documents = await Dealerships.find({ state: req.params.state });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const documents = await Dealerships.find({ id: req.params.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  const data = JSON.parse(req.body);  // Declared 'data'
  const documents = await Reviews.find().sort({ id: -1 });
  let new_id = documents[0].id + 1;  // Used dot notation

  const review = new Reviews({
    id: new_id,
    name: data.name,  // Used dot notation
    dealership: data.dealership,  // Used dot notation
    review: data.review,  // Used dot notation
    purchase: data.purchase,  // Used dot notation
    purchase_date: data.purchase_date,  // Used dot notation
    car_make: data.car_make,  // Used dot notation
    car_model: data.car_model,  // Used dot notation
    car_year: data.car_year,  // Used dot notation
  });

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);  // No unnecessary semicolon
});
