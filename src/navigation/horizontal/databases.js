import {Database, Code, HardDrive } from 'react-feather'

export default [
  {
    id: "DatabaseDash",
    title: "Database",
    icon: <Database size={20} />,
    children: [
      {
        id: "DFDash",
        title: "Database Fixer",
        icon: <Database size={12} />,
        navLink: "/df"
      },
      {
        id: "DVDash",
        title: "Development",
        icon: <Code size={12} />,
        navLink: "/dv"
      },
      {
        id: "IWDDash",
        title: "Integration with Databases",
        icon: <HardDrive size={12} />,
        navLink: "/iwd",
        disabled: true
      }
    ]
  }
]