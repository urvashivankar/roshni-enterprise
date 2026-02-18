import { Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StickyCallButton = () => {
    const phoneNumber = "+919727690078";

    const scrollToBooking = () => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden mobile-sticky-bar">
            {/* Glassmorphism Effect */}
            <div className="bg-white/95 backdrop-blur-md border-t border-slate-100 p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] pb-safe transition-all duration-300">
                <div className="flex gap-3">
                    {/* Secondary Action: Call */}
                    <a href={`tel:${phoneNumber}`} className="flex-1">
                        <Button
                            variant="outline"
                            className="w-full h-12 border-2 border-slate-200 text-slate-700 font-bold rounded-xl active:scale-95 transition-all text-sm"
                        >
                            <Phone className="w-4 h-4 mr-2 text-slate-500" />
                            Call Now
                        </Button>
                    </a>

                    {/* Primary Action: Book */}
                    <Button
                        onClick={scrollToBooking}
                        className="flex-[1.5] h-12 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black rounded-xl shadow-lg shadow-amber-400/20 active:scale-95 transition-all text-sm uppercase tracking-wide"
                    >
                        <CalendarCheck className="w-5 h-5 mr-2" />
                        Book Service
                    </Button>
                </div>
            </div>
        </div>
    );
};
