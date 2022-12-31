const mongoose = require('mongoose');

const factCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name of category'],
    minlength: [2, 'Category name should not be less than 2 characters'],
    maxlength: [20, 'Category name should not be more than 20 characters.'],
    trim: true,
    unique: true,
    uppercase: true,
  },

  color: {
    type: String,
    required: [true, 'Every category need a color'],
    trim: true,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Category = mongoose.model('Category', factCategorySchema);

module.exports = Category;
