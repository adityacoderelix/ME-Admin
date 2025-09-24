"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CalendarIcon,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  SortAsc,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDays, addMonths, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Added booking entry based on your provided details.
// const bookings = [
//   {
//     id: "booking_1",
//     guest: "Divya Yash",
//     property: "Listing for Goa",
//     checkIn: "24 March 2025",
//     checkOut: "28 March 2025",
//     total: "₹1,37,025",
//     status: "Confirmed",
//   },
// ];
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export default function BookingsPage() {
  const [bookings, setBookings] = React.useState([
    // {
    //   id: "booking_1",
    //   guest: "Divya Yash",
    //   property: "Listing for Goa",
    //   checkIn: "24 March 2025",
    //   checkOut: "28 March 2025",
    //   total: "₹1,37,025",
    //   status: "Pending",
    // },
  ]);
  const router = useRouter();
  const [date, setDate] = React.useState({
    from: addMonths(new Date(), -1),
    to: new Date(),
  });
  const [selectedBookings, setSelectedBookings] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("all");
  const [loading, setLoading] = React.useState(true);
  const [userEmail, setUserEmail] = React.useState();
  const [rejectDialogOpen, setRejectDialogOpen] = React.useState(false);
  const [bookingId, setBookingId] = React.useState(null);
  // Simulate a 2 second loading delay to show the skeleton UI.
  const getDate = (item) => {
    const d = new Date(item);
    d.setUTCHours(0, 0, 0, 0);
    return d.toISOString();
  };
  const fetchData = async () => {
    const getLocalData = await localStorage.getItem("token");
    const data = JSON.parse(getLocalData);

    const from = date?.from ? getDate(date.from) : null;
    const to = date?.to ? getDate(date.to) : null;
    console.log("here", from);
    if (data) {
      try {
        const response = await fetch(
          `${API_URL}/booking/analytics-filter?search=${searchTerm}&status=${activeTab}&from=${from}&to=${to}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 401) {
          // Token expired or missing
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          router.push("/"); // redirect to login
          return;
        }
        const result = await response.json();
        console.log("data ext", result.data);
        const final = await result.data;
        setBookings(final);
      } catch (err) {
        console.error(err);
      }
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [searchTerm, activeTab, date]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const bookingData = await fetch(`${API_URL}/booking/`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       const result = await bookingData.json();
  //       for (let i in result.data) {
  //         setUserEmail(result.data[i].userId.email);
  //         const checkInDate = new Date(result.data[i].checkIn);
  //         const checkOutDate = new Date(result.data[i].checkOut);
  //         const monthNames = [
  //           "January",
  //           "February",
  //           "March",
  //           "April",
  //           "May",
  //           "June",
  //           "July",
  //           "August",
  //           "September",
  //           "October",
  //           "November",
  //           "December",
  //         ];

  //         const checkInYear = checkInDate.getFullYear();
  //         const checkOutYear = checkOutDate.getFullYear();
  //         const checkInMonth = checkInDate.getMonth();
  //         const checkOutMonth = checkOutDate.getMonth();
  //         const checkInMonthName = monthNames[checkInMonth]; // This will return "March"
  //         const checkOutMonthName = monthNames[checkOutMonth];
  //         const checkInDay = checkInDate.getDate();
  //         const checkOutDay = checkOutDate.getDate();
  //         const data = {
  //           checkIn: checkInDay + " " + checkInMonthName + " " + checkInYear,
  //           checkOut:
  //             checkOutDay + " " + checkOutMonthName + " " + checkOutYear,
  //           guest:
  //             result.data[i].hostId.firstName +
  //             " " +
  //             result.data[i].hostId.lastName,
  //           id: result.data[i]._id,
  //           property: result.data[i].propertyId.title,
  //           status: result.data[i].status,
  //           total: `₹ ${result.data[i].price}`,
  //         };

  //         bookings.push(data);
  //       }
  //       setBookings(bookings);
  //       return result;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchData();
  // }, []);
  console.log("new", bookings);
  console.log("tab", activeTab);
  console.log("date", date);
  // const filteredBookings = bookings.filter(
  //   (booking) =>
  //     (booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       booking.property.toLowerCase().includes(searchTerm.toLowerCase())) &&
  //     (activeTab === "all" ||
  //       booking.status.toLowerCase() === activeTab.toLowerCase())
  // );

  const toggleBookingSelection = (id) => {
    setSelectedBookings((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on bookings:`, selectedBookings);

    // Implement bulk action logic here
  };
  // const sendConfirmationToUser = async (bookingId, userEmail) => {
  //   try {
  //     const response = await fetch(`${API_URL}/booking/host/confirm`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         bookingId: bookingId,
  //         userEmail: userEmail,
  //       }),
  //     });
  //     // renderBookingTable();
  //     return response;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const sendRejectionToUser = async () => {
    try {
      console.log("nn", bookingId);
      const getLocalData = await localStorage.getItem("token");
      const data = JSON.parse(getLocalData);

      const response = await fetch(`${API_URL}/booking/admin/cancel`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${data}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingId,
        }),
      });
      if (!response.status == 200) {
        return;
      }

      setBookingId(null);
      setRejectDialogOpen(false);
      toast.success("Booking successfully cancelled");
      fetchData();
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  const renderBookingTable = (bookings) => {
    if (loading) {
      // Skeleton UI for the table structure
      return (
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
        </div>
      );
    }

    if (!loading && !bookings) {
      return (
        <div className="py-10 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            No bookings found.
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Looks like you haven't received any bookings yet.
          </p>
        </div>
      );
    }
    const StatusPill = ({ status }) => {
      const getStatusColor = (status) => {
        switch (status) {
          case "confirmed":
            return "bg-green-100 text-green-800";
          case "rejected":
            return "bg-red-100 text-red-800";
          case "cancelled":
            return "bg-orange-100 text-orange-800";

          default:
            return "bg-gray-100 text-gray-800";
        }
      };

      return (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}
        >
          {status === "processing"
            ? "Pending"
            : status?.charAt(0).toUpperCase() + status?.slice(1)}
        </span>
      );
    };
    const handleModal = (booking) => {
      setRejectDialogOpen(true);
      setBookingId(booking._id);
    };

    function checkLength(value) {
      if (value?.length > 15) {
        return value.substring(0, 15) + "…";
      }
      return value;
    }
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              {/* <Checkbox
                checked={selectedBookings?.length === bookings?.length}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBookings(bookings.map((b) => b.id));
                  } else {
                    setSelectedBookings([]);
                  }
                }}
              /> */}
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
            <TableRow key={booking._id}>
              <TableCell>
                <Checkbox
                  checked={selectedBookings.includes(booking._id)}
                  onCheckedChange={() => toggleBookingSelection(booking._id)}
                />
              </TableCell>
              <TableCell className="font-medium">
                <span
                  title={
                    booking.userId.firstName + " " + booking?.userId?.lastName
                  }
                >
                  {checkLength(
                    booking.userId.firstName + " " + booking?.userId?.lastName
                  )}
                </span>
              </TableCell>
              <TableCell>
                <span title={booking?.propertyId.title}>
                  {checkLength(booking?.propertyId.title)}
                </span>
              </TableCell>
              <TableCell>
                {new Date(booking?.checkIn).toDateString().slice(3)}
              </TableCell>
              <TableCell>
                {new Date(booking?.checkOut).toDateString().slice(3)}
              </TableCell>
              <TableCell>{booking?.price}</TableCell>
              <TableCell>
                <StatusPill status={booking?.status} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(
                          `/dashboard/booking-details?booking=${booking._id}`
                        )
                      }
                    >
                      View details
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>Modify booking</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        sendConfirmationToUser(booking.id, userEmail);
                      }}
                    >
                      Send message
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    {booking.status != "rejected" &&
                    booking.status != "cancelled" ? (
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          handleModal(booking);
                        }}
                      >
                        Cancel booking
                      </DropdownMenuItem>
                    ) : null}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  const sendData = async () => {
    await sendRejectionToUser();
  };

  const onGetExporProduct = async (title, worksheetname) => {
    try {
      setLoading(true);

      // Check if the action result contains data and if it's an array
      if (bookings && Array.isArray(bookings)) {
        const dataToExport = bookings.map((pro) => ({
          booking_id: pro?._id,
          user_name: pro?.hostId?.firstName + " " + pro?.hostId?.lastName,
          user_id: pro?.hostId?._id,
          checkin: pro?.checkIn.split("T")[0],
          checkout: pro?.checkOut.split("T")[0],
          amount_paid: pro?.price,
          nights: pro?.nights,
          guests: pro?.guests,
          adults: pro?.adults,
          children: pro?.children,
          status: pro?.status,
        }));

        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, `${worksheetname}`);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("#==================Export Error");
      }
    } catch (error) {
      setLoading(false);
      console.log("#==================Export Error", error.message);
    }
  };
  const exportCheckinDate = date.from.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const arrayCheckinDate = exportCheckinDate.split("/");
  const exportCheckoutDate = date.to.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const arrayCheckoutDate = exportCheckoutDate.split("/");
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
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button
            className="bg-primaryGreen text-white hover:bg-brightGreen rounded-md"
            onClick={() =>
              onGetExporProduct(
                `All_Booking_${arrayCheckinDate[0]}${arrayCheckinDate[1]}${arrayCheckinDate[2]}_${arrayCheckoutDate[0]}${arrayCheckoutDate[1]}${arrayCheckoutDate[2]}`,
                "All_BookingExport"
              )
            }
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel the booking &quot; &quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={sendData}>
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex-1">
        <Label htmlFor="search" className="sr-only">
          Search reservations
        </Label>
        <Input
          id="search"
          className="bg-white"
          placeholder="Search by guest name or property..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Tabs
        defaultValue="all"
        className="space-y-4"
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        {/* <div className="flex items-center space-x-2">
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
              <DropdownMenuCheckboxItem>Check-in Date</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Check-out Date
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Total Amount</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Property Type</DropdownMenuCheckboxItem>
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
          <Button
            className="bg-primaryGreen text-white hover:bg-brightGreen rounded-md"
            onClick={() => handleBulkAction("apply")}
          >
            Apply
          </Button>
        </div> */}
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
              <CardDescription>
                Manage and view details of all bookings
              </CardDescription>
            </CardHeader>
            <CardContent>{renderBookingTable(bookings)}</CardContent>
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
            <CardContent>{renderBookingTable(bookings)}</CardContent>
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
            <CardContent>{renderBookingTable(bookings)}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Bookings</CardTitle>
              <CardDescription>
                View details of completed bookings
              </CardDescription>
            </CardHeader>
            <CardContent>{renderBookingTable(bookings)}</CardContent>
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
            <CardContent>{renderBookingTable(bookings)}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
