'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { companies } from '@/lib/mockData'
import { Company } from '@/types'

export default function AdminCompaniesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    name: '',
    location: '',
    linkedinProfile: '',
    emails: [''],
    phoneNumbers: [''],
    comments: '',
    communicationPeriodicity: 30,
    status: 'active'
  })

  const handleAddCompany = () => {
    // In a real application, you would send this data to your backend
    console.log('New company:', newCompany)
    setIsDialogOpen(false)
    setNewCompany({
      name: '',
      location: '',
      linkedinProfile: '',
      emails: [''],
      phoneNumbers: [''],
      comments: '',
      communicationPeriodicity: 30,
      status: 'active'
    })
    // Here you would typically update the state with the new company
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">📋 Company Management</h1>
          <p className="text-gray-400">
            Manage companies and their communication periodicities in the system.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0">
              + Add New Company
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 text-white">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input 
                  id="name"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  value={newCompany.location}
                  onChange={(e) => setNewCompany({...newCompany, location: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input 
                  id="linkedin"
                  value={newCompany.linkedinProfile}
                  onChange={(e) => setNewCompany({...newCompany, linkedinProfile: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  value={newCompany.emails?.[0] || ''}
                  onChange={(e) => setNewCompany({...newCompany, emails: [e.target.value]})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  value={newCompany.phoneNumbers?.[0] || ''}
                  onChange={(e) => setNewCompany({...newCompany, phoneNumbers: [e.target.value]})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="periodicity">Communication Periodicity (days)</Label>
                <Input 
                  id="periodicity"
                  type="number"
                  value={newCompany.communicationPeriodicity}
                  onChange={(e) => setNewCompany({...newCompany, communicationPeriodicity: parseInt(e.target.value)})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newCompany.status} 
                  onValueChange={(value: 'active' | 'inactive' | 'pending') => setNewCompany({...newCompany, status: value})}
                >
                  <SelectTrigger id="status" className="w-full bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddCompany} className="w-full bg-blue-600 hover:bg-blue-700">
                Add Company
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-800">
        <Table>
          <TableHeader className="bg-gray-900">
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Address</TableHead>
              <TableHead className="text-gray-400">Phone</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Periodicity (Days)</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id} className="border-gray-800">
                <TableCell>{company.name}</TableCell>
                <TableCell className="text-gray-400">{company.location}</TableCell>
                <TableCell>{company.phoneNumbers[0]}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                    ${company.status === 'active' ? 'bg-green-500/10 text-green-500' : 
                      company.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                      'bg-gray-500/10 text-gray-500'}`}>
                    {company.status}
                  </span>
                </TableCell>
                <TableCell>{company.communicationPeriodicity}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600/10">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600/10">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

