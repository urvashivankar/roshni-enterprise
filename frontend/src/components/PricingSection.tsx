
import { Check, Star, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const PricingSection = ({ onBookNow }: { onBookNow?: () => void }) => {
  const pricingPlans = [
    {
      name: "Basic Service",
      price: "₹499",
      duration: "One-time",
      popular: false,
      features: [
        "AC Cleaning & Maintenance",
        "Filter Replacement",
        "Basic Performance Check",
        "30-day Service Warranty",
        "Emergency Support"
      ],
      icon: "🔧"
    },
    {
      name: "Complete Care",
      price: "₹999",
      duration: "One-time",
      popular: true,
      features: [
        "Deep AC Cleaning",
        "Gas Pressure Check",
        "Coil Deep Cleaning",
        "Performance Optimization",
        "90-day Service Warranty",
        "Priority Emergency Support",
        "Free Minor Repairs"
      ],
      icon: "⭐"
    },
    {
      name: "Annual AMC",
      price: "₹2,999",
      duration: "Per year",
      popular: false,
      features: [
        "4 Scheduled Services",
        "Unlimited Emergency Calls",
        "Free Gas Refilling (1x)",
        "All Spare Parts 20% Off",
        "24/7 Priority Support",
        "1-year Comprehensive Warranty",
        "Free Installation Support"
      ],
      icon: "🛡️"
    }
  ];

  const additionalServices = [
    { service: "AC Installation", price: "₹1,500 - ₹3,500", unit: "per unit" },
    { service: "Gas Refilling", price: "₹1,200 - ₹2,000", unit: "per refill" },
    { service: "Emergency Repair", price: "₹800 - ₹2,500", unit: "per visit" },
    { service: "Coil Replacement", price: "₹2,000 - ₹5,000", unit: "per coil" },
    { service: "Compressor Repair", price: "₹3,000 - ₹8,000", unit: "per unit" },
    { service: "Electrical Repair", price: "₹500 - ₹1,500", unit: "per issue" }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-blue-100 text-blue-900 border-blue-200">Service Packages</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our affordable service packages designed for every budget and need
          </p>
        </div>

        {/* Service Packages */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-slate-200 ${plan.popular ? 'ring-2 ring-amber-500 scale-105 shadow-xl' : 'hover:border-blue-200'
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-amber-500 text-white border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="text-4xl mb-4">{plan.icon}</div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-1">
                  <div className={`text-3xl font-bold ${plan.popular ? 'text-amber-600' : 'text-slate-800'}`}>{plan.price}</div>
                  <div className="text-gray-500 text-sm">{plan.duration}</div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={onBookNow}
                  className={`w-full ${plan.popular
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Additional Services</h3>
            <p className="text-gray-600">Professional services with competitive pricing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {additionalServices.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.service}</h4>
                      <p className="text-sm text-gray-500">{item.unit}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-900">{item.price}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="space-y-2">
            <Clock className="w-12 h-12 text-blue-900 mx-auto" />
            <h4 className="font-semibold">Quick Service</h4>
            <p className="text-sm text-gray-600">Same-day service available</p>
          </div>
          <div className="space-y-2">
            <Shield className="w-12 h-12 text-blue-900 mx-auto" />
            <h4 className="font-semibold">Warranty Included</h4>
            <p className="text-sm text-gray-600">All services come with warranty</p>
          </div>
          <div className="space-y-2">
            <Star className="w-12 h-12 text-amber-500 mx-auto" />
            <h4 className="font-semibold">Quality Guaranteed</h4>
            <p className="text-sm text-gray-600">100% satisfaction promise</p>
          </div>
        </div>
      </div>
    </section>
  );
};
