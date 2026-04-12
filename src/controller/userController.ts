import { Request, Response } from "express"
import userRepo from "../repositories/userRepo"
import jwt from "jsonwebtoken"
const userController = {
  signup: async (req: Request, res: Response) => {
    const user = await userRepo.signup(req.body)
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    })
    res.json({
      success: true,
      message: "User Registered Successfully",
      user,
      token,
    })
  },
  update: async (req: Request, res: Response) => {
    const user = await userRepo.update(req.body)
    res.json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    })
  },
  profile: async (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "Profile Fetched Successfully",
      user: req.user,
    })
  },
}

export default userController
