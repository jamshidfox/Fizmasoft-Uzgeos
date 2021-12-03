import { Map, Layers, List, Maximize2, Smile, MapPin } from "react-feather"

export default [
  {
    header: "Map"
  },
  {
    id: "MapDash",
    title: "Map",
    icon: <Map size={20} />,
    navLink: "/map"

    // children:[
    //     {
    //         id:'MapDash',
    //         title:'Map',
    //         icon:<Layers size={12}/>,
    //         navLink:'/map'
    //     },

    //     {
    //         id:'IntegrationWithNTFSDash',
    //         title:'Integration with NTFS',
    //         icon:<Smile size={12}/>,
    //         navLink:'/integNtfs'
    //     },
    //     {
    //         id:'IntegrationWithUzTrackingDash',
    //         title:'Integration with UzTracking',
    //         icon:<MapPin size={12}/>,
    //         navLink:'/uztracking'
    //     }
    // ]
  }
]
