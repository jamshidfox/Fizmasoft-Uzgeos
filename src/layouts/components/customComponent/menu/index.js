// ** Custom Menu
import DatabaseMenu from "./menuList/database"
import IntegrationMenu from "./menuList/integrations"
import FeedBackMenu from "./menuList/feedBack"
import DashBoard from "./menuList/dashboard"
import MapComponent from "./menuList/map"

const MenuComponents = () => {
  return (
    <>
      <ul className="navigation navigation-main">
        <DashBoard />
        <MapComponent />
        {/* <DatabaseMenu /> */}
        <IntegrationMenu />
        <FeedBackMenu />
      </ul>
    </>
  )
}

export default MenuComponents
