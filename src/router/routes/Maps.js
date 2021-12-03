import { lazy } from "react"

const MapRoutes = [
  {
    path: "/map",
    component: lazy(() => import("../../views/pages/Map"))
  }
]

export default MapRoutes
