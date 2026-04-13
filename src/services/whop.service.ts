import Whop from "@whop/sdk"
let whopInstance: any = null
const whop = () => {
  if (!whopInstance) {
    whopInstance = new Whop({
      apiKey: process.env.WHOP_API_KEY as string,
    })
  }
  return whopInstance
}

export default whop
