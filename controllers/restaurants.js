const getDatabase = require('../database');

const getAllRestaurants = async (req, res) => {
  try {
    const query = 'SELECT * FROM restaurants';
    const db = await getDatabase();
    const data = await db.all(query, []);

    if (!data) {
      res.status(404).json({ message: 'No data found!' });
    }

    res.status(200).json({ restaurants: data });
  } catch (err) {
    console.log('Error while fetching the restaurants ', err.message);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRestaurantsById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM restaurants WHERE id is ${id}`;
    const db = await getDatabase();
    const data = await db.all(query, []);

    if (!data) {
      res.status(404).json({ message: 'No data found!' });
    }

    res.status(200).json({ restaurant: data[0] });
  } catch (err) {
    console.log('Error while fetching the restaurants ', err.message);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRestaurantsByCuisine = async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const db = await getDatabase();
    const query = `SELECT * FROM restaurants WHERE cuisine = ?`;
    const data = await db.all(query, cuisine);

    if (!data) {
      res.status(404).json({ message: 'No data found!' });
    }

    res.status(200).json({ restaurants: data });
  } catch (err) {
    console.log('Error while fetching the restaurants ', err.message);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRestaurantsByFilter = async (req, res) => {
  try {
    const { isVeg, hasOutdoorSeating, isLuxury } = req.query;

    if (!isVeg || !hasOutdoorSeating || !isLuxury) {
      res.status(400).json({ message: 'missing query params' });
    }

    const db = await getDatabase();
    const query = `SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?`;
    const data = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);

    if (!data) {
      res.status(404).json({ message: 'No data found!' });
    }

    res.status(200).json({ restaurants: data });
  } catch (err) {
    console.log('Error while fetching the restaurants ', err.message);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRestaurantsSortedByRating = async (req, res) => {
  try {
    const db = await getDatabase();
    const query = `SELECT * FROM restaurants`;
    const data = await db.all(query, []);

    if (!data) {
      res.status(404).json({ message: 'No data found!' });
    }

    const restaurants = data.sort((a, b) => b.rating - a.rating);

    res.status(200).json({ restaurants: restaurants });
  } catch (err) {
    console.log('Error while fetching the restaurants ', err.message);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantsById,
  getRestaurantsByCuisine,
  getRestaurantsByFilter,
  getRestaurantsSortedByRating,
};
