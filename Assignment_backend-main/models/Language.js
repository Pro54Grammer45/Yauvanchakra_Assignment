import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    title: {
      type: Object,
      required: true,
    },
    code: {
      type: String,
      required: true,
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

const Language = mongoose.model("Language", languageSchema);

export default Language;
