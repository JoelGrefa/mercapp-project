const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Category', categorySchema);

