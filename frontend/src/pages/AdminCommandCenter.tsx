import { getApiUrl } from "@/config";
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Phone, Mail, Calendar, MapPin, CheckCircle2,
    Clock, Search, RefreshCw, Building2, Users,
    LogOut, Sparkles, ChevronDown, Wrench, Eye,
    ExternalLink, Info, ClipboardList, TrendingUp
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import socket from '@/lib/socket';
import BrandLogo from '@/components/BrandLogo';

interface Booking {
    _id: string;
    customerName: string;
    name?: string;
    email: string;
    phone: string;
    service: string;
    address: string;
    area?: string;
    preferredDate: string;
    date?: string;
    time?: string;
    status: 'pending' | 'Pending' | 'Confirmed' | 'in-progress' | 'completed' | 'Completed' | 'canceled' | 'Cancelled';
    createdAt: string;
}

interface ServiceRequirement {
    type: string;
    units: number;
}

interface Inquiry {
    _id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    requirements: ServiceRequirement[];
    additionalNotes: string;
    status: 'Pending' | 'Quotation Sent' | 'Contacted' | 'Closed';
    quotation?: {
        amount?: number;
        notes?: string;
        pdfUrl?: string;
        sentAt: string;
    };
    adminNotes?: string;
    createdAt: string;
}

// Professional Date Formatter Helper
const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not set';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
};

// Count-up Stat Component for Premium Feel
const StatNumber = ({ value }: { value: number }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        if (start === end) {
            setDisplayValue(end);
            return;
        }

        const duration = 1000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setDisplayValue(end);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    return <span>{displayValue}</span>;
};

const EmptyState = ({ message, type = 'bookings' }: { message: string, type?: 'bookings' | 'inquiries' }) => (
    <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-[2.5rem] border border-dashed border-slate-200 animate-in fade-in zoom-in duration-500">
        <div className={`w-20 h-20 rounded-full ${type === 'bookings' ? 'bg-blue-50 text-blue-500' : 'bg-amber-50 text-amber-500'} flex items-center justify-center mb-6`}>
            {type === 'bookings' ? <ClipboardList className="w-10 h-10" /> : <TrendingUp className="w-10 h-10" />}
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">{message}</h3>
        <p className="text-slate-400 font-medium text-center max-w-xs">Try adjusting your search or filters to find what you're looking for.</p>
    </div>
);

const AdminCommandCenter = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const { toast } = useToast();
    const navigate = useNavigate();

    const fetchAllData = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            const [bookingsRes, inquiriesRes] = await Promise.all([
                fetch(getApiUrl('/api/bookings'), { headers }),
                fetch(getApiUrl('/api/bookings/inquiries'), { headers })
            ]);

            if (bookingsRes.ok) {
                const data = await bookingsRes.json();
                setBookings(data);
            } else if (bookingsRes.status === 401) {
                handleLogout();
            }

            if (inquiriesRes.ok) {
                const data = await inquiriesRes.json();
                setInquiries(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast({
                title: 'Sync Error',
                description: 'Failed to fetch latest updates from server.',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    useEffect(() => {
        fetchAllData();

        // Real-time socket listeners
        socket.on('newBooking', (newBooking: Booking) => {
            setBookings(prev => [newBooking, ...prev]);
            toast({
                title: '🚨 New Booking!',
                description: `${newBooking.customerName || newBooking.name} just requested ${newBooking.service}`,
                className: "bg-blue-600 text-white border-blue-700"
            });
        });

        socket.on('newCorporateInquiry', (newInquiry: Inquiry) => {
            setInquiries(prev => [newInquiry, ...prev]);
            toast({
                title: '🏢 New Corporate Lead!',
                description: `${newInquiry.companyName} requested a quote`,
                className: "bg-amber-600 text-white border-amber-700"
            });
        });

        socket.on('inquiryStatusUpdated', (updatedInquiry: Inquiry) => {
            setInquiries(prev => prev.map(i => i._id === updatedInquiry._id ? updatedInquiry : i));
        });

        socket.on('bookingStatusUpdated', (updatedBooking: Booking) => {
            setBookings(prev => prev.map(b => b._id === updatedBooking._id ? updatedBooking : b));
        });

        return () => {
            socket.off('newBooking');
            socket.off('newCorporateInquiry');
            socket.off('bookingStatusUpdated');
        };
    }, []);

    useEffect(() => {
        // Filter Bookings
        let bFiltered = bookings;
        if (statusFilter !== 'all') {
            bFiltered = bFiltered.filter(b => b.status.toLowerCase() === statusFilter.toLowerCase());
        }
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            bFiltered = bFiltered.filter(b =>
                (b.customerName || b.name || '').toLowerCase().includes(lowerSearch) ||
                b.phone.includes(searchTerm) ||
                b.service.toLowerCase().includes(lowerSearch)
            );
        }
        setFilteredBookings(bFiltered);

        // Filter Inquiries
        let iFiltered = inquiries;
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            iFiltered = iFiltered.filter(i =>
                i.companyName.toLowerCase().includes(lowerSearch) ||
                i.contactPerson.toLowerCase().includes(lowerSearch) ||
                i.phone.includes(searchTerm)
            );
        }
        setFilteredInquiries(iFiltered);
    }, [searchTerm, statusFilter, bookings, inquiries]);

    const updateBookingStatus = async (id: string, newStatus: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(getApiUrl(`/api/bookings/${id}/status`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                const text = await response.text();
                let errorMessage = 'Status update failed';
                try {
                    const data = JSON.parse(text);
                    errorMessage = data.message || errorMessage;
                } catch (e) {
                    errorMessage = text || errorMessage;
                }
                throw new Error(errorMessage);
            }

            setBookings(bookings.map(b =>
                b._id === id ? { ...b, status: newStatus as any } : b
            ));
            toast({ title: 'Status Updated', description: `Booking is now: ${newStatus}` });
        } catch (error: any) {
            console.error('Booking Status Update Error:', error);
            toast({
                title: 'Update Failed',
                description: error.message || 'Could not change status.',
                variant: 'destructive'
            });
        }
    };

    const updateInquiryStatus = async (id: string, newStatus: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(getApiUrl(`/api/bookings/inquiries/${id}/status`), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            setInquiries(inquiries.map(i =>
                i._id === id ? { ...i, status: newStatus as any } : i
            ));
            toast({ title: 'Status Updated', description: `Inquiry is now: ${newStatus}` });
        } catch (error: any) {
            toast({
                title: 'Update Failed',
                description: error.message || 'Could not change status.',
                variant: 'destructive'
            });
        }
    };


    const getStatusBadge = (status: string) => {
        const s = status.toLowerCase();
        const variants: Record<string, string> = {
            pending: 'bg-amber-500',
            confirmed: 'bg-blue-600',
            'in-progress': 'bg-indigo-500',
            completed: 'bg-emerald-500',
            canceled: 'bg-rose-500',
            cancelled: 'bg-rose-500',
            'quotation sent': 'bg-cyan-500',
            'contacted': 'bg-slate-700'
        };
        return (
            <Badge className={`${variants[s] || 'bg-slate-500'} text-white font-black uppercase tracking-widest text-[10px] px-2 py-0.5 md:px-3 md:py-1 hover:scale-110 active:scale-95 transition-all cursor-default`}>
                {status}
            </Badge>
        );
    };

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900">
                <div className="max-w-7xl mx-auto p-2 md:p-8 space-y-4 md:space-y-8">
                    {/* Compact Premium Header with subtle gradient */}
                    <div className="bg-white bg-gradient-to-br from-white via-white to-blue-50/10 rounded-[2rem] p-4 md:p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.05)] border border-slate-100/50">
                        <div className="flex flex-col gap-6">
                            {/* Top: Identity & Actions Layered */}
                            <div className="flex flex-row justify-between items-center bg-slate-50/50 p-2 rounded-2xl border border-slate-100/50 backdrop-blur-sm">
                                <BrandLogo size="xs" className="scale-90" />
                                <div className="flex items-center gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                onClick={fetchAllData}
                                                className="h-8 w-8 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-blue-600 p-0 shadow-sm transition-all active:scale-90"
                                            >
                                                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="font-bold text-[10px] uppercase">Sync Data</TooltipContent>
                                    </Tooltip>
                                    <Button
                                        variant="outline"
                                        onClick={handleLogout}
                                        className="h-8 rounded-lg border-slate-100 bg-white text-slate-500 hover:text-rose-600 px-3 font-bold text-[10px] uppercase tracking-wider shadow-sm transition-all hover:border-rose-100 active:scale-95"
                                    >
                                        <LogOut className="w-3 h-3 mr-1.5" />
                                        Exit
                                    </Button>
                                </div>
                            </div>

                            {/* Middle: Minimal Title */}
                            <div className="text-center px-4 py-1">
                                <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight leading-none group cursor-default">
                                    Command <span className="text-blue-600 transition-colors duration-500 group-hover:text-blue-700">Center</span>
                                </h1>
                            </div>

                            {/* Bottom: Compact Stats Horizontal/Grid with tooltips */}
                            <div className="grid grid-cols-4 gap-2 md:gap-4 pt-4 border-t border-slate-50">
                                {[
                                    { label: 'Total', value: bookings.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50/50', tip: 'All bookings received' },
                                    { label: 'Pending', value: bookings.filter(b => ['pending'].includes(b.status.toLowerCase())).length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50/50', tip: 'Awaiting confirmation' },
                                    { label: 'Active', value: bookings.filter(b => ['confirmed', 'in-progress'].includes(b.status.toLowerCase())).length, icon: Wrench, color: 'text-indigo-600', bg: 'bg-indigo-50/50', tip: 'Jobs current in progress' },
                                    { label: 'Done', value: bookings.filter(b => b.status.toLowerCase() === 'completed').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50/50', tip: 'Successfully completed' }
                                ].map((stat, i) => (
                                    <Tooltip key={i}>
                                        <TooltipTrigger asChild>
                                            <div className="flex flex-col items-center gap-1 group cursor-pointer transition-all hover:translate-y-[-2px]">
                                                <div className={`w-8 h-8 md:w-12 md:h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:shadow-md`}>
                                                    <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
                                                </div>
                                                <div className="text-center">
                                                    <div className={`text-sm md:text-xl font-black ${stat.color} leading-none`}>
                                                        <StatNumber value={stat.value} />
                                                    </div>
                                                    <p className="text-[7px] md:text-[9px] font-black text-slate-400 uppercase tracking-tighter opacity-70 flex items-center justify-center gap-0.5">
                                                        {stat.label}
                                                    </p>
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom" className="p-2 rounded-lg font-bold text-[9px] uppercase tracking-widest bg-slate-900 text-white border-0 shadow-xl">
                                            {stat.tip}
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <Tabs defaultValue="bookings" className="w-full space-y-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                            <TabsList className="w-full lg:w-auto bg-slate-100 p-1 rounded-xl h-auto flex-wrap justify-start">
                                <TabsTrigger value="bookings" className="flex-1 lg:flex-none rounded-lg font-black px-4 md:px-6 py-2.5 text-[10px] md:text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-blue-600 shadow-none data-[state=active]:shadow-sm transition-all">
                                    Service Bookings
                                </TabsTrigger>
                                <TabsTrigger value="inquiries" className="flex-1 lg:flex-none rounded-lg font-black px-4 md:px-6 py-2.5 text-[10px] md:text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-amber-600 shadow-none data-[state=active]:shadow-sm transition-all">
                                    Corp Leads
                                </TabsTrigger>
                            </TabsList>

                            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                <div className="relative flex-1 sm:w-64">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 h-12 bg-white border-0 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
                                    />
                                </div>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="h-12 w-full sm:w-40 bg-white border-0 shadow-sm rounded-xl font-bold uppercase tracking-widest text-[10px] px-4">
                                        <SelectValue placeholder="STATUS" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">ALL</SelectItem>
                                        <SelectItem value="pending">PENDING</SelectItem>
                                        <SelectItem value="confirmed">CONFIRMED</SelectItem>
                                        <SelectItem value="completed">COMPLETED</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <TabsContent value="bookings" className="mt-0 outline-none">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-20">
                                {loading ? (
                                    [1, 2, 3].map((i) => <Skeleton key={i} className="h-64 w-full rounded-[2rem]" />)
                                ) : filteredBookings.length === 0 ? (
                                    <EmptyState message="No service bookings yet" type="bookings" />
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <Card key={booking._id} className="rounded-[2rem] border-0 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden bg-white group">
                                            <div className="p-5 md:p-6 space-y-4">
                                                <div className="flex justify-between items-start gap-2">
                                                    <div className="space-y-0.5">
                                                        <h3 className="text-lg font-black text-slate-900 leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">{booking.customerName || booking.name}</h3>
                                                        <p className="text-blue-600 font-bold uppercase tracking-widest text-[9px] flex items-center gap-1">
                                                            <Sparkles className="w-2 h-2" /> {booking.service}
                                                        </p>
                                                    </div>
                                                    {getStatusBadge(booking.status)}
                                                </div>

                                                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:bg-blue-50/30 transition-colors duration-500">
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="space-y-1">
                                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Contact</p>
                                                            <a href={`tel:${booking.phone}`} className="flex items-center text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors">
                                                                <Phone className="w-3 h-3 mr-1.5 text-blue-500" /> {booking.phone}
                                                            </a>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                                                            <div className="flex items-center text-xs font-bold text-slate-700">
                                                                <Calendar className="w-3 h-3 mr-1.5 text-blue-500" /> {formatDate(booking.preferredDate || booking.date || '')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pt-2 border-t border-slate-200/50">
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                                                        <a
                                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.address || booking.area || '')}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-start text-xs font-medium text-slate-600 line-clamp-2 mt-0.5 hover:text-blue-600 transition-colors"
                                                        >
                                                            <MapPin className="w-3 h-3 mr-1.5 text-rose-500 mt-0.5 shrink-0" /> {booking.address || booking.area}
                                                            <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </a>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        className="flex-1 h-10 rounded-xl font-bold uppercase tracking-widest text-[9px] bg-white border border-slate-100 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
                                                        onClick={() => window.open(`tel:${booking.phone}`)}
                                                    >
                                                        <Phone className="w-3 h-3 mr-2 text-blue-600" />
                                                        Call
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className="flex-1 h-10 rounded-xl font-bold uppercase tracking-widest text-[9px] bg-white border border-slate-100 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
                                                        onClick={() => {
                                                            toast({ title: "Booking Details", description: `Service: ${booking.service} for ${booking.customerName}` })
                                                        }}
                                                    >
                                                        <Eye className="w-3.5 h-3.5 mr-2 text-slate-600" />
                                                        View
                                                    </Button>
                                                </div>

                                                <div className="flex gap-2 pt-1">
                                                    {['pending', 'Pending'].includes(booking.status) && (
                                                        <Button size="sm" onClick={() => updateBookingStatus(booking._id, 'Confirmed')} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] h-11 shadow-md shadow-blue-500/20 active:scale-95 transition-all">
                                                            Confirm Job
                                                        </Button>
                                                    )}
                                                    {['confirmed', 'Confirmed', 'in-progress'].includes(booking.status.toLowerCase()) && (
                                                        <Button size="sm" onClick={() => updateBookingStatus(booking._id, 'Completed')} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] h-11 shadow-md shadow-emerald-500/20 active:scale-95 transition-all">
                                                            Mark Done
                                                        </Button>
                                                    )}
                                                    {!['canceled', 'cancelled', 'completed'].includes(booking.status.toLowerCase()) && (
                                                        <Button size="sm" variant="ghost" onClick={() => updateBookingStatus(booking._id, 'Cancelled')} className="flex-none w-11 h-11 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl font-bold transition-all">
                                                            <RefreshCw className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                    ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="inquiries" className="mt-0 outline-none">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-20">
                                {loading ? (
                                    [1, 2].map((i) => <Skeleton key={i} className="h-64 w-full rounded-[2rem]" />)
                                ) : filteredInquiries.length === 0 ? (
                                    <EmptyState message="No corporate inquiries yet" type="inquiries" />
                                ) : (
                                    filteredInquiries.map((inquiry) => (
                                        <Card key={inquiry._id} className="rounded-[2rem] border-0 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden bg-white relative group">
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400 group-hover:w-2 transition-all"></div>
                                            <div className="p-5 md:p-6 space-y-4">
                                                <div className="flex justify-between items-start gap-2">
                                                    <div className="space-y-0.5">
                                                        <h3 className="text-lg font-black text-slate-900 leading-tight flex items-center gap-2 group-hover:text-amber-600 transition-colors">
                                                            <Building2 className="w-4 h-4 text-amber-500" />
                                                            {inquiry.companyName}
                                                        </h3>
                                                        <p className="text-amber-600 font-bold uppercase tracking-widest text-[9px]">{inquiry.contactPerson}</p>
                                                    </div>
                                                    {getStatusBadge(inquiry.status)}
                                                </div>

                                                <div className="flex flex-wrap gap-1.5">
                                                    {inquiry.requirements.map((req, idx) => (
                                                        <Badge key={idx} variant="secondary" className="bg-slate-50 text-slate-700 text-[10px] font-bold border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                                                            {req.type} x{req.units}
                                                        </Badge>
                                                    ))}
                                                </div>

                                                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-50 pt-3">
                                                    <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2 font-bold hover:text-blue-600 transition-colors">
                                                        <Phone className="w-3.5 h-3.5 text-blue-500" /> {inquiry.phone}
                                                    </a>
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-3.5 h-3.5 text-blue-500" /> <span className="truncate max-w-[200px]">{inquiry.email || 'No Email'}</span>
                                                    </div>
                                                    {inquiry.additionalNotes && (
                                                        <div className="mt-2 p-2 bg-slate-50 rounded-lg text-[10px] italic line-clamp-2">
                                                            "{inquiry.additionalNotes}"
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex gap-2 pt-2">
                                                    <Button
                                                        variant="ghost"
                                                        className="flex-1 h-10 rounded-xl font-bold uppercase tracking-widest text-[9px] bg-white border border-slate-100 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
                                                        onClick={() => window.open(`tel:${inquiry.phone}`)}
                                                    >
                                                        <Phone className="w-3 h-3 mr-2 text-blue-600" />
                                                        Call
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className="flex-1 h-10 rounded-xl font-bold uppercase tracking-widest text-[9px] bg-white border border-slate-100 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
                                                        onClick={() => {
                                                            toast({ title: "Inquiry Info", description: `From: ${inquiry.companyName} (${inquiry.contactPerson})` })
                                                        }}
                                                    >
                                                        <Eye className="w-3.5 h-3.5 mr-2 text-slate-600" />
                                                        View
                                                    </Button>
                                                </div>

                                                <div className="pt-2">
                                                    <Select onValueChange={(val) => updateInquiryStatus(inquiry._id, val)}>
                                                        <SelectTrigger className="w-full h-11 bg-slate-50 border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-white hover:border-amber-200 transition-all shadow-sm">
                                                            <SelectValue placeholder="SET STATUS" />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl border-slate-100 shadow-2xl">
                                                            <SelectItem value="Pending" className="font-bold text-[10px] uppercase">Pending</SelectItem>
                                                            <SelectItem value="Contacted" className="font-bold text-[10px] uppercase">Contacted</SelectItem>
                                                            <SelectItem value="Quotation Sent" className="font-bold text-[10px] uppercase">Quote Sent</SelectItem>
                                                            <SelectItem value="Closed" className="font-bold text-[10px] uppercase">Closed</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                    ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default AdminCommandCenter;
