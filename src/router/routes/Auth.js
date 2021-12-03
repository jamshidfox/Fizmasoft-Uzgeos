import { lazy } from "react"

const AuthRoutes = [
  {
    path: "/login",
    component: lazy(() => import("../../views/pages/Login/Login")),
    layout: "BlankLayout",
    meta: {
      authRoute: true
    }
  }
]

export default AuthRoutes
