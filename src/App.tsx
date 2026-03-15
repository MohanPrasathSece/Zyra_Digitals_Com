import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Preloader } from "@/components/Preloader";
import { motion, AnimatePresence } from "framer-motion";

import { Chatbot } from "@/components/Chatbot";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show preloader on first visit, not on page navigation
    const hasVisited = sessionStorage.getItem('has-visited');
    if (!hasVisited) {
      sessionStorage.setItem('has-visited', 'true');
      return true;
    }
    return false;
  });

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        <BrowserRouter>
          <Analytics />
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            {!isLoading && <Navbar />}
            <main className="flex-grow">
              <Suspense fallback={<LoadingFallback />}>
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route
                      path="/"
                      element={
                        <PageWrapper>
                          <Home />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/about"
                      element={
                        <PageWrapper>
                          <About />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/services"
                      element={
                        <PageWrapper>
                          <Services />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/portfolio"
                      element={
                        <PageWrapper>
                          <Portfolio />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="/contact"
                      element={
                        <PageWrapper>
                          <Contact />
                        </PageWrapper>
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <PageWrapper>
                          <NotFound />
                        </PageWrapper>
                      }
                    />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </main>
            {!isLoading && <Footer />}
            <Chatbot />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    className="mx-4 md:mx-0"
  >
    {children}
  </motion.div>
);

export default App;
