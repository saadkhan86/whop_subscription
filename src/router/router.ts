import express from "express"

import dataRouter from "./dataRouter"
import subscriptionRouter from "./subscriptionRouter"
import { isSubscribed } from "../middlewares/isSubscribed"
const router = express.Router()
router.use("/subscription", subscriptionRouter)
router.use("/data", isSubscribed, dataRouter)
export default router
