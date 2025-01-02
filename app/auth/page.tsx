'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Demo credentials
const DEMO_USERS = {
  admin: { email: 'admin@demo.com', password: 'admin123', role: 'admin' },
  user: { email: 'user@demo.com', password: 'user123', role: 'user' }
}

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    // Demo authentication
    if (email === DEMO_USERS.admin.email && password === DEMO_USERS.admin.password) {
      localStorage.setItem('user', JSON.stringify({ ...DEMO_USERS.admin }))
      router.push('/dashboard')
    } else if (email === DEMO_USERS.user.email && password === DEMO_USERS.user.password) {
      localStorage.setItem('user', JSON.stringify({ ...DEMO_USERS.user }))
      router.push('/dashboard')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-[400px] bg-gray-900 text-white border-gray-800">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
                <div className="text-sm text-gray-400 text-center mt-4">
                  Demo Credentials:
                  <br />
                  Admin: admin@demo.com / admin123
                  <br />
                  User: user@demo.com / user123
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

