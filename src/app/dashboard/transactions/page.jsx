"use client"

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowDownIcon, ArrowUpIcon, CalendarIcon, Download, Filter, Search, SortAsc } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"

// Transaction entry for the booking "Listing for Goa" by guest "Divya Yash"
const transactions = [
  {
    id: "txnrzpteste8s3h83j9030989437",
    type: "Pay-in",
    amount: 137025,
    status: "Completed",
    date: format(new Date(), "PPpp"), // current date time
    guest: "Divya Yash",
    property: "Listing for Goa",
    method: "Net Banking"
  }
]

export default function TransactionsPage() {
  const [date, setDate] = React.useState()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [transactionType, setTransactionType] = React.useState("all")

  const filteredTransactions = transactions.filter(transaction => 
    (transaction.guest?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     transaction.property.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (transactionType === "all" || transaction.type.toLowerCase() === transactionType.toLowerCase())
  )

  const renderTransactionTable = (transactions) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>
            <Button variant="ghost" className="p-0 hover:bg-transparent">
              <span>Amount</span>
              <SortAsc className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Guest/Host</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">#{transaction.id}</TableCell>
            <TableCell>
              <Badge variant={transaction.type === 'Pay-in' ? 'default' : transaction.type === 'Payout' ? 'secondary' : 'destructive'}>
                {transaction.type === 'Pay-in' ? <ArrowDownIcon className="mr-1 h-3 w-3 inline" /> : <ArrowUpIcon className="mr-1 h-3 w-3 inline" />}
                {transaction.type}
              </Badge>
            </TableCell>
            <TableCell>₹{transaction.amount.toLocaleString()}</TableCell>
            <TableCell>
              <Badge variant={transaction.status === 'Completed' ? 'success' : 'warning'}>
                {transaction.status}
              </Badge>
            </TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.guest}</TableCell>
            <TableCell>{transaction.property}</TableCell>
            <TableCell>{transaction.method}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-[280px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4" onValueChange={setTransactionType}>
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="pay-in">Pay-ins</TabsTrigger>
          <TabsTrigger value="payout">Payouts</TabsTrigger>
          <TabsTrigger value="refund">Refunds</TabsTrigger>
        </TabsList>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions"
                className="pl-8"
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
              {/* <DropdownMenuCheckboxItem>Date Range</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Amount</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Date (Newest First)</SelectItem>
              <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
              <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
              <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Transaction List</CardTitle>
            <CardDescription>
              View and manage financial transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderTransactionTable(filteredTransactions)}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
