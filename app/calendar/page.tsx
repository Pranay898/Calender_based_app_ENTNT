'use client'

import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday as isDateToday, isPast } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppContext } from '@/components/layout/AppContext'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarPage() {
  const { companies, communications, communicationMethods } = useAppContext()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedCompany, setSelectedCompany] = useState('all')
  const [selectedMethod, setSelectedMethod] = useState('all')

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const filteredCommunications = communications.filter(comm => {
    const matchesCompany = selectedCompany === 'all' || comm.companyId === selectedCompany
    const matchesMethod = selectedMethod === 'all' || comm.type === selectedMethod
    return matchesCompany && matchesMethod
  })

  const handlePrevMonth = () => setCurrentDate(date => new Date(date.getFullYear(), date.getMonth() - 1, 1))
  const handleNextMonth = () => setCurrentDate(date => new Date(date.getFullYear(), date.getMonth() + 1, 1))

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">📅 Calendar View</h1>
        <p className="text-gray-400">
          View and manage all communications in a calendar interface
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-[200px] bg-[#111111] border-[#1E1E1E]">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {companies.map(company => (
              <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMethod} onValueChange={setSelectedMethod}>
          <SelectTrigger className="w-[200px] bg-[#111111] border-[#1E1E1E]">
            <SelectValue placeholder="Filter by Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            {communicationMethods.map(method => (
              <SelectItem key={method.id} value={method.name}>{method.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-[#111111] rounded-lg border border-[#1E1E1E] p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-xl font-semibold">
              {format(currentDate, 'MMMM yyyy')}
            </div>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-[#1E1E1E]">
          {DAYS.map(day => (
            <div key={day} className="p-4 text-center font-medium">
              {day}
            </div>
          ))}

          {monthDays.map((day, i) => {
            const dayComms = filteredCommunications.filter(comm => isSameDay(new Date(comm.date), day))
            const isCurrentMonth = isSameMonth(day, currentDate)
            const isToday = isDateToday(day)
            const isPastDay = isPast(day) && !isToday

            return (
              <div
                key={i}
                className={`min-h-[100px] p-2 ${
                  isCurrentMonth ? 'bg-[#111111]' : 'bg-[#0A0A0A]'
                } ${
                  isToday ? 'border-2 border-blue-500' : ''
                } ${
                  isPastDay ? 'opacity-50' : ''
                }`}
              >
                <div className={`text-sm ${isToday ? 'text-blue-500 font-bold' : 'text-gray-400'}`}>
                  {format(day, 'd')}
                </div>
                {dayComms.map(comm => {
                  const company = companies.find(c => c.id === comm.companyId)
                  return (
                    <div key={comm.id} className="mt-2 p-2 rounded bg-[#1E1E1E] text-sm">
                      <div className="font-medium">{company?.name}</div>
                      <div className="text-gray-400">{comm.type}</div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

