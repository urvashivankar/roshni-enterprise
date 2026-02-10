
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getApiUrl } from "@/config";
import BrandLogo from '@/components/BrandLogo';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Calendar, MapPin, Clock, Wrench, ChevronLeft, LayoutDashboard, Loader2, Phone, Star, FileText } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star as StarIcon } from 'lucide-react';

interface Booking {
    _id: string;
    service: string;
    name: string;
    phone: string;
    date: string;
    time: string;
    area: string;
    status: string;
    createdAt: string;
}

const MyBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const fetchMyBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(getApiUrl('/api/bookings/my-bookings'), {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            } else if (response.status === 401) {
                handleLogout();
            }
        } catch (error) {
            console.error('Failed to fetch bookings', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleSubmitFeedback = async () => {
        if (!selectedBooking || !selectedBooking._id) return;
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(getApiUrl('/api/reviews'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    bookingId: selectedBooking._id,
                    rating,
                    comment
                })
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Thank you for your feedback!",
                });
                setIsFeedbackModalOpen(false);
                setComment("");
                setRating(5);
            } else {
                const data = await response.json();
                toast({
                    title: "Error",
                    description: data.message || "Failed to submit feedback",
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Connection error. Please try again.",
                variant: "destructive"
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header / Nav */}
            <div className="bg-white border-b border-slate-200">
                <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
                    <Link to="/" className="flex items-center group">
                        <BrandLogo size="sm" />
                        <span className="font-bold text-xl text-slate-800 ml-3 hidden sm:block border-l-2 border-slate-200 pl-3">Client Portal</span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" onClick={handleLogout} className="text-slate-600 hover:text-red-600 hover:bg-red-50 text-sm">
                            <LogOut className="w-4 h-4 mr-2" />
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-blue-600 text-sm font-bold uppercase tracking-wider">
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900">Your Activities</h1>
                        <p className="text-slate-500">Track and manage your cooling requests</p>
                    </div>
                </div>

                <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
                    <div className="bg-blue-600 text-white shadow-xl shadow-blue-600/20 px-8 py-3 rounded-2xl font-bold text-sm flex items-center">
                        <Wrench className="w-4 h-4 mr-2" />
                        Service Bookings ({bookings.length})
                    </div>
                    <Link to="/#booking">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-6 shadow-md transition-all active:scale-95">
                            <Wrench className="w-4 h-4 mr-2" />
                            Book New Service
                        </Button>
                    </Link>
                </div>

                {isLoading ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 space-y-8">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2">
                                            <Skeleton className="h-6 w-24 rounded-lg" />
                                            <Skeleton className="h-8 w-48 rounded-lg" />
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Skeleton className="h-6 w-24 rounded-full" />
                                            <Skeleton className="h-4 w-16" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-slate-50">
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="w-12 h-12 rounded-2xl" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-3 w-16" />
                                                <Skeleton className="h-6 w-32" />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Skeleton className="w-12 h-12 rounded-2xl" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-3 w-16" />
                                                <Skeleton className="h-6 w-32" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-8">
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="w-8 h-8 rounded-full" />
                                            <Skeleton className="h-4 w-32" />
                                        </div>
                                        <div className="flex gap-2">
                                            <Skeleton className="h-10 w-32 rounded-xl" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Sidebar Skeleton */}
                        <div className="space-y-6 hidden lg:block">
                            <Skeleton className="h-64 w-full rounded-[2rem]" />
                            <Skeleton className="h-48 w-full rounded-[2rem]" />
                        </div>
                    </div>
                ) : bookings.length > 0 ? (
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {bookings.map((booking) => (
                                <Card key={booking._id} className="border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] overflow-hidden bg-white">
                                    <div className="p-8">
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                                            <div className="space-y-1">
                                                <Badge className="bg-blue-600/10 text-blue-700 border-none px-3 py-1 font-bold rounded-lg mb-2">
                                                    {booking.service}
                                                </Badge>
                                                <h3 className="text-2xl font-bold text-slate-900">{booking.date}</h3>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <Badge
                                                    variant={getStatusBadgeVariant(booking.status)}
                                                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${booking.status === 'Pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                                        booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                            'bg-emerald-100 text-emerald-700 border-emerald-200'
                                                        }`}
                                                >
                                                    {booking.status}
                                                </Badge>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Ref: #{booking._id.slice(-6)}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-slate-50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                                    <Clock className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Schedule</p>
                                                    <p className="font-bold text-slate-700 text-lg">{booking.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                                    <MapPin className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Service Area</p>
                                                    <p className="font-bold text-slate-700 text-lg">{booking.area}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[10px] text-white flex-shrink-0">RE</div>
                                                <p className="text-xs font-bold text-slate-500 tracking-tight whitespace-nowrap">Assigned to Expert Tech</p>
                                            </div>
                                            <div className="flex gap-2">
                                                {booking.status.toLowerCase() === 'completed' && (
                                                    <Button
                                                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl"
                                                        onClick={() => {
                                                            setSelectedBooking(booking);
                                                            setIsFeedbackModalOpen(true);
                                                        }}
                                                    >
                                                        Give Feedback
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    className="text-blue-600 font-bold hover:bg-blue-50 rounded-xl"
                                                    onClick={() => {
                                                        setSelectedBooking(booking);
                                                        setIsInvoiceModalOpen(true);
                                                    }}
                                                >
                                                    Full Invoice Details
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <Card className="p-8 border-none bg-blue-900 text-white rounded-[2rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                                <div className="relative z-10 space-y-6">
                                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                                        <Phone className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-bold tracking-tight">Need Help?</h3>
                                        <p className="text-blue-100/70 text-sm font-medium">Quick inquiries & status checks</p>
                                    </div>
                                    <div className="space-y-4 pt-4">
                                        <a href="tel:+919727690078" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors border border-white/5">
                                            <span className="font-bold">9727690078</span>
                                            <ChevronLeft className="w-4 h-4 rotate-180" />
                                        </a>
                                        <a href="tel:+919510972650" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors border border-white/5">
                                            <span className="font-bold">9510972650</span>
                                            <ChevronLeft className="w-4 h-4 rotate-180" />
                                        </a>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-8 border border-slate-100 rounded-[2rem] bg-white text-center space-y-4">
                                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Star className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold text-slate-800 tracking-tight">Rate your Experience</h4>
                                <p className="text-sm text-slate-500 font-medium">Help us improve our Cooling services in Vadodara.</p>
                                <Button
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl font-bold"
                                    onClick={() => {
                                        if (bookings.length > 0) {
                                            setSelectedBooking(bookings[0]);
                                            setIsFeedbackModalOpen(true);
                                        } else {
                                            toast({
                                                title: "No bookings found",
                                                description: "You need at least one booking to leave a review.",
                                            });
                                        }
                                    }}
                                >
                                    Write Review
                                </Button>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <Card className="border-dashed border-2 border-slate-200 bg-white/50 text-center py-24 px-8 rounded-[3rem]">
                        <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                            <Calendar className="w-12 h-12" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">No active services</h3>
                        <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">
                            Your home comfort journey hasn't started yet. Book your first inspection today.
                        </p>
                        <Link to="/#booking">
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl h-14 px-12 font-bold text-lg shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
                                Launch Booking Widget
                            </Button>
                        </Link>
                    </Card>
                )}
            </main>

            <Dialog open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen}>
                <DialogContent className="sm:max-w-md rounded-[2rem] border-none shadow-2xl p-8">
                    <DialogHeader className="space-y-4">
                        <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-2">
                            <StarIcon className="w-8 h-8 text-cyan-600 fill-cyan-600" />
                        </div>
                        <DialogTitle className="text-2xl font-black text-blue-900 leading-tight">Share Your Experience</DialogTitle>
                        <DialogDescription className="text-slate-500 font-medium">
                            Your feedback helps us maintain our high standards of cooling comfort.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-6 space-y-8">
                        <div className="flex flex-col items-center space-y-4">
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Rate our service</p>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className="transition-transform active:scale-95"
                                    >
                                        <StarIcon
                                            className={`w-10 h-10 ${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} transition-colors`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Your Comments</p>
                            <Textarea
                                placeholder="Tell us what you liked or how we can improve..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="min-h-[120px] rounded-2xl border-slate-100 bg-slate-50 focus:bg-white transition-all text-slate-600 font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            className="flex-1 h-12 rounded-xl font-bold border-slate-200 text-slate-600"
                            onClick={() => setIsFeedbackModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1 h-12 rounded-xl font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                            disabled={submitting || !comment}
                            onClick={handleSubmitFeedback}
                        >
                            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Feedback"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen}>
                <DialogContent className="sm:max-w-md rounded-[2rem] border-none shadow-2xl p-8">
                    <DialogHeader className="space-y-4">
                        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-2">
                            <FileText className="w-8 h-8 text-blue-600" />
                        </div>
                        <DialogTitle className="text-2xl font-black text-blue-900 leading-tight">Service Invoice</DialogTitle>
                        <DialogDescription className="text-slate-500 font-medium">
                            Full details for your booking Ref: #{selectedBooking?._id.slice(-6)}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-6 space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                            <div className="flex justify-between items-center text-sm font-bold border-b border-slate-200 pb-2">
                                <span className="text-slate-500 uppercase tracking-widest text-[10px]">Service Type</span>
                                <span className="text-slate-900">{selectedBooking?.service}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold border-b border-slate-200 pb-2">
                                <span className="text-slate-500 uppercase tracking-widest text-[10px]">Date & Time</span>
                                <span className="text-slate-900">{selectedBooking?.date} | {selectedBooking?.time}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold border-b border-slate-200 pb-2">
                                <span className="text-slate-500 uppercase tracking-widest text-[10px]">Location</span>
                                <span className="text-slate-900 text-right">{selectedBooking?.area}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold border-b border-slate-200 pb-4">
                                <span className="text-slate-500 uppercase tracking-widest text-[10px]">Status</span>
                                <Badge className={`bg-blue-100 text-blue-700 border-none`}>{selectedBooking?.status}</Badge>
                            </div>

                            <div className="pt-2">
                                <div className="flex justify-between items-center text-lg font-black text-slate-900">
                                    <span>{selectedBooking && ["Annual Maintenance", "Custom"].includes(selectedBooking.service) ? "Quotation" : "Estimated Cost"}</span>
                                    <span>{selectedBooking ? getServicePrice(selectedBooking.service) : "₹499"}.00</span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                                    {selectedBooking?.service === "Annual Maintenance"
                                        ? "* Final price quoted after physical inspection"
                                        : "* Price shown is the base rate. Final amount depends on service complexity"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            className="flex-1 h-12 rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-lg"
                            onClick={() => setIsInvoiceModalOpen(false)}
                        >
                            Close Details
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
};

const getStatusBadgeVariant = (status: string): any => {
    switch (status) {
        case 'Confirmed': return 'secondary';
        case 'Completed': return 'default';
        case 'Cancelled': return 'destructive';
        default: return 'outline';
    }
};

const getServicePrice = (service: string) => {
    const prices: Record<string, string> = {
        "Lite Refresh Service": "₹499",
        "Power Boost Deep Clean (Split)": "₹499",
        "Power Boost Deep Clean (Window)": "₹449",
        "Foam Guard Deep Clean (Split)": "₹599",
        "Foam Guard Deep Clean (Window)": "₹649",
        "RustShield Protection Clean": "₹1,049",
        "Smart AC Repair": "₹299",
        "Complete Gas Health Check": "₹2,700",
        "Precision AC Installation": "₹499",
        "Safe AC Uninstallation": "₹649",
        "2 AC Saver Foam-Jet": "₹1,098",
        "5 AC Saver Foam-Jet": "₹2,595",
        "Annual Maintenance (AMC)": "₹999",
        "Gas Charging": "₹2,700"
    };
    return prices[service] || "₹499";
};

export default MyBookings;
