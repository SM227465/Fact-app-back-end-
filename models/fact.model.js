const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please provide content of your fact'],
    minlength: [2, 'Fact content should not be less than 2 characters'],
    maxlength: [200, 'Fact content should not be more than 200 characters.'],
    trim: true,
  },

  source: {
    type: String,
    required: [true, 'Please provide source (link) that justify its true'],
    // validate: []
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Every fact should belong to a category.'],
  },

  voteLike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  voteInteresting: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  voteFake: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Fact = mongoose.model('Fact', factSchema);

module.exports = Fact;
