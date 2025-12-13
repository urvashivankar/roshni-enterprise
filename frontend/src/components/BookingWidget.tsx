
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
  const { toast } = useToast();

  const services = [
    "AC Installation",
    "Gas Refilling",
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

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime || !name || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all details to book your service.",
        variant: "destructive",
      });
      return;
    }

    // Show success dialog
    setIsDialogOpen(true);

    // Reset form
    console.log("Booking submitted:", { service: selectedService, date: selectedDate, time: selectedTime, name, phone });
    toast({
      title: "Booking Received",
      description: "We have received your service request.",
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-amber-100 text-amber-700 border-amber-200">Quick Booking</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">Book Your Service</h2>
          <p className="text-xl text-gray-600">Fast, easy, and convenient scheduling</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-800">
              <CardTitle className="text-center text-2xl">Schedule Your AC Service</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Service Selection */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold flex items-center">
                      <Wrench className="w-5 h-5 mr-2 text-amber-500" />
                      Select Service
                    </Label>
                    <div className="grid grid-cols-1 gap-2">
                      {services.map((service) => (
                        <button
                          key={service}
                          onClick={() => setSelectedService(service)}
                          className={`p-3 text-left rounded-lg border transition-all duration-200 ${selectedService === service
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                            }`}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-semibold flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-amber-500" />
                      Select Date
                    </Label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="text-lg p-3"
                    />
                  </div>
                </div>

                {/* Time & Contact */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-lg font-semibold flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-amber-500" />
                      Select Time
                    </Label>
                    <div className="grid grid-cols-1 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`p-3 text-left rounded-lg border transition-all duration-200 ${selectedTime === slot
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                            }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="mt-8 grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-900" />
                    Your Name
                  </Label>
                  <Input
                    placeholder="Enter your name"
                    className="p-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-blue-900" />
                    Phone Number
                  </Label>
                  <Input
                    placeholder="Enter phone number"
                    className="p-3"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-900" />
                    Area/Location
                  </Label>
                  <Input placeholder="Enter your area" className="p-3" />
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  onClick={handleBooking}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-12 py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all duration-300 w-full md:w-auto"
                  disabled={!selectedService || !selectedDate || !selectedTime}
                >
                  Confirm Booking
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  *We'll call you within 30 minutes to confirm
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            <Button onClick={() => setIsDialogOpen(false)} className="bg-green-600 hover:bg-green-700 text-white px-8">
              Great, thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
