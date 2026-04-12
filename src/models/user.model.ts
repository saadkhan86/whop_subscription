import mongoose from "mongoose"
import { IWebhook } from "../interfaces/IWebhook"
const userSchema = new mongoose.Schema<IWebhook.Webhook>(
  {
    email: {
      type: String,
      required: [true, "User Email Is Required (userModel.email)"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "User Name Is Required (userModel.name)"],
      default: "User",
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    whopUserId: {
      type: String,
      default: null,
    },
    planType: {
      type: String,
      enum: ["monthly", "yearly"],
      default: null,
    },
    subscriptionId: {
      type: String,
      default: null,
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "canceled", "expired"],
      default: "expired",
    },
    subscriptionEndDate: {
      type: Date,
      default: null,
    },
    canceledAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
)

export default mongoose.model<IWebhook.Webhook>("User", userSchema)
