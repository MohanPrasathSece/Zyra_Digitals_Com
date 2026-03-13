import { Helmet } from "react-helmet-async";
import React from "react";

interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    twitterHandle?: string;
    keywords?: string;
    schema?: object;
    noindex?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tag?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title,
    description = "Zyra Digitals is the premier website design and development agency in Coimbatore. We craft high-performance websites, premium brand identities, and strategic digital growth systems for modern businesses.",
    canonical = "https://www.zyradigitals.com/",
    ogImage = "https://www.zyradigitals.com/zyra_digitals_grey_bg-removebg-preview.png",
    ogType = "website",
    twitterHandle = "@zyradigitals",
    keywords = "Zyra Digitals, Zyra Digital, Zira Digitals, Zyra Digitels, Zyra Web Design, Zyra Digitalz, Zyra Digitel, Zyra Branding, Zyra Web Coimbatore, best website design company Coimbatore, website development Coimbatore, web design agency Coimbatore, professional website developers, famous web design company, popular website development, top web designers in Coimbatore, website designer near me, Tamil Nadu web development, branding agency India, digital solutions, Mohan Prasath S, premium UI/UX design, e-commerce development Coimbatore",
    schema,
    noindex = false,
    publishedTime,
    modifiedTime = new Date().toISOString(),
    author = "Mohan Prasath S",
    section = "Technology",
    tag
}) => {
    const siteName = "Zyra Digitals";
    const fullTitle = title ? `${title} | ${siteName} - Website Design Coimbatore` : `${siteName} - Best Website Design & Development Company in Coimbatore`;
    const siteUrl = "https://www.zyradigitals.com";

    // Default structured data (Ultra-Powerful Schema.org Graph)
    const defaultSchema = {
        "@context": "https://schema.org",
        "@graph": [
            // Organization
            {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                "name": siteName,
                "url": siteUrl,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${siteUrl}/zyra_digitals_grey_bg-removebg-preview.png`,
                    "width": "512",
                    "height": "512"
                },
                "image": {
                    "@id": `${siteUrl}/#logo`
                },
                "sameAs": [
                    "https://www.instagram.com/zyradigitals.co/",
                    "https://www.linkedin.com/company/zyra-digitals/",
                    "https://www.facebook.com/zyradigitals",
                    "https://twitter.com/zyradigitals"
                ],
                "contactPoint": [
                    {
                        "@type": "ContactPoint",
                        "telephone": "+91-9025421149",
                        "contactType": "sales",
                        "areaServed": "IN",
                        "availableLanguage": ["en", "ta"]
                    }
                ],
                "founder": {
                    "@type": "Person",
                    "name": "Mohan Prasath S",
                    "jobTitle": "Founder & CEO",
                    "sameAs": [
                        "https://www.linkedin.com/in/mohanprasaths/",
                        "https://github.com/mohanprasath-s"
                    ]
                },
                "description": "Zyra Digitals is a leading digital agency specialized in ultra-premium website design, high-conversion brand identity, and scalable digital solutions."
            },
            // WebSite
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                "url": siteUrl,
                "name": siteName,
                "description": "Premium Website Design & Growth Agency",
                "publisher": {
                    "@id": `${siteUrl}/#organization`
                },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
                    },
                    "query-input": "required name=search_term_string"
                }
            },
            // Professional Service (Local Business)
            {
                "@type": "ProfessionalService",
                "@id": `${siteUrl}/#service`,
                "name": siteName,
                "image": `${siteUrl}/zyra_digitals_grey_bg-removebg-preview.png`,
                "url": siteUrl,
                "telephone": "+91-9025421149",
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Coimbatore",
                    "addressLocality": "Coimbatore",
                    "addressRegion": "Tamil Nadu",
                    "postalCode": "641001",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 11.0168,
                    "longitude": 76.9558
                },
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "06:00",
                        "closes": "22:00"
                    }
                ],
                "knowsAbout": ["Web Design", "Web Development", "Branding", "SEO", "UI/UX", "E-commerce"],
                "areaServed": ["Coimbatore", "Tamil Nadu", "India", "London", "United Kingdom", "United States", "Global"]
            }
        ]
    };

    const mergedSchema = schema ? { ...defaultSchema, "@graph": [...defaultSchema["@graph"], ...(Array.isArray((schema as any)["@graph"]) ? (schema as any)["@graph"] : [schema])] } : defaultSchema;
    const absoluteCanonical = canonical.startsWith("http") ? canonical : `${siteUrl}${canonical.startsWith("/") ? "" : "/"}${canonical}`;
    const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={absoluteCanonical} />
            <meta name="author" content={author} />
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
            <meta name="revisit-after" content="1 days" />

            {/* Dublin Core (Rare Advanced SEO) */}
            <meta name="DC.title" content={fullTitle} />
            <meta name="DC.creator" content={author} />
            <meta name="DC.description" content={description} />
            <meta name="DC.publisher" content={siteName} />
            <meta name="DC.format" content="text/html" />
            <meta name="DC.language" content="en" />
            <meta name="DC.coverage" content="World" />

            {/* Language & Region */}
            <meta property="og:locale" content="en_US" />
            <meta name="geo.region" content="IN-TN" />
            <meta name="geo.placename" content="Coimbatore" />
            <meta name="geo.position" content="11.0168;76.9558" />
            <meta name="ICBM" content="11.0168, 76.9558" />

            {/* Open Graph / Facebook */}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={absoluteCanonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={absoluteOgImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={fullTitle} />
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            <meta property="article:modified_time" content={modifiedTime} />
            <meta property="article:author" content={author} />
            <meta property="article:section" content={section} />
            {tag && <meta property="article:tag" content={tag} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:creator" content={twitterHandle} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteOgImage} />
            <meta name="twitter:image:alt" content={fullTitle} />

            {/* Web Discovery & Bot Control */}
            <meta name="googlebot" content="all" />
            <meta name="bingbot" content="all" />
            <meta name="rating" content="general" />
            <meta name="distribution" content="global" />

            {/* Mobile & App Tags */}
            <meta name="theme-color" content="#ffffff" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="format-detection" content="telephone=no" />

            {/* Links and Sitemaps */}
            <link rel="sitemap" type="application/xml" title="Sitemap" href={`${siteUrl}/sitemap.xml`} />
            <link rel="alternate" type="application/rss+xml" title={`${siteName} RSS Feed`} href={`${siteUrl}/feed.xml`} />

            {/* Preconnect to critical origins */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://www.google-analytics.com" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(mergedSchema)}
            </script>
        </Helmet>
    );
};


