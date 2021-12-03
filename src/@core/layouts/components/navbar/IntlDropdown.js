// ** React Imports
import { useContext } from "react"

// ** Third Party Components
import ReactCountryFlag from "react-country-flag"
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"

// ** Internationalization Context
import { IntlContext } from "../../../../utility/context/Internationalization"

// ** Flags

import uzb from '../../../assets/flag/uzbekistan.svg'
import russian from '../../../assets/flag/russia.svg'
import us from '../../../assets/flag/united-states.svg'

const IntlDropdown = ({ skin }) => {
  // ** Context
  const intlContext = useContext(IntlContext)


  const handleFlagChange = () => {
    if (intlContext.locale === "kr") {
      return  uzb
    } else if (intlContext.locale === "ru") {
      return russian
    } else if (intlContext.locale === "us") {
      return us
    } else {
      return uzb
    }
  }

  // ** Vars
  const langObj = {
    kr: "Ўзбекча",
    uz: "O'zbekcha",
    ru: "Русский",
    us: "English"
  }

  // ** Function to switch Language
  const handleLangUpdate = (e, lang) => {
    e.preventDefault()
    intlContext.switchLanguage(lang)
  }

  return (
    <UncontrolledDropdown
      href="/"
      tag="li"
      className="dropdown-language nav-item rounded"
      style={{
        border: `2px solid ${skin === "dark" ? "rgb(96,89,196,0.5)" : "rgba(255,255,255)"}`,
        padding: "0.5em",
        marginRight: "0.5em"
      }}
    >
      <DropdownToggle href="/" tag="a" className="nav-link" onClick={(e) => e.preventDefault()}>
        <img className='className="country-flag flag-icon' height={20} width={20} src={handleFlagChange()} alt="flag" />

        <span className="selected-language">{langObj[intlContext.locale]}</span>
      </DropdownToggle>
      <DropdownMenu className="mt-0" right>
        <DropdownItem href="/" tag="a" onClick={(e) => handleLangUpdate(e, "kr")}>
          <img className='className="country-flag flag-icon' height={20} width={20} src={uzb} alt="flag" />
          <span className="ml-1">Ўзбекча</span>
        </DropdownItem>
        <DropdownItem href="/" tag="a" onClick={(e) => handleLangUpdate(e, "uz")}>
          <img className='className="country-flag flag-icon' height={20} width={20} src={uzb} alt="flag" />
          <span className="ml-1">O'zbekcha</span>
        </DropdownItem>
        <DropdownItem href="/" tag="a" onClick={(e) => handleLangUpdate(e, "ru")}>
          <img className='className="country-flag flag-icon' height={20} width={20} src={russian} alt="flag" />
          <span className="ml-1">Русский</span>
        </DropdownItem>
        <DropdownItem href="/" tag="a" onClick={(e) => handleLangUpdate(e, "us")}>
          <img className='className="country-flag flag-icon' height={20} width={20} src={us} alt="flag" />
          <span className="ml-1">English</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default IntlDropdown
