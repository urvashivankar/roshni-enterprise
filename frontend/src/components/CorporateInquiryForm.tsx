
import { getApiUrl } from "@/config";
import { useState } from "react";
import { Building2, Users, FileText, CheckCircle2, Loader2, Plus, Minus, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface ServiceRequirement {
    type: string;
    units: number;
}

export const CorporateInquiryForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [companyName, setCompanyName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [requirements, setRequirements] = useState<ServiceRequirement[]>([]);
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const { toast } = useToast();

    const serviceTypes = [
        "Precision AC Installation (Bulk)",
        "Comprehensive Comfort AMC",
        "Smart AC Repair (Priority)",
        "Precision Duct Hygiene",
        "Industrial Chiller Care",
        "Cassette Performance Service"
    ];

    const addService = (type: string) => {
        if (!requirements.find(r => r.type === type)) {
            setRequirements([...requirements, { type, units: 1 }]);
        }
    };

    const removeService = (type: string) => {
        setRequirements(requirements.filter(r => r.type !== type));
    };

    const updateUnits = (type: string, delta: number) => {
        setRequirements(requirements.map(r =>
            r.type === type ? { ...r, units: Math.max(1, r.units + delta) } : r
        ));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!companyName || !contactPerson || !phone || !email || requirements.length === 0) {
            toast({
                title: "Requirements Needed",
                description: "Please provide company info, contact email, and at least one service requirement.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(getApiUrl('/api/bookings/corporate-lead'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    companyName,
                    contactPerson,
                    email,
                    phone,
                    requirements,
                    additionalNotes
                }),
            });

            if (response.ok) {
                setIsSuccessOpen(true);
                onClose();
            } else {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const err = await response.json();
                    throw new Error(err.message || "Failed to submit lead");
                } else {
                    const text = await response.text();
                    console.error("Non-JSON error:", text);
                    throw new Error("Server error. Please try again later.");
                }
            }
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: "Could not send inquiry. Please call us directly.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-0 p-0 shadow-2xl">
                    <div className="grid md:grid-cols-5">
                        {/* Left Branding */}
                        <div className="hidden md:flex md:col-span-2 bg-blue-900 p-10 text-white flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                            <div className="relative z-10 space-y-8">
                                <div className="space-y-4">
                                    <BrandLogo size="lg" className="bg-white/10 p-4 rounded-2xl backdrop-blur-md" />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold leading-tight">Corporate Solutions</h2>
                                    <p className="text-blue-100/60 font-medium">
                                        Not just cleaning we restore cooling performance for schools, offices, and factories.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        "GST Compliant Billing",
                                        "Detailed Quotations",
                                        "Bulk Unit Servicing",
                                        "Priority Support"
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-bold opacity-80">
                                            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                            {text}
                                        </div>
                                    ))}
                                </div>
                                {/* Bulk Offers */}
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Bulk Cooling Program</p>
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="opacity-60">5-10 ACs</span>
                                        <span className="text-emerald-400">10% OFF</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="opacity-60">10+ ACs</span>
                                        <span className="text-cyan-400">Custom Pricing</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10 pt-8 border-t border-white/10">
                                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">Direct B2B line</p>
                                <p className="text-xl font-bold mt-1">9727690078</p>
                            </div>
                        </div>

                        {/* Right Form */}
                        <div className="md:col-span-3 p-8 md:p-12 bg-white">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Requirement Details</h3>
                                    <p className="text-slate-500 text-sm font-medium">Tell us about your organization's needs.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-slate-600 font-bold ml-1">Company / School Name</Label>
                                            <Input
                                                placeholder="e.g. St. Xaviers School"
                                                className="h-12 bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all px-4"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-slate-600 font-bold ml-1">Contact Person</Label>
                                                <Input
                                                    placeholder="Full Name"
                                                    className="h-12 bg-slate-50 border-slate-100 rounded-xl px-4"
                                                    value={contactPerson}
                                                    onChange={(e) => setContactPerson(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-slate-600 font-bold ml-1">Phone Number</Label>
                                                <Input
                                                    placeholder="10-digit #"
                                                    className="h-12 bg-slate-50 border-slate-100 rounded-xl px-4"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-600 font-bold ml-1">Official Email Address</Label>
                                            <Input
                                                type="email"
                                                placeholder="e.g. contact@company.com"
                                                className="h-12 bg-slate-50 border-slate-100 rounded-xl px-4"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Label className="text-slate-600 font-bold ml-1">Select Required Services</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {serviceTypes.map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => addService(type)}
                                                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${requirements.find(r => r.type === type)
                                                        ? "bg-blue-600 text-white border-blue-600"
                                                        : "bg-white text-slate-500 border-slate-200 hover:border-blue-400"
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>

                                        {requirements.length > 0 && (
                                            <div className="p-4 bg-slate-50 rounded-[1.5rem] space-y-4 animate-in fade-in slide-in-from-top-2">
                                                {requirements.map((req) => (
                                                    <div key={req.type} className="flex items-center justify-between">
                                                        <span className="text-sm font-bold text-slate-700">{req.type}</span>
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center gap-2 border border-slate-200 bg-white rounded-lg p-1">
                                                                <button type="button" onClick={() => updateUnits(req.type, -1)} className="p-1 hover:bg-slate-50 rounded-md"><Minus className="w-3 h-3" /></button>
                                                                <span className="w-8 text-center text-xs font-bold">{req.units}</span>
                                                                <button type="button" onClick={() => updateUnits(req.type, 1)} className="p-1 hover:bg-slate-50 rounded-md"><Plus className="w-3 h-3" /></button>
                                                            </div>
                                                            <button type="button" onClick={() => removeService(req.type)} className="text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-slate-600 font-bold ml-1">Complex Requirements / Notes</Label>
                                        <Textarea
                                            placeholder="Describe multi-unit location details or specific service timeline..."
                                            className="min-h-[100px] bg-slate-50 border-slate-100 rounded-xl p-4"
                                            value={additionalNotes}
                                            onChange={(e) => setAdditionalNotes(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]"
                                >
                                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Request Detailed Quotation"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
                <DialogContent className="sm:max-w-md rounded-[2.5rem] text-center p-12">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Inquiry Received</h2>
                    <p className="text-slate-500 font-medium py-4 leading-relaxed">
                        We have logged your complex requirement. Our B2B specialists will prepare a formal quotation
                        for <span className="font-bold text-slate-900">{companyName}</span> and contact you shortly.
                    </p>
                    <Button onClick={() => setIsSuccessOpen(false)} className="w-full bg-slate-950 text-white h-12 rounded-xl font-bold">Close</Button>
                </DialogContent>
            </Dialog>
        </>
    );
};
