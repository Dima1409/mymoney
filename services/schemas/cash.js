const { model, Schema } = require("mongoose");

const cashSchema = new Schema(
  {
    add: {
      type: String,
      required: [true, "Field is required"],
    },
    sell: {
      type: String,
      required: [true, "Field is required"],
    },
    category: {
      type: String,
      enum: ["salary", "food", "hobby"],
      required: [true, "Field is required"],
    },
    comment: {
      type: String,
      minLength: 2,
      maxLength: 22,
    },
  },
  { versionKey: false, timestamps: true }
);

const Cash = model("cash", cashSchema);

module.exports = Cash;
