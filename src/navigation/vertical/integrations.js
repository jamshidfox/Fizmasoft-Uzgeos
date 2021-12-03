import { Plus, Smile, FileText, Eye, List, Truck } from "react-feather"

export default [
  {
    header: "Integrations"
  },
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
            title: "Қ‎идирув",
            icon: <Smile />,
            navLink: "/ntfaceQidiruv"
          },
          {
            id: "FoydalanuvchiDash",
            title: "Фойдаланувчи",
            icon: <Smile />,
            navLink: "/ntfaceFoydalanuvchi"
          }
        ]
      },
      {
        id: "KvLite(Post)Dash",
        title: "KvLite",
        icon: <FileText size={12} />,
        navLink: "/kvlite"
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
        id: "Video Detection",
        title: "Video Detection",
        icon: <List size={12} />,
        navLink: "/videDetection"
      },
      {
        id: "Avto ma'lumotlar",
        title: "Avto ma'lumotlar",
        icon: <Truck size={12} />,
        navLink: "/avto"
      }
    ]
  }
]
