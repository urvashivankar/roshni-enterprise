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
          className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
          aria-label="Open menu"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[85vw] sm:w-[400px] bg-white border-l border-slate-100"
      >
        <SheetHeader>
          <SheetTitle className="text-left text-xl font-bold text-blue-900">
            Menu
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-8">
          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 flex-1">
            {['About', 'Services', 'Pricing', 'Reviews', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(`#${item.toLowerCase()}`)}
                className="text-slate-700 font-bold py-4 px-4 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all text-left"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Auth Section */}
          <div className="border-t border-slate-100 pt-6 pb-6 space-y-3">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 text-base font-bold border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <LayoutDashboard className="w-5 h-5 mr-3" />
                    My Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start h-14 text-base font-bold text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 text-base font-bold border-slate-200 hover:bg-slate-50"
                  >
                    <LogIn className="w-5 h-5 mr-3" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 text-base font-bold border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <UserPlus className="w-5 h-5 mr-3" />
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Book Service CTA */}
            <Button
              onClick={handleBooking}
              className="w-full h-14 text-base font-black bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl shadow-lg shadow-amber-400/20 transition-all"
            >
              Book Service Now
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
