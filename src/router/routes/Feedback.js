import { lazy } from "react"

const FeedBack = [
  {
    path: "/feedBack",
    component: lazy(() => import("../../views/pages/FeedBack/"))
  }
]

export default FeedBack
