const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    firstName: String, // Update the property name to 'firstName'
    lastName: String, // Update the property name to 'lastName'
    age: Number,
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Application',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('fullName')
  // Getter
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const [firstName, lastName] = v.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  });

// Create a virtual property `friendCount` that returns the number of friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model('User', userSchema); // Update the model name to 'User'

module.exports = User;
