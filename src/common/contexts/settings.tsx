import React, { useState } from 'react'
import { hasStorage } from 'src/common/utils/featureTests'

let defaultSettings: any = {
  chartType: 'line',
  theme: 'light',
}

if (hasStorage && localStorage.settings) {
  defaultSettings = JSON.parse(localStorage.settings)
}

const SettingsContext = React.createContext(defaultSettings)

export const SettingsProvider = ({ children }: { children: any }) => {
  const [settings, setSettings] = useState(defaultSettings)

  const handleNewSettings = (settings: any) => {
    setSettings(settings)
    defaultSettings = settings
    if (hasStorage) {
      localStorage.settings = JSON.stringify(settings)
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings: (settings: any) => handleNewSettings(settings),
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContext
