import { Plus, Smile, FileText, Eye, List, Truck } from "react-feather"
import { GiGps } from "react-icons/gi"

export default [
  {
    id: "IntegrationsDash",
    title: "Integrations",
    icon: <Plus size={20} />,
    children: [
      {
        id: "NTFaceDash",
        title: "NTFace",
        icon: <Smile size={12} />,
        children: [
          {
            id: "QidiruvDash",
            title: "NTFSSearch",
            icon: <Smile />,
            navLink: "/ntfaceQidiruv"
          },
          {
            id: "FoydalanuvchiDash",
            title: "NTFSUser",
            icon: <Smile />,
            navLink: "/ntfaceFoydalanuvchi"
          }
        ]
      },
      {
        id: "LochinKo'zDash",
        title: "LochinKo'z",
        icon: <Eye size={12} />,
        navLink: "/lochinkoz"
      },
      {
        id: "Fuqaro Ma'lumotlariDash",
        title: "Fuqaro Ma'lumotlari",
        icon: <List size={12} />,
        navLink: "/fuqaro"
      },
      {
        id: "Avto ma'lumotlarDash",
        title: "Avto ma'lumotlar",
        icon: <Truck size={12} />,
        navLink: "/avto"
      },
      {
        id: "GPS HistoryDash",
        title: "GPSHistory",
        icon: <GiGps />,
        navLink: "/gpshistory"
      }
    ]
  }
]
