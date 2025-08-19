import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Bed, Bath, Home } from "lucide-react";

export default function PropertyDetailsDialog({ isOpen, onClose, property }) {
  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{property.title}</DialogTitle>
          <DialogDescription>{property.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[60vh] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="font-semibold mb-2">Location</h3>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {property.address.street}, {property.address.district},{" "}
                  {property.address.city}, {property.address.state}{" "}
                  {property.address.pincode}, {property.address.country}
                </span>
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Property Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>
                    {property.propertyType} - {property.placeType}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{property.guests} guests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bed className="h-4 w-4" />
                  <span>
                    {property.bedrooms} bedrooms, {property.beds} beds
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bath className="h-4 w-4" />
                  <span>{property.bathrooms} bathrooms</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Bathroom Types</h3>
              <div className="space-y-1">
                <p>Private: {property.bathroomTypes.private}</p>
                <p>Dedicated: {property.bathroomTypes.dedicated}</p>
                <p>Shared: {property.bathroomTypes.shared}</p>
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Booking Options</h3>
              <div className="space-y-1">
                {property.bookingType.manual && <p>Manual</p>}
                {property.bookingType.instantBook && <p>Instant Book</p>}
                {property.bookingType.flashBook && <p>Flash Book</p>}
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Pricing</h3>
              <p>Base Price: ₹{property.basePrice}</p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Host Information</h3>
              <p>
                {property.host.firstName} {property.host.lastName}
              </p>
              <p>Email: {property.host.email}</p>
              <p>
                Phone: {property.host.countryCode} {property.host.phoneNumber}
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Additional Information</h3>
              <p>Status: {property.status}</p>
              <p>
                Created: {new Date(property.createdAt).toLocaleDateString()}
              </p>
              <p>
                Last Updated:{" "}
                {new Date(property.updatedAt).toLocaleDateString()}
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
