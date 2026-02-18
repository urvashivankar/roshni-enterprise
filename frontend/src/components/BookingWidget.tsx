import { getApiUrl } from "@/config";
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, AlertCircle, Calendar as CalendarIcon, Clock, User, Phone, MapPin, Wrench, CheckCircle2, Zap } from "lucide-react";
import { bookingSchema, validateSingleField } from "@/lib/validation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const BookingWidget = ({ initialService }: { initialService?: string }) => {
  const [selectedService, setSelectedService] = useState(initialService || "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleFieldChange = (field: string, value: string, setter: (val: string) => void) => {
    setter(value);
    const error = validateSingleField(bookingSchema, field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const services = [
    "Lite Refresh Service",
    "Power Boost Deep Clean (Split)",
    "Power Boost Deep Clean (Window)",
    "Foam Guard Deep Clean (Split)",
    "Foam Guard Deep Clean (Window)",
    "RustShield Protection Clean",
    "Smart AC Repair",
    "Complete Gas Health Check",
    "Precision AC Installation",
    "Safe AC Uninstallation",
    "2 AC Saver Foam-Jet",
    "5 AC Saver Foam-Jet",
    "Saver Foam-Jet (2 ACs)",
    "Saver Foam-Jet (5 ACs)",
    "Clean + Protect Combo",
    "Bact-Guard Combo",
    "Annual Maintenance (AMC)",
    "Custom / Corporate Inquiry"
  ];

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM"
  ];

  const handleBooking = async () => {
    const formData = {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      name,
      phone,
      area
    };

    const result = bookingSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);

      toast({
        title: "Missing or Invalid Information",
        description: "Please check the form for errors before booking.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const apiUrl = getApiUrl('/api/bookings');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsDialogOpen(true);
      } else {
        const contentType = response.headers.get("content-type");
        let errorMessage = 'Failed to submit booking';

        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          const text = await response.text();
          console.error('Server error (non-JSON):', text);
          errorMessage = "Server unreachable or internal error.";
        }
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setName("");
    setPhone("");
    setArea("");
  };

  return (
    <section id="booking-form" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl overflow-hidden rounded-[2rem]">
            <div className="grid lg:grid-cols-5 h-full">
              {/* Left Info Panel */}
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-blue-800 p-8 text-white flex flex-col justify-between">
                <div>
                  <Badge className="bg-blue-800/50 text-blue-200 border-blue-700 mb-6">
                    Fast & Reliable
                  </Badge>
                  <h2 className="text-3xl font-bold mb-4">Book Your Service in Seconds</h2>
                  <p className="text-blue-100/80 leading-relaxed mb-8">
                    Choose your service, pick a slot, and we'll take care of the rest. Our experts are ready to help.
                  </p>

                  <div className="space-y-6">
                    {[
                      { icon: CheckCircle2, text: "Certified Technicians" },
                      { icon: CheckCircle2, text: "Transparent Pricing" },
                      { icon: CheckCircle2, text: "90-Day Service Warranty" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 mt-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 font-medium tracking-wider uppercase">Emergency Support</p>
                      <p className="text-lg font-bold">+91 9737652210</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Form Panel */}
              <CardContent className="lg:col-span-3 p-8 lg:p-12 bg-white">
                {/* Welcome Offer Banner */}
                <div className="mb-10 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4 active:scale-[0.99] transition-all cursor-default">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest leading-none">First-Time Customer?</h4>
                    <p className="text-blue-600 font-bold text-lg mt-1 leading-tight">Get Power Boost @ Lite Price (₹499)</p>
                    <p className="text-[10px] font-medium text-blue-500/60 mt-1 italic leading-tight">"Ma'am, since it's your first booking, we're upgrading you to our Power Boost service at no extra cost today."</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-slate-700 font-semibold mb-2 block">Choose Service</Label>
                      <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && <p className="text-red-500 text-[10px] font-bold ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.service}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date" className={`font-semibold mb-2 block ${errors.date ? "text-red-500" : "text-slate-700"}`}>Select Date</Label>
                      <div className="relative">
                        <Input
                          type="date"
                          id="date"
                          className={`bg-slate-50 border-slate-200 h-12 rounded-xl px-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer ${errors.date ? "border-red-500 ring-red-500" : ""}`}
                          value={selectedDate}
                          onChange={(e) => handleFieldChange("date", e.target.value, setSelectedDate)}
                        />
                      </div>
                      {errors.date && <p className="text-red-500 text-[10px] font-bold ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.date}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold mb-3 block">Available Time Slots</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleFieldChange("time", slot, setSelectedTime)}
                          className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 border-2 ${selectedTime === slot
                            ? "bg-blue-50 border-blue-600 text-blue-700 shadow-md"
                            : errors.time ? "bg-slate-50 border-red-500/20 text-slate-600 hover:border-red-500/40"
                              : "bg-slate-50 border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100"
                            }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {errors.time && <p className="text-red-500 text-[10px] font-bold ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.time}</p>}
                  </div>

                  <div className="space-y-6 pt-4 border-t border-slate-100">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className={`font-semibold ${errors.name ? "text-red-500" : "text-slate-700"}`}>Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            id="name"
                            placeholder="Your name"
                            className={`bg-slate-50 border-slate-200 h-12 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.name ? "border-red-500 ring-red-500" : ""}`}
                            value={name}
                            onChange={(e) => handleFieldChange("name", e.target.value, setName)}
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-[10px] font-bold ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className={`font-semibold ${errors.phone ? "text-red-500" : "text-slate-700"}`}>Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            id="phone"
                            placeholder="10-digit number"
                            className={`bg-slate-50 border-slate-200 h-12 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.phone ? "border-red-500 ring-red-500" : ""}`}
                            value={phone}
                            onChange={(e) => handleFieldChange("phone", e.target.value, setPhone)}
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="area" className={`font-semibold ${errors.area ? "text-red-500" : "text-slate-700"}`}>Service Area / Full Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-4 w-4 h-4 text-slate-400" />
                        <Input
                          id="area"
                          placeholder="E.g. Alkapuri, Vadodara"
                          className={`bg-slate-50 border-slate-200 h-12 pl-10 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${errors.area ? "border-red-500 ring-red-500" : ""}`}
                          value={area}
                          onChange={(e) => handleFieldChange("area", e.target.value, setArea)}
                        />
                      </div>
                      {errors.area && <p className="text-red-500 text-[10px] font-bold ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.area}</p>}
                    </div>
                  </div>

                  <Button
                    onClick={handleBooking}
                    disabled={isLoading}
                    className="w-full h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all group"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <Wrench className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md rounded-[2rem] border-0">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <DialogTitle className="text-center text-3xl font-bold text-slate-900">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-center text-lg pt-4 text-slate-600 leading-relaxed">
              Thank you, <span className="font-bold text-slate-900">{name}</span>.
              <br /><br />
              We have received your request for <span className="text-blue-600 font-bold">{selectedService}</span>.
              Our expert will call you shortly at <span className="font-bold text-slate-900">{phone}</span> to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-6">
            <Button onClick={handleCloseDialog} className="bg-slate-950 hover:bg-slate-900 text-white px-10 h-12 rounded-xl font-bold transition-all active:scale-95">
              Got it, thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
