'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Company, Communication, CommunicationMethod } from '@/types'
import { companies as initialCompanies, communications as initialCommunications, communicationMethods as initialMethods } from '@/lib/mockData'

interface AppContextType {
  companies: Company[]
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>
  communications: Communication[]
  setCommunications: React.Dispatch<React.SetStateAction<Communication[]>>
  communicationMethods: CommunicationMethod[]
  setCommunicationMethods: React.Dispatch<React.SetStateAction<CommunicationMethod[]>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies)
  const [communications, setCommunications] = useState<Communication[]>(initialCommunications)
  const [communicationMethods, setCommunicationMethods] = useState<CommunicationMethod[]>(initialMethods)

  useEffect(() => {
    // You can add any initialization logic here
  }, [])

  return (
    <AppContext.Provider value={{
      companies,
      setCompanies,
      communications,
      setCommunications,
      communicationMethods,
      setCommunicationMethods
    }}>
      {children}
    </AppContext.Provider>
  )
}

