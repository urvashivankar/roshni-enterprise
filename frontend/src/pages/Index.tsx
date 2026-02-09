import { useState, useEffect, useRef } from "react";
import { Phone, MapPin, Star, Clock, Shield, Users, ChevronRight, Calendar, User, MessageSquare, Instagram, Menu, X, LayoutDashboard, LogIn, Mail, Wrench, Check, Snowflake, ShieldCheck, Target, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PricingSection } from "@/components/PricingSection";
import { BookingWidget } from "@/components/BookingWidget";
import { CorporateInquiryForm } from "@/components/CorporateInquiryForm";

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

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCorporateModalOpen, setIsCorporateModalOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const services = [
    {
      icon: "❄️",
      title: "AC Installation",
      description: "Wall Split, Window AC, Central AC installation by certified technicians",
      features: ["Wall Split AC", "Window AC", "Central AC", "Professional Setup"]
    },
    {
      icon: "🔧",
      title: "AC Repair",
      description: "Quick gas refilling and leakage detection with warranty",
      features: ["Gas Refilling", "Leakage Fix", "Pressure Testing", "1 Year Warranty"]
    },
    {
      icon: "📋",
      title: "AC Maintenance",
      description: "Comprehensive maintenance to keep your AC running efficiently",
      features: ["Regular Service", "Deep Cleaning", "Filter Cleaning", "Performance Check"]
    },
    {
      icon: "🛡️",
      title: "AC AMC",
      description: " Annual Maintenance Contracts for worry-free cooling all year round",
      features: ["Priority Support", "Scheduled Visits", "Discounted Spares", "extended Life"]
    }
  ];

  const testimonials = [
    {
      name: "Rahul Patel",
      location: "Vadodara",
      rating: 5,
      text: "Excellent service by Vipinbhai! My AC was not cooling properly and he fixed it in just 30 minutes. Very professional and affordable."
    },
    {
      name: "Priya Shah",
      location: "Vadodara",
      rating: 5,
      text: "Best AC technician in Vadodara! Installation was done perfectly and he explained everything clearly. Highly recommend Roshni Enterprise."
    },
    {
      name: "Amit Sharma",
      location: "Vadodara",
      rating: 5,
      text: "Quick response for emergency repair. Vipinbhai came within 2 hours and fixed the gas leakage issue. Great service!"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
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
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center cursor-pointer group">
              <BrandLogo size="md" />
            </div>

            <div className="hidden lg:flex items-center space-x-10">
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

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
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
                  onClick={scrollToBooking}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black px-8 h-12 rounded-lg shadow-lg shadow-amber-400/20 transition-all active:scale-95"
                >
                  Book Service
                </Button>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col space-y-4">
                {['About', 'Services', 'Pricing', 'Reviews', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
                  <Button className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-black h-14 rounded-xl">
                    Request Appointment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-0 md:pt-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-blue-900 leading-[1.1] tracking-tight">
                  Air Conditioning <br />
                  <span className="text-cyan-500">Services in Vadodara</span>
                </h1>
                <div className="w-24 h-1.5 bg-cyan-400 rounded-full"></div>
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
                  Whenever you need any air conditioning services like installation,
                  replacement, repair, or maintenance, you can count on us. You're
                  getting a local expert that fixes any problem really quickly.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
                <Button
                  onClick={scrollToBooking}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-8 py-7 md:px-10 text-base md:text-lg rounded-xl shadow-xl shadow-amber-400/20 transition-all active:scale-95 font-black uppercase tracking-wider w-full sm:w-auto"
                >
                  Request Appointment
                </Button>
                <Button
                  variant="outline"
                  onClick={scrollToServices}
                  className="border-2 border-cyan-500 text-cyan-600 px-8 py-7 md:px-10 text-base md:text-lg rounded-xl hover:bg-cyan-50 transition-all font-black uppercase tracking-wider w-full sm:w-auto"
                >
                  Our Services
                </Button>
              </div>
            </div>

            <div className="relative mt-12 lg:mt-0 animate-in fade-in slide-in-from-right duration-700">
              <div className="absolute -inset-4 bg-cyan-100/50 rounded-full blur-3xl -z-10"></div>
              <img
                src="https://img.freepik.com/premium-photo/rear-view-man-using-mobile-phone_35076-12663.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Customer booking AC service on mobile"
                className="w-full h-[500px] object-cover rounded-[2.5rem] z-10 shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Feature Grid Blocks */}
        <div className="container mx-auto px-0 md:px-4 relative -bottom-1 lg:-bottom-1 mt-12 lg:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Repair Block */}
            <div className="bg-[#0c4a6e] p-10 text-white group hover:bg-[#075985] transition-colors cursor-pointer">
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
            <div className="bg-[#0369a1] p-10 text-white group hover:bg-[#075985] transition-colors cursor-pointer">
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
            <div className="bg-[#0ea5e9] p-10 text-white group hover:bg-[#38bdf8] transition-colors cursor-pointer">
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
            <BookingWidget />
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
                  We don't just fix Air Conditioners; we restore comfort. Roshni Enterprise is built on
                  <span className="text-blue-600"> trust, speed, and technical mastery</span>.
                  Serving homes and businesses with unyielding dedication.
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
                className="w-full h-[600px] object-cover rounded-[3rem] shadow-2xl"
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
                className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl"
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
              <Card key={index} className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border-b-4 border-transparent hover:border-cyan-500 animate-in fade-in slide-in-from-bottom duration-1000" style={{ animationDelay: `${index * 150}ms` }}>
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
            <div className="bg-[#0c4a6e] rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-white/10 shadow-2xl">
              <div className="relative z-10 text-center space-y-12">
                <div className="flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-2xl md:text-4xl font-black text-white leading-[1.3] italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                    <User className="w-8 h-8 text-white/50" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-white">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-cyan-400 font-bold uppercase tracking-widest text-xs mt-1">{testimonials[currentTestimonial].location}</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {testimonials.map((_, index) => (
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
      <footer className="bg-blue-900 text-white py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col items-center space-y-12">
            <div className="flex flex-col items-center text-center space-y-6">
              <BrandLogo size="lg" variant="light" className="bg-white/5 p-6 rounded-[2.5rem] backdrop-blur-sm border border-white/10" />
              <p className="text-blue-100 max-w-md font-medium text-lg opacity-80 leading-relaxed">
                Premium air conditioning installation, repair, and maintenance services in Vadodara.
              </p>
              <div className="flex space-x-6 h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
              <p className="text-cyan-400 font-black text-xl tracking-wider">
                Inquiries: 9727690078 / 9510972650
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

      {/* Floating Buttons */}
      <a
        href="https://wa.me/919727690078"
        className="fixed bottom-8 right-8 z-[100] bg-green-500 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageSquare className="w-8 h-8 fill-white" />
      </a>

    </div>
  );
};

export default Index;
