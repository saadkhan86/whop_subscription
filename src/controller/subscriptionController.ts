import { Request, Response } from "express"
import webhookRepo from "../repositories/webhookRepo"
import whop from "../services/whop.service"

const subscriptionController = {
  getProducts: async (req: Request, res: Response) => {
    const plans = await whop().products.list({
      company_id: process.env.WHOP_COMPANY_KEY as string,
    })
    let products: any[] = []
    plans.data.forEach((product: any) => {
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
    const product = await whop().products.retrieve(id as string)
    res.status(200).json({
      success: true,
      message: "Product Fetched Successfully",
      product: product,
    })
  },
  getPlans: async (req: Request, res: Response) => {
    const { productId } = req.params
    const plans = await whop().plans.list({
      product_id: productId as string,
      company_id: process.env.WHOP_COMPANY_KEY as string,
    })
    const plansData = plans.data.map((plan: any) => {
      return {
        id: plan.id,
        name: plan.name,
        price: plan.renewal_price,
        currency: plan.currency,
        interval: plan.billing_period,
        purchase_url: plan.purchase_url,
      }
    })
    res.status(200).json({
      success: true,
      message: "Plans Fetched Successfully",
      plans: plansData,
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
