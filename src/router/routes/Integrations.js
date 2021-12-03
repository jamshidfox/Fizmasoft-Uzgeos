import { lazy } from "react"

const IntegrationRoutes = [
  {
    path: "/ntfaceQidiruv",
    component: lazy(() => import("../../views/pages/NTFS/Qidiruv"))
  },
  {
    path: "/ntfaceFoydalanuvchi",
    component: lazy(() => import("../../views/pages/NTFS/Foydalanuvchi"))
  },
  {
    path: "/lochinkoz",
    component: lazy(() => import("../../views/pages/AvtoQidiruv"))
    // component: lazy(() => import("../../views/pages/LochinKoz"))
  },
  {
    path: "/fuqaro",
    component: lazy(() => import("../../views/pages/Fuqarolar"))
  },
  {
    path: "/avto",
    component: lazy(() => import("../../views/pages/Cars"))
  },
  {
    path: "/videoDetection",
    // component: lazy(() => import("../../views/pages/VideoDetection"))
    component: lazy(() => import("../../views/pages/VideoDetection2"))
  },
  {
    path: "/gpshistory",
    component: lazy(() => import("../../views/pages/GPSHistory"))
  }
]

export default IntegrationRoutes
