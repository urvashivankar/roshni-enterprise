import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StickyCallButton = () => {
    const phoneNumber = "+919727690078";

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 shadow-2xl border-t border-white/20">
                <a href={`tel:${phoneNumber}`} className="block">
                    <Button
                        className="w-full h-16 bg-white hover:bg-blue-50 text-blue-600 font-black text-lg rounded-2xl shadow-xl transition-all active:scale-95 group"
                    >
                        <div className="flex items-center justify-center space-x-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-xs font-medium opacity-60">Call Now for Service</span>
                                <span className="font-black">{phoneNumber}</span>
                            </div>
                        </div>
                    </Button>
                </a>
            </div>
        </div>
    );
};
