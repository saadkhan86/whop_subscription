import { Request, Response } from "express"
import webhookRepo from "../repositories/webhookRepo"

const webhookController = {
  webhook: async (req: Request, res: Response) => {
    try {
      const { type, data } = req.body
      let subscription
      if (type === "payment.succeeded") {
        subscription = await webhookRepo.succeededTrigger({
          email: data.user.email,
          name: data.user.username,
          isSubscribed: true,
          whopUserId: data.user.id,
          planType: data.plan?.interval,
          subscriptionId: data.subscription?.id,
          subscriptionStatus: data.subscription?.status,
          subscriptionEndDate: data.subscription?.current_period_end,
          canceledAt: null,
        })
      }
      if (type === "subscription.canceled") {
        subscription = await webhookRepo.canceledTrigger({
          email: data.user.email,
          whopUserId: data.user.id,
          isSubscribed: false,
          planType: null,
          subscriptionId: data.subscription?.id,
          subscriptionStatus: "canceled",
          subscriptionEndDate: null,
          canceledAt: data.subscription?.canceled_at,
        })
      }
      if (type === "subscription.created") {
        subscription = await webhookRepo.createdTrigger({
          email: data.user.email,
          whopUserId: data.user.id,
          isSubscribed: true,
          planType: data.plan?.interval,
          subscriptionId: data.subscription?.id,
          subscriptionStatus: data.subscription?.status,
          subscriptionEndDate: data.subscription?.current_period_end,
          canceledAt: null,
        })
      }

      if (
        ![
          "payment.succeeded",
          "subscription.created",
          "subscription.canceled",
        ].includes(type)
      ) {
        throw new Error("Invalid webhook type")
      }

      return res.json({
        success: true,
        message: "Webhook Received",
        subscription,
      })
    } catch (error) {
      console.log("Webhook Error:", error)
      return res.status(500).json({ success: false, message: "Webhook Failed" })
    }
  },
}

export default webhookController
