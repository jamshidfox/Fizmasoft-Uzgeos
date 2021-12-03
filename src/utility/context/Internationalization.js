// ** React Imports
import { useState, createContext } from 'react'

// ** Intl Provider Import
import { IntlProvider } from 'react-intl'

// ** Core Language Data


// ** User Language Data
import userMessagesKr from "../../assets/data/locales/kr.json"
import userMessagesUz from "../../assets/data/locales/uz.json"
import userMessagesRu from "../../assets/data/locales/ru.json"
import userMessagesEn from "../../assets/data/locales/en.json"
// ** Menu msg obj
const menuMessages = {
  kr: {...userMessagesKr },
  uz: {...userMessagesUz },
  ru: {...userMessagesRu },
  us: { ...userMessagesEn }
}

// ** Create Context
const Context = createContext()

const IntlProviderWrapper = ({ children }) => {
  // ** States
  const [locale, setLocale] = useState("kr")
  const [messages, setMessages] = useState(menuMessages["kr"])

  // ** Switches Language
  const switchLanguage = (lang) => {
    setLocale(lang)
    setMessages(menuMessages[lang])
  }

  return (
    <Context.Provider value={{ locale, switchLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export { IntlProviderWrapper, Context as IntlContext }
