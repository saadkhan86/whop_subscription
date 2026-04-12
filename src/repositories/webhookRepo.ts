import userModel from "../models/user.model"
import { IWebhook } from "../interfaces/IWebhook"
import jwt from "jsonwebtoken"
class webhookRepo {
  public async succeededTrigger(data: IWebhook.Webhook) {
    const user = await userModel.findOneAndUpdate(
      { email: data.email },
      {
        name: data.name || "User",
        isSubscribed: data.isSubscribed,
        whopUserId: data.whopUserId,
        planType: data.planType,
        subscriptionId: data.subscriptionId,
        subscriptionStatus: data.subscriptionStatus,
        subscriptionEndDate: data.subscriptionEndDate
          ? new Date(data.subscriptionEndDate)
          : null,
        canceledAt: null,
      },
      { upsert: true, new: true },
    )
    return  user 
  }

  public async createdTrigger(data: IWebhook.Webhook) {
    const user = await userModel.findOneAndUpdate(
      { email: data.email },
      {
        isSubscribed: true,
        whopUserId: data.whopUserId,
        planType: data.planType,
        subscriptionId: data.subscriptionId,
        subscriptionStatus: data.subscriptionStatus,
        subscriptionEndDate: data.subscriptionEndDate
          ? new Date(data.subscriptionEndDate)
          : null,
        canceledAt: null,
      },
      { upsert: true, new: true },
    )
    return user
  }

  public async canceledTrigger(data: IWebhook.Webhook) {
    const user = await userModel.findOneAndUpdate(
      {
        email: data.email,
        subscriptionId: data.subscriptionId,
      },
      {
        subscriptionStatus: "canceled",
        subscriptionEndDate: null,
        isSubscribed: false,
        canceledAt: data.canceledAt ? new Date(data.canceledAt) : new Date(),
      },
      { new: true },
    )
    return user
  }
}
export default new webhookRepo()
