import express from "express"
import webhookController from "../controller/webhookController"
const subscriptionRouter = express.Router()
subscriptionRouter.post("/webhook", webhookController.webhook)
export default subscriptionRouter
