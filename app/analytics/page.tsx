'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppContext } from '@/components/layout/AppContext'
import { BarChart } from "@/components/ui/bar-chart"

export default function AnalyticsPage() {
  const { companies, communications, communicationMethods } = useAppContext()
  const [timeFrame, setTimeFrame] = useState('all')

  const filteredCommunications = communications.filter(comm => {
    if (timeFrame === 'all') return true
    const commDate = new Date(comm.date)
    const now = new Date()
    if (timeFrame === 'month') return commDate >= new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    if (timeFrame === 'year') return commDate >= new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    return true
  })

  const communicationsByMethod = communicationMethods.map(method => ({
    name: method.name,
    total: filteredCommunications.filter(comm => comm.type === method.name).length
  }))

  const communicationsByCompany = companies.map(company => ({
    name: company.name,
    total: filteredCommunications.filter(comm => comm.companyId === company.id).length
  }))

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">📊 Analytics Dashboard</h1>
        <p className="text-gray-400">
          View insights and trends in your communication data
        </p>
      </div>

      <div className="mb-6">
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[200px] bg-[#111111] border-[#1E1E1E]">
            <SelectValue placeholder="Select Time Frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#111111] border-[#1E1E1E]">
          <CardHeader>
            <CardTitle>Communications by Method</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={communicationsByMethod}
              index="name"
              categories={["total"]}
              colors={["#adfa1d"]}
              className="h-[350px]"
            />
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-[#1E1E1E]">
          <CardHeader>
            <CardTitle>Communications by Company</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={communicationsByCompany}
              index="name"
              categories={["total"]}
              colors={["#2563eb"]}
              className="h-[350px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

