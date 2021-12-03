import {User, Users, Layers, Activity, Mail} from 'react-feather'

export default [
  {
    id: "MyProfileDash",
    title: "My Profile",
    icon: <User size={20} />,
    children: [
      {
        id: "UsersDash",
        title: "Users",
        icon: <Users size={12} />,
        navLink: "/users"
      },
      {
        id: "LayersDash",
        title: "Layers",
        icon: <Layers size={12} />,
        navLink: "/layers",
        disabled: true
      },
      {
        id: "GroupsDash",
        title: "Groups",
        icon: <Users size={12} />,
        navLink: "/groups"
      },
      {
        id: "SystemHealthDash",
        title: "System Health",
        icon: <Activity size={12} />,
        navLink: "/systemHealth",
        disabled: true
      },
      {
        id: "MessageDash",
        title: "Message",
        icon: <Mail size={12} />,
        navLink: "/message"
      }
    ]
  }
]