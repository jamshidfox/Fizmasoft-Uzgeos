import {lazy} from 'react'

const DatabaseRoute = [
  {
    path: "/df",
    component: lazy(() => import("../../views/pages/DF/"))
  },
  {
    path: "/dv",
    component: lazy(() => import("../../views/pages/Development/"))
  },
  {
    path: "/iwd",
    component: lazy(() => import("../../views/pages/IWD/"))
  }
]


export default DatabaseRoute