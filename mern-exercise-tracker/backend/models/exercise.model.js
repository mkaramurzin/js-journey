const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const setSchema = new Schema({
  reps: {
    type: Number,
    required: true,
    min: 1
  },
  weight: {
    type: Number,
    required: false
  }
}, { _id: false });

const exerciseSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: false,
    trim: true,
    minlength: 3
  },
  duration: {
    type: Number,
    required: true
  },
  sets: {
    type: [setSchema],
    required: false,
  },
  date: {
    type: Date,
    required: true
  },
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;