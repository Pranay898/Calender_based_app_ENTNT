'use client'

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, X } from 'lucide-react'

// Demo data matching the screenshot
const methods = [
  {
    name: 'Visit',
    sequence: 16,
    mandatory: false,
    status: 'pending'
  },
  {
    name: 'Phone Call',
    sequence: 33,
    mandatory: false,
    status: 'pending'
  },
  {
    name: 'Email',
    sequence: 131,
    mandatory: true,
    status: 'inactive'
  },
  // Add other methods from screenshot...
]

export default function CommunicationMethodsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-2">💬 Communication Methods</h1>
          <p className="text-gray-400">
            Manage all communication methods for your organization
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Add Method
        </Button>
      </div>

      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-900">
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-400">Name</TableHead>
              <TableHead className="text-gray-400">Sequence</TableHead>
              <TableHead className="text-gray-400">Mandatory</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {methods.map((method) => (
              <TableRow key={method.name} className="border-gray-800">
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

