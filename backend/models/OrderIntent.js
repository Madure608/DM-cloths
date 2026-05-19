const mongoose = require("mongoose");

const orderIntentSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      trim: true,
      default: "",
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    selectedTShirtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TShirt",
      required: true,
    },
    selectedColor: {
      type: String,
      required: true,
      trim: true,
    },
    selectedSize: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    uploadedStickerUrl: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "contacted", "closed"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderIntent", orderIntentSchema);
