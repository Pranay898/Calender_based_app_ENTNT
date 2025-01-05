'use client'

import { useState, useEffect } from 'react'
import { format, isToday, isPast, addDays } from 'date-fns'
import { ExternalLink, Plus } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { communicationMethods } from '@/lib/mockData'
import { useAppContext } from '@/components/layout/AppContext'
import { Company, Communication } from '@/types'

export default function CompaniesPage() {
  const { companies, setCompanies, communications, setCommunications } = useAppContext()
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCommunication, setNewCommunication] = useState({
    type: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    notes: ''
  })
  const { toast } = useToast()

  const companyData = companies.map(company => {
    const companyComms = communications.filter(c => c.companyId === company.id)
    const sortedComms = companyComms.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const recentCommunications = sortedComms.slice(0, 5)
    const lastCommunication = sortedComms[0]
    const nextCommunicationDate = lastCommunication 
      ? addDays(new Date(lastCommunication.date), company.communicationPeriodicity)
      : new Date()
    return { 
      ...company, 
      recentCommunications, 
      nextCommunication: { date: nextCommunicationDate, type: 'Scheduled' } 
    }
  })

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompanies(prev => 
      prev.includes(companyId) 
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    )
  }

  const handleLogCommunication = () => {
    setIsDialogOpen(true)
  }

  const handleSubmitCommunication = () => {
    const newComms = selectedCompanies.map(companyId => ({
      id: `comm-${Date.now()}-${companyId}`,
      companyId,
      type: newCommunication.type,
      date: newCommunication.date,
      notes: newCommunication.notes
    }))

    setCommunications(prev => [...prev, ...newComms])
    setIsDialogOpen(false)
    setNewCommunication({ type: '', date: format(new Date(), 'yyyy-MM-dd'), notes: '' })
    setSelectedCompanies([])

    toast({
      title: "Communication Logged",
      description: `Communication logged for ${selectedCompanies.length} companies.`,
    })
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">📋 Companies Dashboard</h1>
          <p className="text-gray-400">
            Manage and track communications with your companies
          </p>
        </div>
        <Button 
          onClick={handleLogCommunication}
          disabled={selectedCompanies.length === 0}
          className="bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0"
        >
          <Plus className="mr-2 h-4 w-4" />
          Log Communication
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {companyData.map((company) => {
          const isOverdue = company.nextCommunication && isPast(new Date(company.nextCommunication.date))
          const isDueToday = company.nextCommunication && isToday(new Date(company.nextCommunication.date))
          
          return (
            <Card 
              key={company.id} 
              className={`bg-[#111111] border-[#1E1E1E] p-4 md:p-6 transition-all duration-300 ${
                isOverdue ? 'border-l-4 border-l-red-500' :
                isDueToday ? 'border-l-4 border-l-yellow-500' :
                ''
              }`}
            >
              <div className="flex items-start">
                <Checkbox
                  checked={selectedCompanies.includes(company.id)}
                  onCheckedChange={() => handleCompanySelect(company.id)}
                  className="mt-1"
                />
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{company.name}</h3>
                      <a href={company.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-gray-400">
                    📞 {company.phoneNumbers[0]}
                  </div>
                  <div className="mt-1 text-sm text-gray-400">
                    📍 {company.location}
                  </div>
                  
                  {company.nextCommunication && (
                    <div className="mt-4">
                      <div className="text-sm font-medium">Next Communication:</div>
                      <div className={`mt-1 inline-flex items-center rounded-full px-3 py-1 text-sm ${
                        isOverdue ? 'bg-red-500/10 text-red-500' :
                        isDueToday ? 'bg-yellow-500/10 text-yellow-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>
                        {company.nextCommunication.type} - {format(new Date(company.nextCommunication.date), 'MMM d, yyyy')}
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <div className="text-sm font-medium">Recent Communications:</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {company.recentCommunications.map((comm) => (
                        <div
                          key={comm.id}
                          className="inline-flex items-center rounded-full bg-[#1E1E1E] px-3 py-1 text-sm text-gray-300"
                        >
                          {comm.type} - {format(new Date(comm.date), 'MMM d')}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#111111] text-white border-[#1E1E1E]">
          <DialogHeader>
            <DialogTitle>Log Communication</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select 
              value={newCommunication.type} 
              onValueChange={(value) => setNewCommunication({...newCommunication, type: value})}
            >
              <SelectTrigger className="w-full bg-[#1E1E1E] border-[#2E2E2E]">
                <SelectValue placeholder="Select communication type" />
              </SelectTrigger>
              <SelectContent>
                {communicationMethods.map((method) => (
                  <SelectItem key={method.id} value={method.name}>{method.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input 
              type="date" 
              value={newCommunication.date}
              onChange={(e) => setNewCommunication({...newCommunication, date: e.target.value})}
              className="bg-[#1E1E1E] border-[#2E2E2E] text-white"
            />
            <Textarea 
              placeholder="Notes" 
              value={newCommunication.notes}
              onChange={(e) => setNewCommunication({...newCommunication, notes: e.target.value})}
              className="bg-[#1E1E1E] border-[#2E2E2E] text-white"
            />
            <Button onClick={handleSubmitCommunication} className="w-full bg-blue-600 hover:bg-blue-700">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

