// AlertContext.jsx — global alert/emergency state
import { createContext, useContext, useState } from 'react'

const AlertContext = createContext(null)

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null)
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  )
}

export function useAlertContext() {
  return useContext(AlertContext)
}
