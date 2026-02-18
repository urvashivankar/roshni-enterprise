import { useState } from "react";
import { Menu, X, LayoutDashboard, LogIn, LogOut, UserPlus, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import BrandLogo from "./BrandLogo";

interface MobileMenuProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
  onBookingClick: () => void;
}

export const MobileMenu = ({ isLoggedIn, onLogout, onBookingClick }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout();
    setIsOpen(false);
    navigate('/');
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBooking = () => {
    setIsOpen(false);
    onBookingClick();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="lg:hidden p-2 text-slate-900 active:scale-95 transition-all"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-[360px] bg-white border-l border-slate-100 p-0 flex flex-col"
      >
        {/* Fixed Header Bar - 56px height */}
        <div className="h-[56px] min-h-[56px] flex items-center justify-between px-4 border-b border-slate-100 bg-white sticky top-0 z-50">
          <div className="flex items-center -ml-1">
            <BrandLogo size="xs" />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-11 h-11 flex items-center justify-center -mr-2 text-slate-500 hover:text-slate-900 active:bg-slate-50 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto pt-6 px-6">
          <div className="flex flex-col space-y-1">
            {['About', 'Services', 'Pricing', 'Reviews', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(`#${item.toLowerCase()}`)}
                className="group flex items-center justify-between py-4 text-slate-900 font-semibold text-xl border-b border-slate-50 last:border-0 hover:text-blue-600 transition-colors"
              >
                <span>{item}</span>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          {/* Auth Section */}
          <div className="mt-10 pt-10 border-t border-slate-100">
            {isLoggedIn ? (
              <div className="space-y-3">
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12 text-lg font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 px-3 rounded-xl"
                  >
                    <LayoutDashboard className="mr-3 h-5 w-5" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start h-12 text-lg font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 rounded-xl"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base font-bold border-slate-200 hover:bg-slate-50 rounded-xl"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full">
                  <Button
                    className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom CTA */}
        <div className="p-6 bg-white border-t border-slate-50 shadow-[0_-8px_24px_rgba(0,0,0,0.03)]">
          <Button
            onClick={handleBooking}
            className="w-full h-14 text-lg font-bold bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl shadow-lg shadow-amber-400/20 active:scale-[0.98] transition-all"
          >
            Book Service Now
          </Button>
          <p className="text-center text-[10px] text-slate-400 font-bold mt-4 tracking-[0.2em] uppercase">
            Roshni Enterprise • Vadodara
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
