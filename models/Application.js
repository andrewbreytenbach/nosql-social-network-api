const { Schema, model } = require('mongoose');
const Tag = require('./Tag');

// Schema to create Application model
const applicationSchema = new Schema(
  {
    published: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    buildSuccess: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      minlength: 15, // Update to 'minlength' (all lowercase)
      maxlength: 500, // Update to 'maxlength' (all lowercase)
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag', // Update the reference to 'Tag' model
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

// Create a virtual property `tagCount` that gets the amount of tags associated with an application
applicationSchema
  .virtual('tagCount')
  // Getter
  .get(function () {
    return this.tags.length;
  });

// Initialize our Application model
const Application = model('Application', applicationSchema); // Update the model name to 'Application'

module.exports = Application;
