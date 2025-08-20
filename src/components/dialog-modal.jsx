import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
export default function DialogModal({ choice, open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{choice} Property Listing</DialogTitle>
          <DialogDescription>
            Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {choice == "Approve" ? (
            <Button
              className="bg-primaryGreen text-white py-3 rounded-md w-half mr-4"
              onClick={onConfirm}
            >
              Yes
            </Button>
          ) : choice == "Delist" ? (
            <Button
              className="bg-primaryGreen text-white py-3 rounded-md w-half mr-4"
              onClick={onConfirm}
            >
              Yes
            </Button>
          ) : (
            <Button variant="destructive" onClick={onConfirm}>
              Yes
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
