import express, { Request, Response } from "express"
const dataRouter = express.Router()
dataRouter.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Data Fetched Successfully" })
})
export default dataRouter
