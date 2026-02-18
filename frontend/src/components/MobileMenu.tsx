import { useState } from "react";
import { Menu, X, LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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
    // Force a re-render or state update if passed from parent
    if (onLogout) onLogout();
    setIsOpen(false);
    navigate('/');
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
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
          className="lg:hidden p-2 text-slate-900 hover:text-blue-600 transition-colors"
          aria-label="Open menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-[400px] bg-white border-l border-slate-50 p-0 overflow-y-auto"
      >
        {/* Attractive Graphic Header */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1599933023848-bfff2346c4df?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="Premium AC Service"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
          <div className="absolute top-6 left-8">
            <BrandLogo size="sm" />
          </div>
        </div>

        <div className="flex flex-col h-full px-8 pb-8 -mt-6">
          {/* Navigation Links */}
          <div className="flex flex-col space-y-1 flex-1 relative z-10">
            {['About', 'Services', 'Pricing', 'Reviews', 'Contact'].map((item, idx) => (
              <button
                key={item}
                onClick={() => handleNavClick(`#${item.toLowerCase()}`)}
                className="text-slate-900 font-bold text-3xl py-3 text-left hover:text-blue-600 transition-colors tracking-tight animate-in fade-in slide-in-from-right duration-500"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Auth Section */}
          <div className="space-y-4 pt-8 border-t border-slate-100">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12 text-lg font-bold text-slate-600 hover:text-blue-600 hover:bg-transparent px-0"
                  >
                    My Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start h-12 text-lg font-bold text-red-500 hover:text-red-700 hover:bg-transparent px-0"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base font-bold border-slate-200 hover:bg-slate-50 rounded-xl"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button
                    className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Book CTA */}
            <Button
              onClick={handleBooking}
              className="w-full h-14 text-lg font-black bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl shadow-lg shadow-amber-400/20 active:scale-95 transition-all mt-4"
            >
              Book Service Now
            </Button>

            <p className="text-center text-xs text-slate-400 font-bold mt-6 tracking-widest uppercase">
              Roshni Enterprise
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
