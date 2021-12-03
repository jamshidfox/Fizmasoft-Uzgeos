import { lazy } from "react"

// ** Routes Imports
import MapRoutes from "./Maps"
import ProfileRoutes from "./Profiles"
import AuthRoutes from "./Auth"
import Database from "./Database"
import IntegrationRoutes from "./Integrations"
import FeedBack from "./Feedback"
import DashBoard from "./Dashboard"

// ** Document title
const TemplateTitle = "%s - G-Sysytem"

// ** Default Route
const DefaultRoute = "/map"


// ** Merge Routes
const Routes = [
  ...MapRoutes,
  ...ProfileRoutes,
  ...AuthRoutes,
  ...Database,
  ...IntegrationRoutes,
  ...FeedBack,
  ...DashBoard,
  {
    path: "/error",
    component: lazy(() => import("../../views/Error")),
    layout: "BlankLayout"
  }
]

export { DefaultRoute,  TemplateTitle, Routes }
