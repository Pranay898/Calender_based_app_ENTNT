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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Check, X } from 'lucide-react'
import { communicationMethods as initialMethods } from '@/lib/mockData'
import { CommunicationMethod } from '@/types'
import { useAppContext } from '@/components/layout/AppContext'

export default function CommunicationMethodsPage() {
  // const [methods, setMethods] = useState<CommunicationMethod[]>(initialMethods)
  const { communicationMethods, setCommunicationMethods } = useAppContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newMethod, setNewMethod] = useState<Partial<CommunicationMethod>>({
    name: '',
    description: '',
    sequence: 0,
    mandatory: false,
    status: 'active'
  })
  const { toast } = useToast()

  const handleAddMethod = () => {
    const method: CommunicationMethod = {
      id: `method-${Date.now()}`,
      ...newMethod as CommunicationMethod
    }
    setCommunicationMethods(prev => [...prev, method])
    setIsDialogOpen(false)
    setNewMethod({
      name: '',
      description: '',
      sequence: 0,
      mandatory: false,
      status: 'active'
    })
    toast({
      title: "Method Added",
      description: `${method.name} has been added successfully.`,
    })
  }

  const handleEditMethod = (method: CommunicationMethod) => {
    // Implement edit functionality
    console.log('Edit method:', method)
  }

  const handleDeleteMethod = (methodId: string) => {
    setCommunicationMethods(prev => prev.filter(method => method.id !== methodId))
    toast({
      title: "Method Deleted",
      description: "The communication method has been deleted successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">💬 Communication Methods</h1>
          <p className="text-gray-400">
            Manage all communication methods for your organization
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 mt-4 md:mt-0">
              + Add Method
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#111111] text-white border-[#1E1E1E]">
            <DialogHeader>
              <DialogTitle>Add New Communication Method</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Method Name</Label>
                <Input 
                  id="name"
                  value={newMethod.name}
                  onChange={(e) => setNewMethod({...newMethod, name: e.target.value})}
                  className="bg-[#1E1E1E] border-[#2E2E2E] text-white"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description"
                  value={newMethod.description}
                  onChange={(e) => setNewMethod({...newMethod, description: e.target.value})}
                  className="bg-[#1E1E1E] border-[#2E2E2E] text-white"
                />
              </div>
              <div>
                <Label htmlFor="sequence">Sequence</Label>
                <Input 
                  id="sequence"
                  type="number"
                  value={newMethod.sequence}
                  onChange={(e) => setNewMethod({...newMethod, sequence: parseInt(e.target.value)})}
                  className="bg-[#1E1E1E] border-[#2E2E2E] text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="mandatory"
                  checked={newMethod.mandatory}
                  onCheckedChange={(checked) => setNewMethod({...newMethod, mandatory: checked})}
                />
                <Label htmlFor="mandatory">Mandatory</Label>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={newMethod.status} 
                  onValueChange={(value: 'active' | 'inactive' | 'pending') => setNewMethod({...newMethod, status: value})}
                >
                  <SelectTrigger id="status" className="w-full bg-[#1E1E1E] border-[#2E2E2E]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddMethod} className="w-full bg-blue-600 hover:bg-blue-700">
                Add Method
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border border-[#1E1E1E] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#111111]">
            <TableRow className="border-[#1E1E1E]">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Sequence</TableHead>
              <TableHead className="text-gray-400">Mandatory</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {communicationMethods.map((method) => (
              <TableRow key={method.id} className="border-[#1E1E1E]">
                <TableCell>{method.name}</TableCell>
                <TableCell>{method.sequence}</TableCell>
                <TableCell>
                  {method.mandatory ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-500" />
                  )}
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                    ${method.status === 'active' ? 'bg-green-500/10 text-green-500' : 
                      method.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                      'bg-gray-500/10 text-gray-500'}`}>
                    {method.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600/10" onClick={() => handleEditMethod(method)}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-600 text-red-600 hover:bg-red-600/10" onClick={() => handleDeleteMethod(method.id)}>
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

