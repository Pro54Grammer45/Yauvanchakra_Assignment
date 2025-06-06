import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    title: {
      type: Object,
      required: true,
    },
    description: {
      type: Object,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    favicon: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    currency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Currency",
      required: true,
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    tax: {
      type: Number,
      required: false,
      default: 0,
    },
    shipping: {
      type: Number,
      required: false,
      default: 0,
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

// module.exports = settingSchema;

const Setting = mongoose.model("Setting", settingSchema);

export default Setting;
