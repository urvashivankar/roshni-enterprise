import { useState, useEffect, useRef } from "react";
import { Phone, MapPin, Star, Clock, Shield, Users, ChevronRight, Calendar, User, MessageSquare, Instagram, Menu, X, LayoutDashboard, LogIn, Mail, Wrench, Check, Snowflake, ShieldCheck, Target, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getApiUrl } from "@/config";
import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PricingSection } from "@/components/PricingSection";
import { BookingWidget } from "@/components/BookingWidget";
import { CorporateInquiryForm } from "@/components/CorporateInquiryForm";
import { MobileMenu } from "@/components/MobileMenu";
import { StickyCallButton } from "@/components/StickyCallButton";
import { SEOHead } from "@/components/SEOHead";
import socket from "@/lib/socket";

const CountUp = ({ end, duration = 2000, suffix = "" }: { end: string, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const endNum = parseInt(end);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * endNum));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, endNum, duration]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
};

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  comment: string;
}

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCorporateModalOpen, setIsCorporateModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [preSelectedService, setPreSelectedService] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    fetchReviews();

    // Listen for new reviews
    socket.on('newReview', (newReview: any) => {
      console.log('Real-time: New review received', newReview);
      setReviews(prev => [
        {
          name: newReview.userName,
          location: "Vadodara",
          rating: newReview.rating,
          comment: newReview.comment
        },
        ...prev.slice(0, 9)
      ]);
    });

    return () => {
      socket.off('newReview');
    };
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(getApiUrl('/api/reviews'));
      if (response.ok) {
        const data = await response.json();
        const mappedReviews = data.map((r: any) => ({
          name: r.userName,
          location: "Vadodara",
          rating: r.rating,
          comment: r.comment
        }));

        if (mappedReviews.length > 0) {
          setReviews(mappedReviews);
        } else {
          setReviews([
            {
              name: "Rahul Patel",
              location: "Vadodara",
              rating: 5,
              comment: "Excellent service by Vipinbhai! My AC was not cooling properly and he fixed it in just 30 minutes. Very professional and affordable."
            },
            {
              name: "Priya Shah",
              location: "Vadodara",
              rating: 5,
              comment: "Best AC technician in Vadodara! Installation was done perfectly and he explained everything clearly. Highly recommend Roshni Enterprise."
            },
            {
              name: "Amit Sharma",
              location: "Vadodara",
              rating: 5,
              comment: "Quick response for emergency repair. Vipinbhai came within 2 hours and fixed the gas leakage issue. Great service!"
            }
          ]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    }
  };

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews]);

  const services = [
    {
      icon: "❄️",
      title: "Lite Refresh Service",
      description: "Best for regular maintenance and quick freshness with odor removal.",
      features: ["Dust & Odor Removal", "Airflow Improvement", "Performance Check", "30-Day Assurance"]
    },
    {
      icon: "🔧",
      title: "Power Boost Deep Clean",
      description: "High-pressure jet wash to boost efficiency and restore weak cooling.",
      features: ["Power Jet Wash", "Cooling Efficiency Boost", "Energy Optimization", "90-Day Assurance"]
    },
    {
      icon: "📋",
      title: "Foam Guard Deep Clean",
      description: "Active foam treatment to eliminate heavy dirt, grease, and bacteria.",
      features: ["Anti-Bacterial Shield", "Coil Protection", "Grime Removal", "Odor Elimination"]
    },
    {
      icon: "🛡️",
      title: "RustShield Protection",
      description: "Anti-rust chemical treatment to prevent leakages and extend AC life.",
      features: ["Leak Prevention", "Coil Protection", "Drain Tray Care", "Life Extended"]
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = (service?: string) => {
    if (service) {
      setPreSelectedService(service);
    }
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <SEOHead />

      {/* Top Utility Bar */}
      <div className="bg-slate-50 border-b border-slate-200 py-2 hidden sm:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs font-medium text-slate-600">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Phone: +91 972769 0078</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Email: info@roshni.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Working Hours: 8:00 AM - 8:00 PM</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-2 md:py-4">
          <div className="flex items-center justify-between h-14 md:h-auto">

            {/* Logo - Always Visible */}
            <div className="flex items-center cursor-pointer group shrink-0">
              <BrandLogo size="md" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {['About', 'Services', 'Pricing', 'Reviews', 'Contact'].map((item, idx) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-600 hover:text-blue-600 font-bold text-sm tracking-wide transition-all hover:scale-105 active:scale-95 animate-in fade-in slide-in-from-top duration-700"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop Actions - HIDDEN on Mobile */}
              <div className="hidden lg:flex items-center space-x-4">
                {isLoggedIn ? (
                  <Link to="/dashboard">
                    <Button variant="ghost" className="text-blue-600 font-bold hover:bg-blue-50">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button variant="ghost" className="text-slate-600 hover:text-blue-600 font-bold">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={() => scrollToBooking()}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black px-8 h-12 rounded-lg shadow-lg shadow-amber-400/20 transition-all active:scale-95"
                >
                  Book Service
                </Button>
              </div>

              {/* Mobile Hamburger - Always Visible on Mobile */}
              <div className="lg:hidden">
                <MobileMenu
                  isLoggedIn={isLoggedIn}
                  onLogout={() => setIsLoggedIn(false)}
                  onBookingClick={() => scrollToBooking()}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-6 pb-0 md:pt-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:gap-12 items-center">

            {/* Text Content */}
            <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left duration-700 mt-8 lg:mt-0 text-center lg:text-left">
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-blue-900 leading-[1.1] tracking-tight">
                  Air Conditioning <br />
                  <span className="text-cyan-500">Services in Vadodara</span>
                </h1>
                <div className="w-16 h-1 md:w-24 md:h-1.5 bg-cyan-400 rounded-full mx-auto lg:mx-0"></div>
                <p className="text-base md:text-xl text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Book trusted technicians in 60 seconds. <span className="text-blue-600 font-bold">We restore cooling performance.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
                <Button
                  onClick={() => scrollToBooking()}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-8 py-6 md:py-7 md:px-10 text-lg rounded-xl shadow-xl shadow-amber-400/20 transition-all active:scale-95 font-black uppercase tracking-wider w-full sm:w-auto"
                >
                  Book Service Now
                </Button>
                <Button
                  variant="outline"
                  onClick={scrollToServices}
                  className="hidden sm:inline-flex border-2 border-cyan-500 text-cyan-600 px-8 py-6 md:py-7 md:px-10 text-lg rounded-xl hover:bg-cyan-50 transition-all font-black uppercase tracking-wider w-full sm:w-auto"
                >
                  Our Services
                </Button>
              </div>
            </div>

            {/* Image Content - Optimized for Mobile */}
            <div className="relative w-full lg:mt-0 animate-in fade-in slide-in-from-right duration-700">
              <div className="absolute -inset-4 bg-cyan-100/50 rounded-full blur-3xl -z-10"></div>
              {/* Desktop Image */}
              <img
                src="https://img.freepik.com/premium-photo/rear-view-man-using-mobile-phone_35076-12663.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Customer booking AC service on mobile"
                className="hidden lg:block w-full h-[500px] object-cover rounded-[2.5rem] z-10 shadow-2xl"
              />
              {/* Mobile Image - Shorter & Optimized */}
              <div className="block lg:hidden relative rounded-[2rem] overflow-hidden shadow-xl z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent z-20"></div>
                <img
                  src="https://img.freepik.com/premium-photo/rear-view-man-using-mobile-phone_35076-12663.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="Mobile AC Service"
                  className="w-full h-64 object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid Blocks */}
        <div className="container mx-auto px-0 md:px-4 relative -bottom-1 lg:-bottom-1 mt-12 lg:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Repair Block */}
            <div
              onClick={() => scrollToBooking("Smart AC Repair")}
              className="bg-[#0c4a6e] p-10 text-white group hover:bg-[#075985] transition-colors cursor-pointer"
            >
              <div className="mb-6 p-4 bg-white/10 rounded-xl w-fit group-hover:bg-white/20 transition-colors">
                <Wrench className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4">AC Repair</h3>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-6 font-medium">
                If pools of water are forming around the air conditioner or it's not cooling properly, call us immediately.
              </p>
              <div className="flex items-center text-amber-500 font-bold group-hover:translate-x-2 transition-transform opacity-0 group-hover:opacity-100">
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>

            {/* Installation Block */}
            <div
              onClick={() => scrollToBooking("Precision AC Installation")}
              className="bg-[#0369a1] p-10 text-white group hover:bg-[#075985] transition-colors cursor-pointer"
            >
              <div className="mb-6 p-4 bg-white/10 rounded-xl w-fit group-hover:bg-white/20 transition-colors">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4">Installation</h3>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-6 font-medium">
                If you have purchased an AC system and need installation, our certified experts are here to help.
              </p>
              <div className="flex items-center text-amber-500 font-bold group-hover:translate-x-2 transition-transform opacity-0 group-hover:opacity-100">
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>

            {/* Maintenance Block */}
            <div
              onClick={() => scrollToBooking("Lite Refresh Service")}
              className="bg-[#0ea5e9] p-10 text-white group hover:bg-[#38bdf8] transition-colors cursor-pointer"
            >
              <div className="mb-6 p-4 bg-white/10 rounded-xl w-fit group-hover:bg-white/20 transition-colors">
                <Badge className="bg-transparent border-0 p-0 text-white"><Clock className="w-10 h-10" /></Badge>
              </div>
              <h3 className="text-2xl font-black mb-4">Maintenance</h3>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-6 font-medium">
                Regular check-ups help to avoid sudden AC failure and significantly extend the life-span of your unit.
              </p>
              <div className="flex items-center text-amber-500 font-bold group-hover:translate-x-2 transition-transform opacity-0 group-hover:opacity-100">
                <ChevronRight className="w-5 h-5 ml-1" />
              </div>
            </div>

            {/* Questions Block */}
            <div className="bg-[#facc15] p-10 text-slate-900 group hover:bg-[#eab308] transition-colors">
              <div className="mb-6 p-4 bg-black/5 rounded-xl w-fit">
                <Phone className="w-10 h-10 text-slate-900" />
              </div>
              <h3 className="text-2xl font-black mb-4">Have Any Questions?</h3>
              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-bold">
                In case of urgent necessity, feel free to call our direct hotline any time:
              </p>
              <a href="tel:+919737652210" className="text-2xl font-black hover:underline block">
                +91 973765 2210
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { number: "500", label: "Happy Customers", color: "text-blue-200", suffix: "+" },
              { number: "10", label: "Years Experience", color: "text-amber-400", suffix: "+" },
              { number: "24", label: "Emergency Support", color: "text-green-300", suffix: "/7" },
              { number: "100", label: "Satisfaction Rate", color: "text-purple-300", suffix: "%" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2 group animate-in fade-in zoom-in duration-1000" style={{ animationDelay: `${index * 150}ms` }}>
                <div className={`text-4xl lg:text-5xl font-black ${stat.color} group-hover:scale-105 transition-transform duration-300`}>
                  <CountUp end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-blue-100/70 font-bold uppercase tracking-wider text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white">
        <PricingSection onBookNow={scrollToBooking} />
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 tracking-tight">Book Your Appointment</h2>
            <p className="text-lg text-slate-600 font-medium">Quick and easy booking. Select your service and preferred time below.</p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl shadow-blue-900/5 p-8 md:p-12">
            <BookingWidget initialService={preSelectedService} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-cyan-600 font-black tracking-widest uppercase text-xs md:text-sm animate-in fade-in duration-700">About Roshni Enterprise</span>
                <h2 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom duration-1000">Excellence in Every Degree</h2>
                <div className="w-20 h-1.5 bg-amber-400 rounded-full animate-in fade-in zoom-in duration-1000 delay-300"></div>
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  We don't just wash units; <span className="text-blue-600">we restore cooling performance.</span> Roshni Enterprise is built on trust, speed, and technical mastery serving Vadodara's homes and businesses.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  { icon: Shield, title: "Certified Expertise", desc: "Technicians who know every bolt and wire." },
                  { icon: Clock, title: "Rapid Response", desc: "Because comfort can't wait." },
                  { icon: Users, title: "Client First", desc: "Your satisfaction is our only metric." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-5 p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                    <div className="w-14 h-14 bg-white shadow-md rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                      <item.icon className="w-7 h-7 text-blue-600 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-blue-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-1000">
              <div className="absolute -inset-4 bg-amber-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <img
                src="https://www.airfixacservice.in/wp-content/uploads/2026/01/ac-repair-service-in-faridabad.webp"
                alt="Expert AC Repair Service"
                loading="lazy"
                className="w-full h-[600px] object-cover rounded-[3rem] shadow-xl"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[2rem] shadow-2xl border border-slate-100">
                <div className="flex flex-col items-center">
                  <span className="text-6xl font-black text-blue-900">10+</span>
                  <span className="text-sm font-black text-slate-500 uppercase tracking-widest mt-2 text-center">Years of <br />Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="commercial" className="py-24 bg-white overflow-hidden animate-in fade-in slide-in-from-bottom duration-1000">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-in slide-in-from-left duration-1000">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                alt="Modern Office AC Setup"
                loading="lazy"
                className="w-full h-[500px] object-cover rounded-[3rem] shadow-xl"
              />
            </div>

            <div className="space-y-8 animate-in slide-in-from-right duration-1000">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-900 border-blue-200">B2B & Institutional</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 leading-tight">
                  Solutions for <br />
                  <span className="text-cyan-500">Business & Schools</span>
                </h2>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  Roshni Enterprise is a trusted partner for commercial cooling. We manage large-scale
                  contracts for schools, corporate offices, and industrial plants across Vadodara.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Formal Quotations", desc: "Detailed quotes for your procurement team" },
                  { title: "GST Invoicing", desc: "Professional tax-compliant billing" },
                  { title: "Bulk Servicing", desc: "Expert handling of 50+ units easily" },
                  { title: "School Contracts", desc: "Special pricing for educational institutions" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center shrink-0">
                      <Check className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-10 h-14 font-bold shadow-xl shadow-blue-600/20" onClick={() => setIsCorporateModalOpen(true)}>
                Request Corporate Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-slate-50 animate-in fade-in slide-in-from-bottom duration-1000">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-cyan-600 font-black tracking-widest uppercase text-xs md:text-sm animate-in fade-in duration-700">Professional Solutions for Vadodara</span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 tracking-tight animate-in fade-in slide-in-from-bottom duration-1000">Our Core Services</h2>
            <p className="text-lg text-slate-600 font-medium animate-in fade-in slide-in-from-bottom duration-1000 delay-150">Providing high-quality cooling solutions tailored to your specific needs everywhere in Vadodara.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden rounded-[2rem] animate-in fade-in slide-in-from-bottom duration-1000" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-8 md:p-10 space-y-8">
                  <div className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-500">{service.icon}</div>
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-black text-blue-900 leading-tight">{service.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">{service.description}</p>
                  </div>
                  <ul className="space-y-3 pt-6 md:pt-8 border-t border-slate-100">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-xs md:text-sm font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
                        <ChevronRight className="w-4 h-4 text-cyan-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-24 bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <span className="text-cyan-400 font-black tracking-widest uppercase text-sm">Customer Stories</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Voice of Trust</h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-[#0c4a6e] rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-white/10 shadow-xl">
              {reviews.length > 0 && (
                <div className="relative z-10 text-center space-y-12">
                  <div className="flex justify-center space-x-2">
                    {[...Array(reviews[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <blockquote className="text-2xl md:text-4xl font-black text-white leading-[1.3] italic">
                    "{reviews[currentTestimonial].comment}"
                  </blockquote>

                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                      <User className="w-8 h-8 text-white/50" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-white">{reviews[currentTestimonial].name}</h4>
                      <p className="text-cyan-400 font-bold uppercase tracking-widest text-xs mt-1">{reviews[currentTestimonial].location}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${index === currentTestimonial ? 'w-12 bg-amber-400' : 'w-3 bg-white/20 hover:bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited-Time Offers & Guarantees */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-slate-100"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="space-y-4 text-center md:text-left">
              <Badge className="bg-amber-100 text-amber-900 border-amber-200 px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">Special Promotions</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">Limited-Time <span className="text-blue-600">Smart Savers</span></h2>
              <p className="text-xl text-slate-500 font-medium max-w-xl">Maximize your cooling performance while minimizing costs with our signature bundle offers.</p>
            </div>
            <div className="flex justify-center md:justify-end gap-3 font-black text-[10px] uppercase tracking-widest">
              <span className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100"><Zap className="w-4 h-4 text-amber-500" /> Limited Slots</span>
              <span className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100"><ShieldCheck className="w-4 h-4 text-blue-600" /> Verified Results</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Multi-AC Saver */}
            <Card className="rounded-[2.5rem] border-slate-100 hover:shadow-2xl transition-all group overflow-hidden bg-slate-50/50">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-colors">
                  <LayoutDashboard className="w-8 h-8 text-blue-600 group-hover:text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">Multi-AC Home Saver</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">Save more when you service multiple units in a single visit.</p>
                </div>
                <div className="space-y-3 pt-4 border-t border-slate-200/50">
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-600">2 ACs</span>
                    <Badge className="bg-emerald-100 text-emerald-700 border-0 font-black">₹50 OFF / AC</Badge>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-600">3+ ACs</span>
                    <Badge className="bg-emerald-100 text-emerald-700 border-0 font-black">₹100 OFF / AC</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekday Saver */}
            <Card className="rounded-[2.5rem] border-slate-100 hover:shadow-2xl transition-all group overflow-hidden bg-blue-50/30">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-white border border-blue-100 flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-colors">
                  <Clock className="w-8 h-8 text-blue-600 group-hover:text-white" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">Weekday Smart Saver</h3>
                    <Badge className="bg-blue-600 text-white border-0 text-[8px] px-2">MON-THU</Badge>
                  </div>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">Avoid the weekend rush and get a free bonus with your deep clean.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-blue-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center shrink-0">
                    <Snowflake className="w-6 h-6 text-cyan-500" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">FREE ADD-ON</p>
                    <p className="text-sm font-bold text-blue-900 mt-1">Filter Sanitization (₹199 Value)</p>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-blue-600/60 text-center italic mt-4">* Apply for Mon-Thu only</p>
              </CardContent>
            </Card>

            {/* Cooling Guarantee */}
            <Card className="rounded-[2.5rem] border-blue-200 hover:shadow-2xl transition-all group overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 text-white lg:col-span-1 md:col-span-2">
              <CardContent className="p-8 h-full flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black leading-tight">Cooling Performance Guarantee</h3>
                    <p className="text-blue-100/60 font-medium text-sm leading-relaxed">Your satisfaction is our only metric. We guarantee restored results.</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">7-Day Free Recheck</span>
                  </div>
                  <p className="text-xs font-medium text-blue-100/80 italic">"If your AC doesn't restore cooling as promised, we'll re-inspect it at zero cost within 7 days."</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Repair Conversion Offer */}
          <div className="mt-12 bg-white border-2 border-dashed border-slate-100 rounded-[2.5rem] p-8 md:p-12 text-center">
            <div className="flex flex-col items-center max-w-2xl mx-auto space-y-6">
              <div className="flex items-center gap-2 px-6 py-2 bg-slate-50 rounded-full border border-slate-100">
                <Wrench className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Repair Adjustment Promise</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">Got a major repair? <span className="text-blue-600">Diagnosis is on us.</span></h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                If you proceed with any suggested repair after inspection, your <span className="font-bold text-slate-900">₹299 diagnosis fee</span> will be fully adjusted in your final repair bill. No hidden charges.
              </p>
              <Button
                onClick={() => scrollToBooking("Smart AC Repair")}
                className="h-14 px-10 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black uppercase tracking-widest text-xs active:scale-95 transition-all"
              >
                Book Inspection Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Phone, title: "Calls & Inquiries", desc: "9727690078 / 9510972650", link: "tel:+919727690078", bg: "bg-blue-600" },
              { icon: Mail, title: "Email Us", desc: "roshnienterprise01022024@gmail.com", link: "mailto:roshnienterprise01022024@gmail.com", bg: "bg-cyan-600" },
              { icon: Instagram, title: "Instagram", desc: "@roshni_enterprise_", link: "https://www.instagram.com/roshni_enterprise_", bg: "bg-pink-600" },
              { icon: MapPin, title: "Office", desc: "Vadodara, HQ", link: "#", bg: "bg-amber-600" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="flex flex-col items-center p-8 md:p-10 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-2xl transition-all duration-500 group border border-transparent hover:border-slate-100 animate-in fade-in zoom-in duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 ${item.bg} rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-black text-blue-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 font-bold text-center break-all text-xs md:text-sm">{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center space-y-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <BrandLogo size="lg" variant="light" className="opacity-90" />
              <p className="text-slate-400 max-w-sm font-medium text-base leading-relaxed">
                Expert AC installation and repair in Vadodara. Restoring comfort, one home at a time.
              </p>
              <div className="h-px w-16 bg-white/10 my-4"></div>
              <p className="text-white font-bold text-lg tracking-wide">
                9727690078 <span className="text-slate-600 mx-2">/</span> 9510972650
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-black uppercase tracking-widest text-blue-200">
              {['About', 'Services', 'Pricing', 'Reviews', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-amber-400 transition-colors">{item}</a>
              ))}
              <Link to="/admin" className="hover:text-amber-400 transition-colors">Admin Login</Link>
            </div>

            <div className="pt-12 border-t border-white/10 w-full text-center text-sm font-bold text-blue-300/50">
              © 2024 ROSHNI ENTERPRISE. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>

      <CorporateInquiryForm
        isOpen={isCorporateModalOpen}
        onClose={() => setIsCorporateModalOpen(false)}
      />

      {/* Mobile UX Components */}
      <StickyCallButton />
    </div>
  );
};

export default Index;
