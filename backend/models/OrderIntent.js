import mongoose from "mongoose";

const orderIntentSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      trim: true
    },
    phoneNumber: {
      type: String,
      trim: true
    },
    selectedTShirtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TShirt",
      required: true
    },
    selectedColor: {
      type: String,
      required: true,
      trim: true
    },
    selectedSize: {
      type: String,
      required: true,
      trim: true
    },
    uploadedStickerUrl: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      default: "pending",
      trim: true
    }
  },
  { timestamps: true }
);

const OrderIntent = mongoose.model("OrderIntent", orderIntentSchema);

export default OrderIntent;
