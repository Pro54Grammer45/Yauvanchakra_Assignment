import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: Object,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "General",
      enum: ["General", "Order", "Product", "Customer"],
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

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
