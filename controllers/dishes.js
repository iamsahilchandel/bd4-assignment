const getDatabase = require('../database');

const getAllDishes = async (req, res) => {
  try {
    const db = await getDatabase();
    const query = 'SELECT * FROM dishes';
    const data = await db.all(query, []);

    if (!data) {
      res.status(404).json({ message: 'No data found!' });
    }

    res.status(200).json({ dishes: data });
  } catch (err) {
    console.log('Error while fetching dishes: ', err.message);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getDishesById = async (req, res) => {
  try {
    const id = req.params.id;
    const db = await getDatabase();
    const query = `SELECT * FROM dishes WHERE id is ?`;
    const data = await db.all(query, id);

    if (!data) {
      res.status(404).json({ message: 'No data found!' });
    }

    res.status(200).json({ dish: data[0] });
  } catch (err) {
    console.log('Error while fetching the dishes ', err.message);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getDishesByFiler = async (req, res) => {
  try {
    const { isVeg } = req.query;
    const db = await getDatabase();
    const query = `SELECT * FROM dishes WHERE isVeg is ?`;
    const data = await db.all(query, isVeg);

    if (!data) {
      res.status(404).json({ message: 'No data found!' });
    }

    res.status(200).json({ dishes: data });
  } catch (err) {
    console.log('Error while fetching the dishes ', err.message);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getDishesSortedByPrice = async (req, res) => {
  try {
    const db = await getDatabase();
    const query = 'SELECT * FROM dishes';
    const data = await db.all(query, []);

    if (!data) {
      res.status(404).json({ message: 'No data found!' });
    }

    const sortedData = data.sort((a, b) => a.price - b.price);

    res.status(200).json({ dishes: sortedData });
  } catch (err) {
    console.log('Error while fetching the dishes ', err.message);

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllDishes,
  getDishesById,
  getDishesByFiler,
  getDishesSortedByPrice,
};
