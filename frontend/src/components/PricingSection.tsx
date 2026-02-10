
import { Check, Star, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const PricingSection = ({ onBookNow }: { onBookNow?: (service?: string) => void }) => {
  const pricingPlans = [
    {
      name: "Lite Refresh Service",
      price: "₹499",
      duration: "One-time",
      popular: false,
      description: "Best for: Regular maintenance & quick freshness",
      features: [
        "Dust & odor removal",
        "Airflow improvement",
        "Basic performance check",
        "30-day service warranty",
        "Emergency support"
      ],
      icon: "💧"
    },
    {
      name: "Power Boost Deep Clean",
      price: "₹499",
      duration: "Split (₹449 Window)",
      popular: true,
      description: "Best for: Low cooling / weak airflow",
      features: [
        "High-pressure indoor jet clean",
        "Filter & blower deep wash",
        "Cooling efficiency boost",
        "Energy optimization",
        "90-day cooling assurance"
      ],
      icon: "⚡"
    },
    {
      name: "Foam Guard Deep Clean",
      price: "₹599",
      duration: "Split (₹649 Window)",
      popular: false,
      description: "Best for: Heavy dirt, grease & bacteria",
      features: [
        "Active foam treatment (kills bacteria)",
        "Coil & fin protection",
        "Deep grime removal",
        "Odor elimination",
        "Anti-bacterial shield"
      ],
      icon: "🧼"
    }
  ];

  const additionalServices = [
    { service: "RustShield Protection Clean", price: "₹1,049", unit: "per unit" },
    { service: "Smart AC Repair", price: "₹299", unit: "starts at" },
    { service: "Complete Gas Health Check", price: "₹2,700", unit: "per refill" },
    { service: "Precision AC Installation", price: "₹499 - ₹1,699", unit: "starts at" },
    { service: "Safe AC Uninstallation", price: "₹649", unit: "per unit" },
    { service: "Saver Foam-Jet (2 ACs)", price: "₹1,098", unit: "₹549/AC" },
    { service: "Saver Foam-Jet (5 ACs)", price: "₹2,595", unit: "₹519/AC" }
  ];

  const combos = [
    {
      name: "Clean + Protect Combo",
      desc: "Power Boost + Anti-Rust",
      price: "₹1,299",
      savings: "Save ₹249",
      popular: true
    },
    {
      name: "Bact-Guard Combo",
      desc: "Foam Guard + Anti-Rust",
      price: "₹1,499",
      savings: "Save ₹199",
      popular: false
    }
  ];

  const genuineParts = [
    { part: "Fan Motor", price: "₹2,299 - ₹3,099" },
    { part: "Compressor", price: "₹4,000 - ₹9,200" },
    { part: "PCB Repair", price: "₹1,800 - ₹4,500" },
    { part: "Capacitor", price: "₹599 - ₹749" },
    { part: "Gas Charging", price: "₹2,700" }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* First-Time Banner */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-md px-4 py-1.5 font-black uppercase tracking-widest text-[10px]">Welcome Offer</Badge>
                <h3 className="text-3xl font-black italic tracking-tight">"Power Boost @ Lite Price"</h3>
                <p className="font-bold text-blue-50/80">First-time customers get a Power Boost Deep Clean for just ₹499!</p>
              </div>
              <Button onClick={() => onBookNow?.("Power Boost Deep Clean (Split)")} className="bg-white text-blue-600 hover:bg-blue-50 h-14 px-10 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-900/20 active:scale-95 transition-all">
                Claim Offer Now
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-blue-100 text-blue-900 border-blue-200">Value Packages</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">Not just cleaning <span className="text-blue-600">we restore cooling.</span></h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the service that matches your AC's current performance
          </p>
        </div>

        {/* Service Packages */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 px-4 md:px-0">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-slate-100 bg-white rounded-[2rem] overflow-hidden ${plan.popular ? 'ring-2 ring-blue-600 scale-105 shadow-2xl' : ''
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-blue-600 text-white border-0 rounded-none rounded-bl-xl font-bold uppercase tracking-widest text-[10px] py-1.5 px-3">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4 pt-8">
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{plan.icon}</div>
                <CardTitle className="text-xl font-black text-blue-900 leading-tight mb-2">{plan.name}</CardTitle>
                <p className="text-xs font-bold text-slate-400 mb-4">{plan.description}</p>
                <div className="space-y-1">
                  <div className={`text-4xl font-black ${plan.popular ? 'text-blue-600' : 'text-slate-900'}`}>{plan.price}</div>
                  <div className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{plan.duration}</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pb-8">
                <ul className="space-y-3 pt-6 border-t border-slate-50">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <span className="text-sm text-slate-600 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => {
                    let serviceName = plan.name;
                    if (serviceName === "Power Boost Deep Clean") serviceName = "Power Boost Deep Clean (Split)";
                    if (serviceName === "Foam Guard Deep Clean") serviceName = "Foam Guard Deep Clean (Split)";
                    onBookNow?.(serviceName);
                  }}
                  className={`w-full h-14 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${plan.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 active:scale-95'
                    : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95'
                    }`}
                >
                  Book this Service
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Smart Combo Offers */}
        <div className="max-w-6xl mx-auto mb-20 bg-blue-50/50 rounded-[3rem] p-8 md:p-12 border border-blue-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-4 text-center md:text-left">
              <Badge className="bg-blue-600 text-white border-0 px-4 py-1 font-black uppercase tracking-widest text-[10px]">Profit Saver Bundles</Badge>
              <h3 className="text-3xl md:text-4xl font-black text-blue-900 tracking-tight leading-none">Smart Combo Deals</h3>
              <p className="text-slate-500 font-medium max-w-lg">Get deep cleaning and anti-rust protection in one visit. Best value for your AC's long-term health.</p>
            </div>
            <div className="hidden md:block">
              <Badge variant="outline" className="border-blue-200 text-blue-600 font-bold px-4 py-2 rounded-full bg-white">Limited-Time Offer ⚡</Badge>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {combos.map((combo, index) => (
              <div key={index} className={`relative p-8 rounded-[2rem] border transition-all hover:shadow-xl ${combo.popular ? 'bg-white border-blue-200 ring-4 ring-blue-50' : 'bg-white border-slate-100'}`}>
                {combo.popular && (
                  <Badge className="absolute -top-3 left-8 bg-amber-500 text-white border-0 font-black uppercase tracking-widest text-[10px] py-1 px-3">Best Profit Booster</Badge>
                )}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-black text-blue-900 leading-tight mb-2">{combo.name}</h4>
                    <p className="text-sm font-bold text-slate-400 italic">{combo.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-blue-600 leading-none mb-1">{combo.price}</div>
                    <Badge className="bg-emerald-100 text-emerald-700 border-0 font-bold text-[10px]">{combo.savings}</Badge>
                  </div>
                </div>
                <Button onClick={() => onBookNow?.(combo.name)} className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-600/10">Book this Combo</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Other Solutions & Parts */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Additional Services */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-blue-900 tracking-tight">Installation & Saver Packs</h3>
              <p className="text-slate-500 font-medium">Precision workmanship for homes and offices.</p>
            </div>
            <div className="grid gap-3">
              {additionalServices.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{item.service}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.unit}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-blue-600">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Genuine Parts Table */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-blue-900 tracking-tight">🧩 Genuine Parts & Repairs</h3>
              <p className="text-slate-500 font-medium">Original-grade components with service warranty.</p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-2 bg-slate-50 p-4 border-b border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Component</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Price Range (₹)</span>
              </div>
              <div className="divide-y divide-slate-50">
                {genuineParts.map((item, index) => (
                  <div key={index} className="grid grid-cols-2 p-4">
                    <span className="font-bold text-slate-800 text-sm">{item.part}</span>
                    <span className="font-black text-blue-600 text-sm text-right">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-blue-50/50">
                <p className="text-[10px] font-bold text-blue-600/80 leading-relaxed italic">
                  * All parts are compatibility-checked and come with our standard service warranty.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          {[
            { icon: Clock, title: "Same-Day Service", desc: "Vadodara wide", color: "text-blue-600" },
            { icon: Shield, title: "Service Warranty", desc: "Up to 90 days", color: "text-blue-600" },
            { icon: Star, title: "Restored Cooling", desc: "Guaranteed results", color: "text-amber-500" },
            { icon: Check, title: "GST Billing", desc: "Formal invoicing", color: "text-emerald-500" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3 group">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-50 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <div className="space-y-1">
                <h5 className="font-bold text-blue-900 text-sm">{item.title}</h5>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
