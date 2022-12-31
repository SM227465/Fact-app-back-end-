const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../utils/logger');
const Fact = require('../models/fact.model');
const Category = require('../models/category.model');
const User = require('../models/user.model');

dotenv.config({ path: './config.env' });

const db = process.env.CLOUD_DB_URL.replace('<password>', process.env.CLOUD_DB_PASS);

mongoose
  .set('strictQuery', false)
  .connect(db)
  .then(() => logger.info('Connected to MongoDB.'))
  .catch((err) => {
    logger.error('Failed to connect with MongoDB.');
    console.log(err.message);
    process.exit(1);
  });

const facts = JSON.parse(fs.readFileSync(`${__dirname}/facts.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const categories = JSON.parse(fs.readFileSync(`${__dirname}/categories.json`, 'utf-8'));

// import data into DB
const importData = async () => {
  try {
    await Fact.create(facts);
    await User.create(users);
    await Category.create(categories);
    logger.info('Data successfully imported.');
  } catch (err) {
    logger.error(err.message);
  }

  process.exit();
};

// delete data from DB
const deleteData = async () => {
  try {
    await Fact.deleteMany();
    await User.deleteMany();
    await Category.deleteMany();
    logger.info('Data dropped successfully.');
  } catch (err) {
    logger.error(err.message);
  }

  process.exit();
};

// checking argument
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  logger.error('Invalid argument.');
  process.exit();
}
