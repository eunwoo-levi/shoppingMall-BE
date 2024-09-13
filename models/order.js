const mongoose = require("mongoose");
const User = require("./user");
const Product = require("./product");
const Schema = mongoose.Schema;
const orderSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: User },
    status: { type: String, default: "preparing" },
    totalPrice: { type: Number, reuiqred: true, default: 0 },
    shipTo: { type: String, required: true },
    contact: { type: String, required: true },
    orderNum: { type: String },
    items: [
      {
        productId: { type: mongoose.ObjectId, ref: Product },
        size: { type: String, required: true },
        qty: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timeStamps: true }
);

orderSchema.method.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updateAt;
  return obj;
};

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
