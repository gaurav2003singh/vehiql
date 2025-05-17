"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { TestDriveCard } from "@/components/test-drive-card";
import useFetch from "@/hooks/use-fetch";
import { cancelTestDrive } from "@/actions/test-drive";
import { toast } from "sonner";

export function ReservationsList({ initialData }) {
  const router = useRouter();

  // Manage bookings
  const [bookings, setBookings] = useState(initialData?.data || []);

  const [cancellingId, setCancellingId] = useState(null);

  // Handle cancellation

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancellingId(bookingId);
      const res = await cancelTestDrive(bookingId);

      if (res?.success) {
        toast.success("Reservation cancelled");

        // Move the reservation to "past"
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId ? { ...b, status: "CANCELLED" } : b
          )
        );
      } else {
        toast.error(res?.error || "Failed to cancel reservation");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setCancellingId(null);
    }
  };

  const upcomingBookings = bookings.filter((b) =>
    ["PENDING", "CONFIRMED"].includes(b.status)
  );

  const pastBookings = bookings.filter((b) =>
    ["COMPLETED", "CANCELLED", "NO_SHOW"].includes(b.status)
  );

  if (bookings.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-gray-50">
        <div className="bg-gray-100 p-4 rounded-full mb-4">
          <Calendar className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Reservations Found</h3>
        <p className="text-gray-500 mb-6 max-w-md">
          You don't have any test drive reservations yet.
        </p>
        <Button variant="default" asChild>
          <Link href="/cars">Browse Cars</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Upcoming Test Drives</h2>
        {upcomingBookings.length === 0 ? (
          <p className="text-gray-500 italic">No upcoming test drives.</p>
        ) : (
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <TestDriveCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancelBooking}
                isCancelling={cancellingId}
                showActions
                viewMode="list"
              />
            ))}
          </div>
        )}
      </div>

      {pastBookings.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Past Test Drives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastBookings.map((booking) => (
              <TestDriveCard
                key={booking.id}
                booking={booking}
                showActions
                isPast
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
