import { lazy } from "react"

const ProfileRoutes = [
  {
    path: "/profile",
    component: lazy(() => import("../../views/pages/Profile/"))
  },
  {
    path: "/users",
    component: lazy(() => import("../../views/pages/Users/Users"))
  },
  {
    path: "/layers",
    component: lazy(() => import("../../views/pages/Layers/Layers"))
  },
  {
    path: "/groups",
    component: lazy(() => import("../../views/pages/Groups/Groups"))
  },
  {
    path: "/systemHealth",
    component: lazy(() => import("../../views/pages/systemHealth/SystemHealth"))
  },
  {
    path: "/message",
    component: lazy(() => import("../../views/pages/Message/Message"))
  },
  {
    path: "/accountSettings",
    component: lazy(() => import("../../views/pages/AccountSettings/"))
  }
]

export default ProfileRoutes
