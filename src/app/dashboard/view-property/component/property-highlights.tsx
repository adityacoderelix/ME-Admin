import { Search, MessageSquare, MapPin } from "lucide-react";

export default function PropertyHighlights() {
  return (
    <div className="space-y-6 border-b pb-6 mb-6">
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">
          <Search className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <h3 className="font-medium">Exceptional check-in experience</h3>
          <p className="text-gray-600">
            Recent guests gave the check-in process a 5-star rating.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">
          <MessageSquare className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <h3 className="font-medium">Exceptional Host communication</h3>
          <p className="text-gray-600">
            Recent guests gave Rohan a 5-star rating for communication.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-1">
          <MapPin className="h-6 w-6 text-gray-600" />
        </div>
        <div>
          <h3 className="font-medium">Unbeatable location</h3>
          <p className="text-gray-600">
            100% of guests in the past year gave this location a 5-star rating.
          </p>
        </div>
      </div>
    </div>
  );
}
