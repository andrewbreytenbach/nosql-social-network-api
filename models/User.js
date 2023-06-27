const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    age: Number,
    thoughts: [String],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (v) {
    const [firstName, lastName] = v.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  });

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
