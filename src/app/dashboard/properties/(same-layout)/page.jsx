"use client";
import { ListingsTable } from "./listings-table";

export default function HostListingsPage() {
  return (
    <div className="container mx-auto py-10 px-8 min-h-screen bg-gray-200">
      <h1 className="text-2xl font-semibold font-bricolage mb-5"> Listings</h1>
      <ListingsTable />
    </div>
  );
}
