"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from 'lucide-react'

// Mock data for complaints
const complaints = [
  { id: 1, customer: "Alice Johnson", subject: "Noisy Neighbors", status: "Open", priority: "High", date: "2023-06-15" },
  { id: 2, customer: "Bob Smith", subject: "Cleanliness Issue", status: "In Progress", priority: "Medium", date: "2023-06-14" },
  { id: 3, customer: "Charlie Brown", subject: "Broken AC", status: "Closed", priority: "Low", date: "2023-06-13" },
  { id: 4, customer: "Diana Ross", subject: "Missing Amenities", status: "Open", priority: "Medium", date: "2023-06-12" },
  { id: 5, customer: "Edward Norton", subject: "Booking Dispute", status: "In Progress", priority: "High", date: "2023-06-11" },
]

const ComplaintsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")

  const filteredComplaints = complaints.filter(complaint => 
    (selectedStatus === "All" || complaint.status === selectedStatus) &&
    (selectedPriority === "All" || complaint.priority === selectedPriority)
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Complaint Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Complaint Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="status">Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem  value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="priority">Priority</Label>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search">Search</Label>
              <Input id="search" placeholder="Search complaints..." />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Complaint List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.id}</TableCell>
                  <TableCell>{complaint.customer}</TableCell>
                  <TableCell>{complaint.subject}</TableCell>
                  <TableCell>
                    <Badge variant={complaint.status === "Open" ? "default" : complaint.status === "In Progress" ? "secondary" : "outline"}>
                      {complaint.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={complaint.priority === "High" ? "destructive" : complaint.priority === "Medium" ? "default" : "secondary"}>
                      {complaint.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{complaint.date}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Change Priority</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Close Complaint</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ComplaintsPage