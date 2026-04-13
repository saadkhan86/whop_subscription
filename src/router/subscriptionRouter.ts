import express from "express"
import subscriptionController from "../controller/subscriptionController"
const subscriptionRouter = express.Router()
subscriptionRouter.get("/products", subscriptionController.getProducts)
subscriptionRouter.get("/products/:id", subscriptionController.getSingleProduct)
subscriptionRouter.get("/:productId/plans", subscriptionController.getPlans)
subscriptionRouter.post("/webhook", subscriptionController.webhook)
export default subscriptionRouter
