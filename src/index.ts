import express, { NextFunction, Request, Response } from "express"
import router from "./router/router"
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./connection/connection"
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use("/api/v1", router)
app.get("/", (_, res) => {
  res.send("Hello World")
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Something went wrong",
    stack: error.stack,
  })
})
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
    process
  })
