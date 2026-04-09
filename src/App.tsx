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
import { AestheticReveal } from "@/components/AestheticReveal";
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
  const [showReveal, setShowReveal] = useState(() => {
    const hasVisited = sessionStorage.getItem('has-visited-reveal');
    if (!hasVisited) {
      sessionStorage.setItem('has-visited-reveal', 'true');
      return true;
    }
    return false;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {showReveal && <AestheticReveal />}
        
        <BrowserRouter>
          <Analytics />
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingFallback />}>
                <AnimatePresence mode="wait">
                  <Routes>
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
            <Footer />
            <Chatbot />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
    className="mx-4 md:mx-0"
  >
    {children}
  </motion.div>
);

export default App;
