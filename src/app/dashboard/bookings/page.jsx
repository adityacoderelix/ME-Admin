"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CalendarIcon,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  SortAsc,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

// Added booking entry based on your provided details.
const bookings = [
  {
    id: "booking_1",
    guest: "Divya Yash",
    property: "Listing for Goa",
    checkIn: "24 March 2025",
    checkOut: "28 March 2025",
    total: "₹1,37,025",
    status: "Confirmed",
  },
]

export default function BookingsPage() {
  const [date, setDate] = React.useState()
  const [selectedBookings, setSelectedBookings] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("all")
  const [loading, setLoading] = React.useState(true)

  // Simulate a 2 second loading delay to show the skeleton UI.
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const filteredBookings = bookings.filter(
    (booking) =>
      (booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.property.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === "all" ||
        booking.status.toLowerCase() === activeTab.toLowerCase())
  )

  const toggleBookingSelection = (id) => {
    setSelectedBookings((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on bookings:`, selectedBookings)
    // Implement bulk action logic here
  }

  const renderBookingTable = (bookings) => {
    if (loading) {
      // Skeleton UI for the table structure
      return (
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      )
    }

    if (!loading && bookings.length === 0) {
      return (
        <div className="py-10 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            No bookings found.
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Looks like you haven't received any bookings yet.
          </p>
        </div>
      )
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedBookings.length === bookings.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBookings(bookings.map((b) => b.id))
                  } else {
                    setSelectedBookings([])
                  }
                }}
              />
            </TableHead>
            <TableHead className="w-[180px]">Guest</TableHead>
            <TableHead className="w-[180px]">Property</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>
              <Button variant="ghost" className="p-0 hover:bg-transparent">
                <span>Total</span>
                <SortAsc className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                <Checkbox
                  checked={selectedBookings.includes(booking.id)}
                  onCheckedChange={() => toggleBookingSelection(booking.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{booking.guest}</TableCell>
              <TableCell>{booking.property}</TableCell>
              <TableCell>{booking.checkIn}</TableCell>
              <TableCell>{booking.checkOut}</TableCell>
              <TableCell>{booking.total}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === "Confirmed"
                      ? "default"
                      : booking.status === "Pending"
                      ? "secondary"
                      : booking.status === "Completed"
                      ? "success"
                      : "destructive"
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Modify booking</DropdownMenuItem>
                    <DropdownMenuItem>Send message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Cancel booking
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-gray-200 min-h-screen">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-semibold font-bricolage tracking-tight">
          Bookings
        </h2>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[280px] justify-start text-left font-normal ${
                  !date && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button className="bg-primaryGreen text-white hover:bg-brightGreen rounded-md">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground bg-white rounded-md" />
              <Input
                placeholder="Search bookings"
                className="pl-8 bg-white rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>
                Check-in Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Check-out Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Total Amount
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Property Type
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Select>
            <SelectTrigger className="w-[180px] bg-white rounded-md">
              <SelectValue className="bg-white" placeholder="Bulk Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="confirm">Confirm Selected</SelectItem>
              <SelectItem value="cancel">Cancel Selected</SelectItem>
              <SelectItem value="refund">Refund Selected</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primaryGreen text-white hover:bg-brightGreen rounded-md" onClick={() => handleBulkAction("apply")}>
            Apply
          </Button>
        </div>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>
                Manage and view details of all bookings
              </CardDescription>
            </CardHeader>
            <CardContent>{renderBookingTable(filteredBookings)}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="confirmed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Confirmed Bookings</CardTitle>
              <CardDescription>
                View and manage all confirmed bookings
              </CardDescription>
            </CardHeader>
            <CardContent>{renderBookingTable(filteredBookings)}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Bookings</CardTitle>
              <CardDescription>
                Review and process pending bookings
              </CardDescription>
            </CardHeader>
            <CardContent>{renderBookingTable(filteredBookings)}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Bookings</CardTitle>
              <CardDescription>
                View details of completed bookings
              </CardDescription>
            </CardHeader>
            <CardContent>{renderBookingTable(filteredBookings)}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Bookings</CardTitle>
              <CardDescription>
                Review cancelled bookings and manage refunds
              </CardDescription>
            </CardHeader>
            <CardContent>{renderBookingTable(filteredBookings)}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
