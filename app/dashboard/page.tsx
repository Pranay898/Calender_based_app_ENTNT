'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  email: string
  role: 'admin' | 'user'
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-semibold mb-6">🏠 Dashboard</h1>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Welcome, {user.email}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You are logged in as: {user.role}</p>
          <p>Use the sidebar to navigate through the application.</p>
        </CardContent>
      </Card>
    </div>
  )
}

