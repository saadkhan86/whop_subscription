import { NextFunction, Request, Response } from "express"
import userModel from "../models/user.model"

export const isSubscribed = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.body.email
    console.log(email)
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }
    if (!user.isSubscribed) {
      return res
        .status(403)
        .json({ success: false, message: "User is not subscribed" })
    }
    next()
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" })
  }
}
