const mongoose = require("mongoose");
const User = require("./user");
const Product = require("./product");
const Schema = mongoose.Schema;
const cartSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User },
    items: [
      {
        productId: {
          type: mongoose.ObjectId,
          ref: Product,
        },
        size: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  { timeStamps: true }
);

cartSchema.method.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
