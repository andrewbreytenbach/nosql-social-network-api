const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

// Create a virtual property called friendCount
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model using the UserSchema
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
