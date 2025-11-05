"use client";

import React, { Suspense } from "react";
import BookingsPage from "../page";
import HostProfilePage from "./host-profile-page";
import DetailView from "./detail-view";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24">Loading...</div>}>
      <DetailView />
    </Suspense>
  );
}
