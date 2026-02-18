import { getApiUrl } from "@/config";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, AlertCircle, Calendar as CalendarIcon, Clock, User, Phone, MapPin, Wrench, CheckCircle2, Zap, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { bookingSchema, validateSingleField } from "@/lib/validation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const BookingWidget = ({ initialService }: { initialService?: string }) => {
  const [currentStep, setCurrentStep] = useState(1);
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

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
      if (currentStep === 1) setCurrentStep(2);
    }
  }, [initialService]);

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
    "Smart AC Repair",
    "Precision AC Installation",
    "Gas Health Check",
    "Annual Maintenance (AMC)"
  ];

  const timeSlots = [
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM"
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (step === 1) {
      if (!selectedService) {
        newErrors.service = "Please select a service";
        isValid = false;
      }
    } else if (step === 2) {
      if (!selectedDate) {
        newErrors.date = "Please select a date";
        isValid = false;
      }
      if (!selectedTime) {
        newErrors.time = "Please select a time slot";
        isValid = false;
      }
    } else if (step === 3) {
      const nameError = validateSingleField(bookingSchema, 'name', name);
      const phoneError = validateSingleField(bookingSchema, 'phone', phone);
      const areaError = validateSingleField(bookingSchema, 'area', area);

      if (nameError) { newErrors.name = nameError; isValid = false; }
      if (phoneError) { newErrors.phone = phoneError; isValid = false; }
      if (areaError) { newErrors.area = areaError; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: document.getElementById('booking-widget')?.offsetTop || 0, behavior: 'smooth' });
    } else {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields to proceed.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleBooking = async () => {
    if (!validateStep(3)) return;

    const formData = {
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      name,
      phone,
      area
    };

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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit booking');
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
    setCurrentStep(1);
  };

  return (
    <div id="booking-widget" className="w-full">
      <Card className="border-0 shadow-2xl overflow-hidden rounded-[2rem]">
        <div className="grid lg:grid-cols-5 h-full">
          {/* Left Info Panel (Hidden on Mobile for cleanliness, visible on desktop) */}
          <div className="hidden lg:flex lg:col-span-2 bg-gradient-to-br from-blue-900 to-blue-800 p-8 text-white flex-col justify-between">
            <div>
              <Badge className="bg-blue-800/50 text-blue-200 border-blue-700 mb-6">3-Step Easy Booking</Badge>
              <h2 className="text-3xl font-bold mb-4">Book in Seconds</h2>
              <p className="text-blue-100/80 leading-relaxed mb-8">
                Our verified experts are ready to restore your cooling comfort.
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
          </div>

          {/* Right Form Panel */}
          <CardContent className="lg:col-span-3 p-6 md:p-12 bg-white relative">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                <span className={cn(currentStep >= 1 && "text-blue-600")}>1. Service</span>
                <span className={cn(currentStep >= 2 && "text-blue-600")}>2. Time</span>
                <span className={cn(currentStep >= 3 && "text-blue-600")}>3. Details</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-8 min-h-[400px]">
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                  <h3 className="text-2xl font-bold text-slate-900">Choose your Service</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((s) => (
                      <div
                        key={s}
                        onClick={() => { setSelectedService(s); setErrors({ ...errors, service: '' }); }}
                        className={cn(
                          "p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-blue-50 relative overflow-hidden group",
                          selectedService === s ? "border-blue-600 bg-blue-50 shadow-md" : "border-slate-100 hover:border-blue-200"
                        )}
                      >
                        <div className="flex items-center justify-between relative z-10">
                          <span className={cn("font-bold text-sm", selectedService === s ? "text-blue-700" : "text-slate-600")}>
                            {s}
                          </span>
                          {selectedService === s && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.service && <p className="text-red-500 text-sm font-bold flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {errors.service}</p>}
                </div>
              )}

              {/* Step 2: Date & Time */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                  <h3 className="text-2xl font-bold text-slate-900">When should we come?</h3>

                  <div className="space-y-4">
                    <Label className="text-slate-700 font-semibold block">Select Date</Label>
                    <Input
                      type="date"
                      className="bg-slate-50 border-slate-200 h-14 rounded-xl px-4 text-lg"
                      value={selectedDate}
                      onChange={(e) => handleFieldChange("date", e.target.value, setSelectedDate)}
                    />
                    {errors.date && <p className="text-red-500 text-sm font-bold">{errors.date}</p>}
                  </div>

                  <div className="space-y-4">
                    <Label className="text-slate-700 font-semibold block">Preferred Time Slot</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => { setSelectedTime(slot); setErrors({ ...errors, time: '' }); }}
                          className={cn(
                            "p-3 rounded-xl border-2 text-sm font-bold transition-all",
                            selectedTime === slot ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-100 text-slate-600 hover:border-blue-200"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {errors.time && <p className="text-red-500 text-sm font-bold">{errors.time}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                  <h3 className="text-2xl font-bold text-slate-900">Contact Details</h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          placeholder="Your Name"
                          className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl"
                          value={name}
                          onChange={(e) => handleFieldChange("name", e.target.value, setName)}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          placeholder="10-digit number"
                          className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl"
                          value={phone}
                          onChange={(e) => handleFieldChange("phone", e.target.value, setPhone)}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Address / Area</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          placeholder="E.g. Alkapuri, Vadodara"
                          className="pl-10 h-12 bg-slate-50 border-slate-200 rounded-xl"
                          value={area}
                          onChange={(e) => handleFieldChange("area", e.target.value, setArea)}
                        />
                      </div>
                      {errors.area && <p className="text-red-500 text-xs font-bold">{errors.area}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-8 mt-4 border-t border-slate-100">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12 rounded-xl border-2 font-bold hover:bg-slate-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
              )}

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg"
                >
                  Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleBooking}
                  disabled={isLoading}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold shadow-xl shadow-orange-500/20"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      Confirm <Check className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              )}
            </div>

          </CardContent>
        </div>
      </Card>

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
              Our expert will call you shortly at <span className="font-bold text-slate-900">{phone}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-6">
            <Button onClick={handleCloseDialog} className="bg-slate-950 hover:bg-slate-900 text-white px-10 h-12 rounded-xl font-bold transition-all active:scale-95">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
