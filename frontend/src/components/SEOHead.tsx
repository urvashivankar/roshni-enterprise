import { Helmet, HelmetProvider } from "react-helmet-async";

interface SEOHeadProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

export const SEOHead = ({
    title = "Roshni Enterprise - Best AC Repair & Installation in Vadodara",
    description = "Expert AC installation, repair & maintenance services in Vadodara. 24/7 emergency service, all brands, guaranteed satisfaction. Call +91 972769 0078",
    image = "/og-image.jpg", // Will be created
    url = "https://cooling-comfort-connect.vercel.app",
    type = "website",
}: SEOHeadProps) => {
    const fullImageUrl = image.startsWith("http") ? image : `${url}${image}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content="AC repair Vadodara, AC installation Vadodara, AC service, air conditioning repair, AC maintenance, gas refilling, AMC, emergency AC repair, Roshni Enterprise" />
            <meta name="author" content="Roshni Enterprise" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:site_name" content="Roshni Enterprise" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImageUrl} />
            <meta name="twitter:site" content="@roshni_enterprise_" />

            {/* WhatsApp */}
            <meta property="og:image:alt" content="Roshni Enterprise - Professional AC Repair Services in Vadodara" />

            {/* Structured Data - Local Business */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": "Roshni Enterprise",
                    "image": fullImageUrl,
                    "description": description,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Vadodara",
                        "addressRegion": "Gujarat",
                        "addressCountry": "IN"
                    },
                    "telephone": "+919727690078",
                    "priceRange": "₹₹",
                    "openingHoursSpecification": {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "08:00",
                        "closes": "20:00"
                    },
                    "url": url,
                    "sameAs": [
                        "https://www.instagram.com/roshni_enterprise_"
                    ],
                    "serviceType": "AC Repair, AC Installation, AC Maintenance"
                })}
            </script>
        </Helmet>
    );
};

// Export wrapped provider for use in App.tsx
export const SEOProvider = HelmetProvider;
