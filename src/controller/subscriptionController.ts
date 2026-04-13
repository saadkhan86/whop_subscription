import { Request, Response } from "express"
import webhookRepo from "../repositories/webhookRepo"

const subscriptionController = {
  getProducts: async (req: Request, res: Response) => {
    const plans = await fetch("https://api.whop.com/api/v2/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
        "Content-Type": "application/json",
      },
    })
    let data = await plans.json()
    let products: any[] = []
    data.data.forEach((product: any) => {
      products.push({
        id: product.id,
      })
    })
    res.status(200).json({
      success: true,
      message: "Products Fetched Successfully",
      products,
    })
  },
  getSingleProduct: async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await fetch(`https://api.whop.com/api/v2/products/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
        "Content-Type": "application/json",
      },
    })
    let data = await product.json()
    res.status(200).json({
      success: true,
      message: "Product Fetched Successfully",
      product: data,
    })
  },
  getPlans: async (req: Request, res: Response) => {
    const { id } = req.params
    const plans = await fetch(`https://api.whop.com/api/v2/plans/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
        "Content-Type": "application/json",
      },
    })
    let data = await plans.json()
    res.status(200).json({
      success: true,
      message: "PLans Fetched Successfully",
      data: {
        directLink: data.direct_link,
        cardPayments: data.card_payments,
        paypalAccepted: data.paypal_accepted,
        period: data.billing_period,
        price: data.renewal_price,
      },
    })
  },
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

export default subscriptionController
