import { useState, useEffect } from "react";
import { Phone, MapPin, Star, Clock, Shield, Users, ChevronRight, Calendar, User, MessageSquare, Instagram, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PricingSection } from "@/components/PricingSection";
import { BookingWidget } from "@/components/BookingWidget";

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      location: "Ahmedabad",
      rating: 5,
      text: "Excellent service by Vipinbhai! My AC was not cooling properly and he fixed it in just 30 minutes. Very professional and affordable.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Priya Shah",
      location: "Surat",
      rating: 5,
      text: "Best AC technician in Vadodara! Installation was done perfectly and he explained everything clearly. Highly recommend Roshni Enterprise.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Amit Sharma",
      location: "Vadodara",
      rating: 5,
      text: "Quick response for emergency repair. Vipinbhai came within 2 hours and fixed the gas leakage issue. Great service!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
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

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-amber-400 font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-blue-900 transition-colors">Roshni Enterprise</h1>
                <p className="text-xs text-amber-600 font-medium tracking-wide">AC Service Experts</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Services', 'Pricing', 'Reviews', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-600 hover:text-blue-900 font-medium transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="flex items-center space-x-2 md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-blue-900 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <a href="tel:+919737652210" className="flex items-center space-x-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2.5 rounded-full hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-0.5">
                <Phone className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline font-semibold">Book Now: 9737652210</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 animate-fade-in border-t border-slate-100 mt-2">
              <div className="flex flex-col space-y-3">
                {['About', 'Services', 'Pricing', 'Reviews', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-600 hover:text-blue-900 font-medium py-2 px-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {item}
                  </a>
                ))}
                <a href="tel:+919737652210" className="flex items-center space-x-2 text-blue-900 font-semibold py-2 px-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 9737652210</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-blue-900/50 text-blue-200 border-blue-800 hover:bg-blue-900 px-4 py-1.5 text-sm backdrop-blur-md">
                    🌟 Trusted AC Experts in Vadodara
                  </Badge>
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20 px-4 py-1.5 text-sm backdrop-blur-md">
                    ✅ UDHYAM VERIFIED
                  </Badge>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                  Mastering the Art of
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 drop-shadow-sm pb-4 leading-normal">
                    Cooling Comfort
                  </span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                  Premium installation, repair, and maintenance services. We bring
                  excellence and reliability to your doorstep.
                </p>
              </div>

              <div className="flex flex-col space-y-3 text-sm text-slate-400 sm:flex-row sm:space-y-0 sm:space-x-6 border-t border-slate-800 pt-6">
                <a href="tel:+919737652210" className="flex items-center space-x-2 hover:text-amber-400 transition-colors group">
                  <div className="p-2 bg-slate-800 rounded-full group-hover:bg-amber-500/10 transition-colors">
                    <Phone className="w-4 h-4 text-amber-500" />
                  </div>
                  <span>+91 9737652210 / 9510972650</span>
                </a>
                <a href="mailto:roshnienterprise01022024@gmail.com" className="flex items-center space-x-2 hover:text-amber-400 transition-colors group">
                  <div className="p-2 bg-slate-800 rounded-full group-hover:bg-amber-500/10 transition-colors">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                  </div>
                  <span>roshnienterprise01022024@gmail.com</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-6 text-lg rounded-xl hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-semibold"
                >
                  Book Premium Service
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={scrollToServices}
                  className="bg-transparent border-2 border-slate-700 text-slate-300 px-8 py-6 text-lg rounded-xl hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all duration-300"
                >
                  Explore Services
                </Button>
              </div>
            </div>

            <div className="relative lg:h-[600px] flex items-center justify-center animate-fade-in hidden lg:flex">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-amber-500 rounded-full blur-[100px] opacity-20"></div>
              <div className="relative z-10 w-full max-w-md">
                <div className="absolute -top-12 -right-12 z-20 animate-fade-in delay-700">
                  <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Status</p>
                      <p className="text-sm font-bold text-gray-800">Verified Pro</p>
                    </div>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80"
                  alt="Premium AC Service"
                  className="w-full h-[500px] object-cover rounded-[2rem] shadow-2xl border-4 border-slate-800/50 hover:scale-[1.01] transition-all duration-700"
                />
                <div className="absolute -bottom-8 -left-8 z-20 animate-fade-in delay-1000">
                  <div className="bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center space-x-3 border border-slate-700">
                    <div className="bg-amber-500/20 p-2 rounded-full">
                      <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-semibold">Rating</p>
                      <p className="text-sm font-bold text-white">5.0 / 5.0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { number: "500+", label: "Happy Customers", color: "text-blue-400" },
              { number: "10+", label: "Years Experience", color: "text-amber-400" },
              { number: "24/7", label: "Emergency Support", color: "text-green-400" },
              { number: "100%", label: "Satisfaction Rate", color: "text-purple-400" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2 group">
                <div className={`text-4xl lg:text-5xl font-black ${stat.color} group-hover:scale-105 transition-transform duration-300`}>{stat.number}</div>
                <div className="text-slate-400 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Booking Widget */}
      <BookingWidget />

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-32"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-left">
              <div className="space-y-6">
                <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">About Roshni Enterprise</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">Excellence in Every Degree</h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  We don't just fix Air Conditioners; we restore comfort. Roshni Enterprise is built on a foundation of
                  <span className="font-semibold text-blue-900"> trust, speed, and technical mastery</span>.
                  Serving homes and businesses across Vadodara with unyielding dedication.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  { icon: Shield, title: "Certified Expertise", desc: "Technicians who know every bolt and wire." },
                  { icon: Clock, title: "Rapid Response", desc: "Because comfort can't wait." },
                  { icon: Users, title: "Client First", desc: "Your satisfaction is our only metric." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-colors duration-300 group">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-900 transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-blue-900 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-full min-h-[500px] animate-fade-in hidden lg:block">
              <div className="absolute inset-0 bg-blue-900/5 rounded-3xl transform rotate-3"></div>
              <img
                src="/technician.png"
                alt="Professional AC Technician"
                className="relative w-full h-full object-cover rounded-3xl shadow-2xl hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center border border-slate-100 animate-fade-in delay-300">
                <span className="text-4xl font-bold text-blue-600">10+</span>
                <span className="text-sm font-semibold text-slate-600">Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-20">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-1">Our Premium Services</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">Comprehensive Solutions</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tailored services designed to maximize the lifespan and efficiency of your cooling systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <CardContent className="p-8 space-y-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl group-hover:bg-blue-50 transition-colors duration-500">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                  </div>
                  <ul className="space-y-3 pt-6 border-t border-slate-100">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm">Testimonials</span>
            <h2 className="text-4xl font-bold text-slate-900">Voices of Trust</h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
              {/* Background Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full blur-[80px] opacity-10 -translate-x-1/2 translate-y-1/2"></div>

              <div className="relative z-10 text-center space-y-10">
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex flex-col items-center space-y-4">
                  <div className="p-1 bg-gradient-to-r from-blue-500 to-amber-500 rounded-full">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-slate-900"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-blue-200">{testimonials[currentTestimonial].location}</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'w-8 bg-amber-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">Get in Touch</h2>
            <p className="text-xl text-slate-600">Ready for premium cooling? We are just a click away.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              { icon: Phone, title: "Call Us", desc: "+91 9737652210", link: "tel:+919737652210", color: "blue" },
              { icon: MapPin, title: "Location", desc: "Vadodara, India", link: "#", color: "amber" },
              { icon: MessageSquare, title: "WhatsApp", desc: "Chat Now", link: "https://wa.me/919737652210", color: "green" },
              { icon: Instagram, title: "Instagram", desc: "@roshni_enterprise_", link: "https://www.instagram.com/roshni_enterprise_?igsh=MWRqNW1pZ200d3M5dg==", color: "pink" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : undefined}
                className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${item.color === 'blue' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
                  item.color === 'amber' ? 'bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white' :
                    item.color === 'green' ? 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white' :
                      'bg-pink-100 text-pink-600 group-hover:bg-pink-600 group-hover:text-white'
                  }`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className={`font-medium ${item.color === 'blue' ? 'text-blue-600' :
                  item.color === 'amber' ? 'text-amber-600' :
                    item.color === 'green' ? 'text-green-600' :
                      'text-pink-600'
                  }`}>{item.desc}</p>
              </a>
            ))}
          </div>

          <div className="text-center mt-20">
            <Button
              onClick={scrollToContact}
              className="bg-slate-900 text-white px-10 py-8 text-xl rounded-2xl hover:bg-slate-800 transition-all duration-300 shadow-2xl hover:shadow-slate-900/30"
            >
              <Calendar className="mr-3 w-6 h-6" />
              Book Appointment Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 border-t border-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-amber-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">R</span>
              </div>
              <span className="text-2xl font-bold tracking-tight">Roshni Enterprise</span>
            </div>
            <p className="text-slate-400 max-w-md text-center">Your trusted partner for premium air conditioning solutions across Vadodara.</p>
            <div className="flex space-x-6 text-sm text-slate-500 pt-8 border-t border-slate-900 w-full justify-center">
              <span>© 2024 Roshni Enterprise</span>
              <span>•</span>
              <span>All rights reserved</span>
              <span>•</span>
              <a href="/admin" className="hover:text-slate-300 transition-colors">Admin Login</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919737652210"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_25px_rgba(37,211,102,0.6)] hover:scale-105 transition-all duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageSquare className="w-8 h-8" />
      </a>
    </div>
  );
};

export default Index;
