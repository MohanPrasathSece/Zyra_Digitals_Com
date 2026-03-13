import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    if (pathnames.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-4">
            <ol className="flex items-center space-x-2 text-sm font-secondary text-muted-foreground">
                <li className="flex items-center">
                    <Link
                        to="/"
                        className="flex items-center hover:text-gold transition-colors"
                        title="Home - Zyra Digitals"
                    >
                        <Home size={14} className="mr-1" />
                        <span>Home</span>
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const name = value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");

                    return (
                        <li key={to} className="flex items-center">
                            <ChevronRight size={14} className="mx-1 text-muted-foreground/40" />
                            {last ? (
                                <span className="text-foreground font-medium" aria-current="page">
                                    {name}
                                </span>
                            ) : (
                                <Link
                                    to={to}
                                    className="hover:text-gold transition-colors"
                                    title={`${name} - Zyra Digitals`}
                                >
                                    {name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>

            {/* Structured Data for Breadcrumbs */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": "https://www.zyradigitals.com/"
                        },
                        ...pathnames.map((value, index) => ({
                            "@type": "ListItem",
                            "position": index + 2,
                            "name": value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " "),
                            "item": `https://www.zyradigitals.com/${pathnames.slice(0, index + 1).join("/")}`
                        }))
                    ]
                })}
            </script>
        </nav>
    );
};
