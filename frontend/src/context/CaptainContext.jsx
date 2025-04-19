import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext()

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
  return (
    <div>
    <CaptainDataContext.Provider value={{ captain, setCaptain, isLoading, setIsLoading, error, setError }}>
        {children}
    </CaptainDataContext.Provider>
    </div>
  )
}

export default CaptainContext