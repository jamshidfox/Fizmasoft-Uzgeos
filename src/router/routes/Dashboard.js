import { lazy } from "react"

const DashBoard = [
  {
    path: "/dashboard",
    component: lazy(() => import("../../views/pages/Dashboard/"))
  }
]

export default DashBoard
