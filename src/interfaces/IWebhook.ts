export declare namespace IWebhook {
  interface Webhook {
    name?: string
    email: string
    whopUserId: string
    isSubscribed: boolean
    planType: string | null
    subscriptionId: string
    subscriptionStatus: "active" | "canceled" | "expired"
    subscriptionEndDate: string | null
    canceledAt: string | null
  }
}
