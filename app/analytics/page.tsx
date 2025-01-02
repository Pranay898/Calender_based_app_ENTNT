'use client'

import { useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { companies, communications, communicationMethods } from '@/lib/mockData'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default function AnalyticsPage() {
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
    method: method.name,
    count: filteredCommunications.filter(comm => comm.type === method.name).length
  }))

  const communicationsByCompany = companies.map(company => ({
    company: company.name,
    count: filteredCommunications.filter(comm => comm.companyId === company.id).length
  }))

  const barChartData = {
    labels: communicationsByMethod.map(item => item.method),
    datasets: [
      {
        label: 'Number of Communications',
        data: communicationsByMethod.map(item => item.count),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  const pieChartData = {
    labels: communicationsByCompany.map(item => item.company),
    datasets: [
      {
        data: communicationsByCompany.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">📊 Analytics Dashboard</h1>
        <p className="text-gray-400">
          View insights and trends in your communication data
        </p>
      </div>

      <div className="mb-6">
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[200px] bg-gray-900 border-gray-800">
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
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Communications by Method</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Communications by Company</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

