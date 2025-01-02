'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Home, Calendar, Building2, MessageSquare, LogOut, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { companies, communications } from '@/lib/mockData'
import { User } from '@/types'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
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

    // Calculate notifications
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const overdue = communications.filter(c => new Date(c.date) < today).length
    const dueToday = communications.filter(c => new Date(c.date).toDateString() === today.toDateString()).length
    setNotifications({ overdue, dueToday })
  }, [router, pathname])

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Companies Dashboard', href: '/companies', icon: Building2 },
    { name: 'Calendar View', href: '/calendar', icon: Calendar },
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
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800">
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
                  className="w-full justify-start"
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-800">
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
          <div className="p-4 flex justify-between items-center bg-gray-900 border-b border-gray-800">
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
              <DropdownMenuContent align="end" className="w-56 bg-gray-800 text-white border-gray-700">
                <DropdownMenuItem className="focus:bg-gray-700">
                  Overdue: {notifications.overdue}
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-gray-700">
                  Due Today: {notifications.dueToday}
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

