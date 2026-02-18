import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(false);
    const whatsappNumber = "919727690078"; // Include country code without +
    const message = encodeURIComponent(
        "Hello Roshni Enterprise! I'm interested in your AC services. Can you help me?"
    );

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-24 lg:bottom-8 right-4 lg:right-8 z-50 group animate-in fade-in zoom-in duration-300"
            aria-label="Contact us on WhatsApp"
        >
            <div className="relative">
                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>

                {/* Main button */}
                <div className="relative w-14 h-14 lg:w-16 lg:h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 active:scale-95">
                    <MessageCircle className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" />
                </div>

                {/* Tooltip on desktop */}
                <div className="hidden lg:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Chat with us on WhatsApp
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-slate-900"></div>
                </div>
            </div>
        </a>
    );
};
