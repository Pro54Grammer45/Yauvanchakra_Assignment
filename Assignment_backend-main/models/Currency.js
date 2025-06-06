import mongoose from "mongoose";

const currencySchema = new mongoose.Schema(
  {
    title: {
      type: Object,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: false,
      default: "left",
      enum: ["left", "right"],
    },
    decimalPoint: {
      type: Number,
      required: false,
      default: 2,
    },
    status: {
      type: String,
      required: false,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
  },
  {
    timestamps: true,
  }
);

const Currency = mongoose.model("Currency", currencySchema);

export default Currency;
