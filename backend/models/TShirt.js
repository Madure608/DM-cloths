import mongoose from "mongoose";

const sizeStockSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      trim: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const tShirtSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
      trim: true
    },
    sizesAvailable: {
      type: [sizeStockSchema],
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const TShirt = mongoose.model("TShirt", tShirtSchema);

export default TShirt;
