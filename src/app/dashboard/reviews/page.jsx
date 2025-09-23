"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Star, MoreHorizontal } from "lucide-react";

// Mock data for reviews
const reviews = [
  {
    id: 1,
    propertyName: "Sunset Villa",
    userName: "Alice Johnson",
    userAvatar: "/aditya.png",
    date: "2023-06-15",
    rating: 4.5,
    content: "Beautiful property with amazing views!",
    tags: ["Scenic", "Relaxing"],
  },
  {
    id: 2,
    propertyName: "Beach Bungalow",
    userName: "Bob Smith",
    userAvatar: "/aditya.png",
    date: "2023-06-14",
    rating: 3.8,
    content: "Nice place, but could be cleaner.",
    tags: ["Beach", "Needs Improvement"],
  },
  {
    id: 3,
    propertyName: "Mountain Retreat",
    userName: "Charlie Brown",
    userAvatar: "/aditya.png",
    date: "2023-06-13",
    rating: 5,
    content: "Absolutely stunning! Will definitely come back.",
    tags: ["Peaceful", "Nature"],
  },
  {
    id: 4,
    propertyName: "City Center Apartment",
    userName: "Diana Ross",
    userAvatar: "/aditya.png",
    date: "2023-06-12",
    rating: 4.2,
    content: "Great location, modern amenities.",
    tags: ["Central", "Modern"],
  },
  {
    id: 5,
    propertyName: "Riverside Cottage",
    userName: "Edward Norton",
    userAvatar: "/aditya.png",
    date: "2023-06-11",
    rating: 4.7,
    content: "Cozy and charming. Perfect getaway!",
    tags: ["Cozy", "Romantic"],
  },
];

const ReviewsPage = () => {
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedProperty, setSelectedProperty] = useState("All");

  const filteredReviews = reviews.filter(
    (review) =>
      (selectedRating === "All" || review.rating >= parseInt(selectedRating)) &&
      (selectedProperty === "All" || review.propertyName === selectedProperty)
  );

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Review Management</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Out of 5 stars</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
            <p className="text-xs text-muted-foreground">
              Across all properties
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="rating">Minimum Rating</Label>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger id="rating">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars & Above</SelectItem>
                  <SelectItem value="3">3 Stars & Above</SelectItem>
                  <SelectItem value="2">2 Stars & Above</SelectItem>
                  <SelectItem value="1">1 Star & Above</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="property">Property</Label>
              <Select
                value={selectedProperty}
                onValueChange={setSelectedProperty}
              >
                <SelectTrigger id="property">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Properties</SelectItem>
                  {Array.from(
                    new Set(reviews.map((review) => review.propertyName))
                  ).map((property) => (
                    <SelectItem key={property} value={property}>
                      {property}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search">Search</Label>
              <Input id="search" placeholder="Search reviews..." />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Review List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    {review.propertyName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      {review.userName}
                    </div>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {review.rating}
                      <Star className="h-4 w-4 text-yellow-400 ml-1" />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {review.content}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {review.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
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
                        <DropdownMenuItem>View Full Review</DropdownMenuItem>
                        <DropdownMenuItem>Contact User</DropdownMenuItem>
                        <DropdownMenuItem>Edit Tags</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Delete Review
                        </DropdownMenuItem>
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
  );
};

export default ReviewsPage;
