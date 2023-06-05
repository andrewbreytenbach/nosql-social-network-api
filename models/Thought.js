const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Reaction Schema
const ReactionSchema = new Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => formatDate(timestamp) // Assuming you have a helper function formatDate to format the timestamp
  }
});

// Define the Thought Schema
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => formatDate(timestamp) // Assuming you have a helper function formatDate to format the timestamp
  },
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
});

// Create a virtual property called reactionCount
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create the Thought model using the ThoughtSchema
const Thought = mongoose.model('Thought', ThoughtSchema);

// Export the Thought model
module.exports = Thought;
