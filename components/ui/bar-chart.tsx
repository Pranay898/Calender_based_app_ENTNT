'use client'

import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface BarChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  height?: number
  className?: string
}

export function BarChart({
  data,
  index,
  categories,
  colors = ['#2563eb'],
  height = 350,
  className,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height} className={className}>
      <RechartsBarChart data={data}>
        <XAxis dataKey={index} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        {categories.map((category, i) => (
          <Bar key={category} dataKey={category} fill={colors[i % colors.length]} radius={[4, 4, 0, 0]} />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

