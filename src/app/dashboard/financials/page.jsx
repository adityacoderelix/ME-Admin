'use client'

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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { LineChart, BarChart } from "@/components/ui/chart"

// Mock data
const transactions = [
  { id: 1, type: 'Pay-in', amount: 15000, status: 'Completed', date: '2023-07-15', guest: 'Alice Johnson', property: 'Sunset Beach Villa' },
  { id: 2, type: 'Payout', amount: 12000, status: 'Pending', date: '2023-07-16', host: 'Bob Smith', property: 'Riverside Cottage' },
  { id: 3, type: 'Refund', amount: 5000, status: 'Completed', date: '2023-07-17', guest: 'Carol Williams', property: 'Luxury Apartment' },
  { id: 4, type: 'Pay-in', amount: 20000, status: 'Completed', date: '2023-07-18', guest: 'David Brown', property: 'Heritage Home' },
  { id: 5, type: 'Payout', amount: 16000, status: 'Completed', date: '2023-07-19', host: 'Eva Davis', property: 'Beachfront Studio' },
]

const invoices = [
  { id: 'INV-001', date: '2023-07-01', amount: 25000, status: 'Paid' },
  { id: 'INV-002', date: '2023-07-05', amount: 18000, status: 'Pending' },
  { id: 'INV-003', date: '2023-07-10', amount: 32000, status: 'Paid' },
  { id: 'INV-004', date: '2023-07-15', amount: 15000, status: 'Overdue' },
  { id: 'INV-005', date: '2023-07-20', amount: 28000, status: 'Paid' },
]

export default function FinancialsPage() {
  const [date, setDate] = React.useState()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [transactionTypeFilter, setTransactionTypeFilter] = React.useState(null)

  const filteredTransactions = transactions.filter(transaction => 
    (transaction.guest?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     transaction.host?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     transaction.property.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!transactionTypeFilter || transaction.type === transactionTypeFilter)
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
            <TableCell>{transaction.guest || transaction.host}</TableCell>
            <TableCell>{transaction.property}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderInvoiceTable = (invoices) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
            <TableCell>
              <Badge variant={invoice.status === 'Paid' ? 'success' : invoice.status === 'Pending' ? 'warning' : 'destructive'}>
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="sm">View</Button>
              <Button variant="ghost" size="sm">Download</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Financials</h2>
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

      {/* Key Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,25,00,000</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹37,50,000</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+49 from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹15,00,000</div>
            <p className="text-xs text-muted-foreground">For 89 hosts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue & Profits</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="taxes">Taxes & Invoices</TabsTrigger>
        </TabsList>

        {/* Revenue & Profits */}
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Profit Trends</CardTitle>
              <CardDescription>Monthly revenue and profit over the past year</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChart
                data={[
                  { month: "Jan", revenue: 7500000, profit: 2250000 },
                  { month: "Feb", revenue: 8200000, profit: 2460000 },
                  { month: "Mar", revenue: 9100000, profit: 2730000 },
                  { month: "Apr", revenue: 10200000, profit: 3060000 },
                  { month: "May", revenue: 11500000, profit: 3450000 },
                  { month: "Jun", revenue: 12500000, profit: 3750000 },
                ]}
                xField="month"
                yField={["revenue", "profit"]}
                className="h-[300px]"
                colors={["#3b82f6", "#10b981"]}
                yAxisWidth={60}
                showLegend={true}
                showTooltip={true}
                showXAxis={true}
                showYAxis={true}
                valueFormatter={{
                  revenue: (value) => `₹${(value / 100000).toFixed(2)}L`,
                  profit: (value) => `₹${(value / 100000).toFixed(2)}L`,
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Revenue by property type</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart
                data={[
                  { type: "Villas", revenue: 4500000 },
                  { type: "Apartments", revenue: 3200000 },
                  { type: "Cottages", revenue: 2800000 },
                  { type: "Homestays", revenue: 2000000 },
                ]}
                xField="type"
                yField="revenue"
                className="h-[300px]"
                colors={["#3b82f6"]}
                yAxisWidth={60}
                showLegend={false}
                showTooltip={true}
                showXAxis={true}
                showYAxis={true}
                valueFormatter={(value) => `₹${(value / 100000).toFixed(2)}L`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                View and manage all financial transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
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
                <ul className="flex space-x-4">
                  <li>
                    <a
                      href="#"
                      className={`text-sm ${transactionTypeFilter === 'Pay-in' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setTransactionTypeFilter(transactionTypeFilter === 'Pay-in' ? null : 'Pay-in');
                      }}
                    >
                      Pay-ins
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`text-sm ${transactionTypeFilter === 'Payout' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setTransactionTypeFilter(transactionTypeFilter === 'Payout' ? null : 'Payout');
                      }}
                    >
                      Payouts
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className={`text-sm ${transactionTypeFilter === 'Refund' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setTransactionTypeFilter(transactionTypeFilter === 'Refund' ? null : 'Refund');
                      }}
                    >
                      Refunds
                    </a>
                  </li>
                </ul>
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
                      Date Range
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Amount
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Status
                    </DropdownMenuCheckboxItem>
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
              {renderTransactionTable(filteredTransactions)}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Taxes & Invoices */}
        <TabsContent value="taxes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Summary</CardTitle>
              <CardDescription>Overview of tax liabilities and payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tax Collected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹18,75,000</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Tax Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹5,62,500</div>
                    <p className="text-xs text-muted-foreground">Due in 15 days</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Last Tax Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹13,12,500</div>
                    <p className="text-xs text-muted-foreground">Paid on July 15, 2023</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Tax Due Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Aug 15, 2023</div>
                    <p className="text-xs text-muted-foreground">Mark your calendar</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>
                View and manage all invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search invoices"
                      className="pl-8"
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
                      Date Range
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Amount
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Status
                    </DropdownMenuCheckboxItem>
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
              {renderInvoiceTable(invoices)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}