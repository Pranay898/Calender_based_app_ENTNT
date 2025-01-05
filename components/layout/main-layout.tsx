'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Home, Calendar, Building2, MessageSquare, LogOut, Bell, BarChart2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { User } from '@/types'
import { AppProvider, useAppContext } from './AppContext'

interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayoutContent({ children }: MainLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const { companies, communications } = useAppContext()
  const [notifications, setNotifications] = useState<{ overdue: number, dueToday: number }>({ overdue: 0, dueToday: 0 })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData && pathname !== '/login') {
      router.push('/login')
      return
    }
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router, pathname])

  useEffect(() => {
    // Calculate notifications
    const calculateNotifications = () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const overdue = communications.filter(c => new Date(c.date) < today).length
      const dueToday = communications.filter(c => new Date(c.date).toDateString() === today.toDateString()).length
      setNotifications({ overdue, dueToday })
    }

    calculateNotifications()

    // Set up an interval to update notifications every minute
    const intervalId = setInterval(calculateNotifications, 60000)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId)
  }, [communications])

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Companies', href: '/companies', icon: Building2 },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    ...(user?.role === 'admin' ? [
      { name: 'Admin Companies', href: '/admin/companies', icon: Building2 },
      { name: 'Admin Communication Methods', href: '/admin/methods', icon: MessageSquare },
    ] : []),
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (pathname === '/login') {
    return <>{children}</>
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-[#111111] border-r border-[#1E1E1E]">
          <div className="flex flex-col h-full">
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-400">{user.role}</div>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-start ${pathname === item.href ? 'bg-[#1E1E1E]' : ''}`}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </nav>
            <div className="p-4 border-t border-[#1E1E1E]">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 flex justify-between items-center bg-[#111111] border-b border-[#1E1E1E]">
            <h1 className="text-xl font-semibold">Communication Tracker</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  {(notifications.overdue + notifications.dueToday > 0) && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500">
                      {notifications.overdue + notifications.dueToday}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1E1E1E] text-white border-[#2E2E2E]">
                <DropdownMenuItem className="focus:bg-[#2E2E2E]">
                  <span className="flex items-center">
                    <Badge variant="destructive" className="mr-2">{notifications.overdue}</Badge>
                    Overdue
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-[#2E2E2E]">
                  <span className="flex items-center">
                    <Badge variant="warning" className="mr-2">{notifications.dueToday}</Badge>
                    Due Today
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <AppProvider>
      <MainLayoutContent>{children}</MainLayoutContent>
    </AppProvider>
  )
}

