"use client"
import { Bed } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface PropertySleepingArrangementsProps {
  bedRooms: number,
  beds: number
}

export default function PropertySleepingArrangements({ bedRooms, beds }: PropertySleepingArrangementsProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-6">Where you'll sleep</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="border rounded-xl">
          <CardContent className="p-6">
            <Bed className="h-8 w-8 mb-4" />
            <h3 className="font-medium mb-1">
              {bedRooms} {bedRooms === 1 ? "Bedroom" : "Bedrooms"}
            </h3>
            <p className="text-gray-600">
              {beds} {beds === 1 ? "bed" : "beds"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
