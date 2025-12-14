
import { useState } from "react";
import { Calendar, Clock, User, Phone, MapPin, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export const BookingWidget = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const { toast } = useToast();

  const services = [
    "AC Installation",
    "Gas Refilling",
    "AC Service (Simple)",
    "AC Service (Water)",
    "Emergency Repair",
    "Annual Maintenance",
    "Deep Cleaning"
  ];

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM"
  ];

  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !name || !phone || !area) {
      toast({
        title: "Missing Information",
        description: "Please fill in all details to book your service.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Use relative URL which works with proxy locally and Vercel rewrites in production
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: selectedService,
          date: selectedDate,
          time: selectedTime,
          name,
          phone,
          area
        }),
      });

      if (response.ok) {
        setIsDialogOpen(true);
      } else {
        throw new Error('Failed to submit booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Reset form after closing dialog
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setPhone("");
    setArea("");
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* ... (keep existing JSX) ... */}

        {/* Scroll down to finding the Dialog component in the original file and replace the close handler */}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-600">Booking Confirmed! 🎉</DialogTitle>
            <DialogDescription className="text-center text-lg pt-4 text-slate-700">
              Thank you, <span className="font-semibold text-slate-900">{name}</span>!
              <br /><br />
              We have scheduled your <span className="font-semibold text-blue-600">{selectedService}</span> on <span className="font-semibold">{selectedDate}</span> at <span className="font-semibold">{selectedTime}</span>.
              <br /><br />
              Our expert will call you shortly at <span className="font-semibold">{phone}</span> to confirm the location.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={handleCloseDialog} className="bg-green-600 hover:bg-green-700 text-white px-8">
              Great, thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
