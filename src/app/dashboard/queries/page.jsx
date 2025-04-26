"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, MoreHorizontal } from 'lucide-react'
import { format } from 'date-fns'

// Mock data for queries from hosts and users
const queries = [
  { id: 1, name: "John Doe", type: "User", subject: "Booking Cancellation", status: "Open", date: "2023-06-15" },
  { id: 2, name: "Jane Smith", type: "Host", subject: "Payout Issues", status: "Closed", date: "2023-06-14" },
  { id: 3, name: "Mike Johnson", type: "User", subject: "Early Check-in Request", status: "In Progress", date: "2023-06-13" },
  { id: 4, name: "Emily Brown", type: "User", subject: "Refund Inquiry", status: "Open", date: "2023-06-12" },
  { id: 5, name: "Alex Wilson", type: "Host", subject: "Listing Update", status: "Closed", date: "2023-06-11" },
]

export default function AdminQueriesPage() {
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [dateRange, setDateRange] = useState({ from: null, to: null })
  const [timePeriod, setTimePeriod] = useState("Last 7 days")

  const filteredQueries = queries.filter(query => 
    (selectedStatus === "All" || query.status === selectedStatus) &&
    (selectedType === "All" || query.type === selectedType) &&
    (!dateRange.from || new Date(query.date) >= dateRange.from) &&
    (!dateRange.to || new Date(query.date) <= dateRange.to)
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Queries</h1>

      <Card>
        <CardHeader>
          <CardTitle>Query Filters</CardTitle>
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
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="type">Query Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Host">Host</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="date-range">Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date-range"
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!dateRange.from && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="time-period">Time Period</Label>
              <Select value={timePeriod} onValueChange={setTimePeriod}>
                <SelectTrigger id="time-period">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                  <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                  <SelectItem value="Last 3 months">Last 3 months</SelectItem>
                  <SelectItem value="Last 6 months">Last 6 months</SelectItem>
                  <SelectItem value="Last year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Query List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQueries.map((query) => (
                <TableRow key={query.id}>
                  <TableCell>{query.id}</TableCell>
                  <TableCell>{query.name}</TableCell>
                  <TableCell>
                    <Badge variant={query.type === "User" ? "default" : "secondary"}>
                      {query.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{query.subject}</TableCell>
                  <TableCell>
                    <Badge variant={query.status === "Open" ? "destructive" : query.status === "In Progress" ? "warning" : "success"}>
                      {query.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{query.date}</TableCell>
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
                        <DropdownMenuItem>Assign to Agent</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Close Query</DropdownMenuItem>
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