import { useState, useEffect, useRef } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Quote, ChevronRight, ChevronLeft, ExternalLink, ArrowRight, X } from "lucide-react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";

const Portfolio = (): JSX.Element => {
  useScrollToTop();
  const testimonials = [
    {
      quote:
        "Absolutely mind blowing work and very cooperative as well. Great rates and work ethic—never faced any issue and the responses were always on time. Loved working with Zyra Digitals for the MVP of my startup!",
      author: "Aryan Kapoor",
      role: "Founder, Nexus",
      avatarInitial: "A",
    },
    {
      quote:
        "Zyra Digitals are the best. They completed the website within the deadline and delivered a clean, professional, and user-friendly experience. I highly recommend them to anyone looking to create premium websites.",
      author: "James Wilson",
      role: "Marketing Head, Elevate",
      avatarInitial: "J",
    },
    {
      quote:
        "This agency understands every detail and made my website and my friend's website at a very reasonable price, which looks very premium. Highly recommended!",
      author: "Ishaan Verma",
      role: "CEO, Zentry",
      avatarInitial: "I",
    },
    {
      quote:
        "AmzCoz needed a partner who could show our Amazon growth story with proof and polish. Zyra Digitals nailed the messaging and gave us a lead magnet that converts.",
      author: "Priya Deshpande",
      role: "Co-Founder, AmzCoz",
      avatarInitial: "P",
    },
    {
      quote:
        "Our endodontic practice relies on trust. The Precision Root Canal website Mohan crafted reflects our clinical precision and makes booking effortless for London patients.",
      author: "Dr. Rohan Kulkarni",
      role: "Specialist Endodontist, Precision Root Canal Therapy",
      avatarInitial: "R",
    },
    {
      quote:
        "Lumi & Co. is built on craftsmanship and elegance. Zyra Digitals created a digital experience that honors our artisans and connects with customers who value timeless beauty.",
      author: "Meera Iyer",
      role: "Founder, Lumi & Co.",
      avatarInitial: "M",
    },
  ];

  const [tIndex, setTIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (projectIdx: number) => {
    setCurrentProjectIndex(projectIdx);
    setCurrentImageIndex(0);
    setGalleryOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const project = projects[currentProjectIndex];
    if (project.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const project = projects[currentProjectIndex];
    if (project.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
    }
  };

  const projects = [
    {
      title: "Precision Root Canal Therapy & Hygiene",
      category: "Healthcare",
      image: "/images/Portfolio_projects/precision/precision.png",
      images: [
        "/images/Portfolio_projects/precision/precision.png",
        "/images/Portfolio_projects/precision/image.png",
        "/images/Portfolio_projects/precision/image copy.png",
        "/images/Portfolio_projects/precision/image copy 2.png",
        "/images/Portfolio_projects/precision/image copy 3.png",
        "/images/Portfolio_projects/precision/image copy 4.png"
      ],
      description:
        "A specialist dental clinic website for a London-based endodontic practice, showcasing expertise, advanced technology, and streamlined appointment booking.",
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "https://www.precisionrct.co.uk/",
      color: "#f8f9fa"
    },
    {
      title: "Lumi & Co.",
      category: "Luxury Jewelry",
      image: "/images/Portfolio_projects/lumi/lumi.png",
      images: [
        "/images/Portfolio_projects/lumi/lumi.png",
        "/images/Portfolio_projects/lumi/image.png",
        "/images/Portfolio_projects/lumi/image copy.png",
        "/images/Portfolio_projects/lumi/image copy 2.png",
        "/images/Portfolio_projects/lumi/image copy 3.png"
      ],
      description:
        "A handcrafted jewelry brand from Pune showcasing timeless elegance through ethically-sourced materials, rose gold designs, and sustainable practices that celebrate individuality.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      link: "https://lumi-co.vercel.app/",
      color: "#fffafa"
    },
    {
      title: "AmzCoz",
      category: "E-Commerce Growth",
      image: "/images/Portfolio_projects/amzcoz/amzcoz.png",
      images: [
        "/images/Portfolio_projects/amzcoz/amzcoz.png",
        "/images/Portfolio_projects/amzcoz/image.png",
        "/images/Portfolio_projects/amzcoz/image copy.png",
        "/images/Portfolio_projects/amzcoz/image copy 2.png",
        "/images/Portfolio_projects/amzcoz/image copy 3.png",
        "/images/Portfolio_projects/amzcoz/image copy 4.png"
      ],
      description:
        "An Amazon growth and e-commerce success partner offering end-to-end account management, advertising, and strategic support for brands across the globe.",
      technologies: ["ReactJS", "Tailwind CSS"],
      link: "https://amzcoz.com",
      color: "#f5f5f5"
    },
    {
      title: "CrowdVerse",
      category: "FinTech & Analytics",
      image: "/images/Portfolio_projects/crowdverse/image.png",
      images: [
        "/images/Portfolio_projects/crowdverse/image.png",
        "/images/Portfolio_projects/crowdverse/image copy.png",
        "/images/Portfolio_projects/crowdverse/image copy 2.png",
        "/images/Portfolio_projects/crowdverse/image copy 3.png",
        "/images/Portfolio_projects/crowdverse/image copy 4.png",
        "/images/Portfolio_projects/crowdverse/image copy 5.png"
      ],
      description:
        "A real-time market analytics platform delivering crowd sentiment on stocks and cryptocurrencies, combining trader votes with AI-powered insights for smarter investment decisions.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "AI Integration"],
      link: "https://crowdverse.in/",
      color: "#f0f4ff"
    },
    {
      title: "SeekBuyLove",
      category: "Fashion E-Commerce",
      image: "/images/Portfolio_projects/seekbuylove/image.png",
      images: [
        "/images/Portfolio_projects/seekbuylove/image.png",
        "/images/Portfolio_projects/seekbuylove/image copy.png",
        "/images/Portfolio_projects/seekbuylove/image copy 2.png",
        "/images/Portfolio_projects/seekbuylove/image copy 3.png",
        "/images/Portfolio_projects/seekbuylove/image copy 4.png"
      ],
      description:
        "A modern e-commerce clothing store offering curated fashion collections with an intuitive shopping experience designed to help customers discover and love their style.",
      technologies: ["WordPress", "WooCommerce"],
      link: "https://seekbuylove.in/",
      color: "#fff5f5"
    },
    {
      title: "Launch & Close",
      category: "B2B SaaS & Growth",
      image: "/images/Portfolio_projects/launch&close/image.png",
      images: [
        "/images/Portfolio_projects/launch&close/image.png",
        "/images/Portfolio_projects/launch&close/image copy.png",
        "/images/Portfolio_projects/launch&close/image copy 2.png",
        "/images/Portfolio_projects/launch&close/image copy 3.png",
        "/images/Portfolio_projects/launch&close/image copy 4.png"
      ],
      description:
        "A full-stack growth partner for startups and SMBs, bridging the gap between strategy and execution with senior revenue operators who build, execute, and transfer complete sales systems.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      link: "https://launchandclose.com/",
      color: "#f8f8ff"
    },
  ];

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!galleryOpen) return;

      if (e.key === "ArrowRight") {
        const project = projects[currentProjectIndex];
        if (project.images) {
          setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
        }
      } else if (e.key === "ArrowLeft") {
        const project = projects[currentProjectIndex];
        if (project.images) {
          setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
        }
      } else if (e.key === "Escape") {
        closeGallery();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [galleryOpen, currentProjectIndex]);

  useEffect(() => {
    const id = setInterval(() => {
      setTIndex((i) => (i + 1) % testimonials.length);
    }, 11000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.zyradigitals.com/portfolio/#collectionpage",
        "url": "https://www.zyradigitals.com/portfolio",
        "name": "Featured Projects | Portfolio | Zyra Digitals",
        "isPartOf": { "@id": "https://www.zyradigitals.com/#website" },
        "description": "Showcase of premium website design and development projects by Zyra Digitals.",
        "breadcrumb": { "@id": "https://www.zyradigitals.com/portfolio/#breadcrumb" },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": projects.map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": project.link,
            "name": project.title,
            "item": {
              "@type": "CreativeWork",
              "name": project.title,
              "description": project.description,
              "image": `https://www.zyradigitals.com${project.image}`,
              "url": project.link,
              "creator": {
                "@type": "Organization",
                "@id": "https://www.zyradigitals.com/#organization"
              },
              "keywords": `${project.category}, website design, web development, UI/UX design, branding`
            }
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.zyradigitals.com/portfolio/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.zyradigitals.com/" },
          { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://www.zyradigitals.com/portfolio" }
        ]
      }
    ]
  };

  return (
    <div className="pt-20">
      <SEO
        title="Portfolio | Premium Website Design & Development Showcase"
        description="Explore the award-winning portfolio of Zyra Digitals. See how we've helped businesses like Precision Root Canal, Lumi & Co, and AmzCoz achieve digital excellence through custom web development and premium design."
        canonical="/portfolio"
        keywords="website design portfolio, web development projects, UI/UX design showcase, professional website examples, best website designs, creative web development, portfolio website, Zyra Digitals work, premium web design projects, Coimbatore web designer portfolio, healthcare web design, luxury jewelry website, e-commerce success stories"
        schema={portfolioSchema}
        publishedTime="2025-01-01T00:00:00Z"
        modifiedTime={new Date().toISOString()}
        section="Portfolio"
      />


      {/* Hero Section - Reverted to Full Screen Banner */}
      <AnimatedSection animation="fade-up" className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-gold/10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>

        {/* Floating Elements - Restored Gold */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="min-h-screen flex items-start justify-center pt-20">
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2 mb-6">
                  <ExternalLink className="text-foreground" size={16} />
                  <span className="font-secondary text-sm text-foreground/80 font-medium">Our Portfolio</span>
                </div>

                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                  Our Work
                  <span className="block mt-2"><span className="text-gold">Speaks</span> For Itself</span>
                  <span className="sr-only"> - Premium UI/UX Design & Website Development Projects</span>
                </h1>

                <p className="font-secondary text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                  Explore our latest projects and see how we've helped businesses transform their digital presence with exceptional design and development.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="gold" size="lg" asChild className="h-16 px-8 text-base">
                    <Link to="/contact" className="flex items-center gap-2">
                      Start Your Project
                      <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="lg" asChild className="h-16 px-8 text-base border border-border">
                    <a href="#projects">View Projects</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Overlapping Projects List */}
      <div id="projects" className="relative px-4 sm:px-6 lg:px-8 py-20 pb-40">
        <div className="max-w-7xl mx-auto space-y-[20vh]">
          {projects.map((project, index) => (
            <div
              key={index}
              className="sticky top-[10vh] lg:top-[15vh] w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group relative bg-white border border-gray-200 rounded-[2rem] shadow-2xl overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:min-h-[600px] bg-white">
                  {/* Project Image Box - Big and Modern */}
                  <div
                    className="lg:w-2/3 relative cursor-pointer overflow-hidden flex flex-col"
                    onClick={() => openGallery(index)}
                  >
                    {/* MacBook/Browser Header */}
                    <div className="bg-[#f0f0f0] border-b border-gray-200 px-4 py-3 flex items-center gap-4 relative z-20">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
                      </div>
                      <div className="flex-1 max-w-md mx-auto h-7 bg-white/80 rounded-lg flex items-center justify-center px-4 border border-gray-200/50">
                        <div className="text-[10px] font-mono text-gray-400 truncate">
                          {project.link ? project.link.replace('https://', '').replace('http://', '') : `zyradigitals.com/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                        </div>
                      </div>
                    </div>

                    {/* Main Image Wrapper */}
                    <div className="relative w-full flex-1 aspect-[16/9] lg:aspect-auto bg-gray-100 overflow-hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} - ${project.category} Portfolio | Zyra Digitals`}
                        title={`${project.title} Design & Development Project`}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none`}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/images/placeholder-project.png';
                        }}
                      />

                      {/* Image Overlays / Badges - Moved Inside */}
                      <div className="absolute top-4 left-4 lg:top-8 lg:left-8">
                        <div className="px-3 py-1 lg:px-4 lg:py-2 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 text-gray-800 text-[10px] lg:text-xs font-secondary tracking-widest uppercase">
                          {project.category}
                        </div>
                      </div>

                      {/* Multiple Image Preview Placeholders - Moved Inside */}
                      <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 flex gap-2 lg:gap-3">
                        {project.images?.map((_, i) => (
                          <div key={i} className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-bold shadow-sm">
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Details Box - Outside the Image but inside the sticky card */}
                  <div className="lg:w-1/3 p-6 lg:p-12 flex flex-col justify-start lg:justify-between border-t lg:border-t-0 lg:border-l border-gray-200">
                    <div>
                      <div className="mb-4 lg:mb-8">
                        <span className="text-primary font-secondary text-[10px] lg:text-sm font-bold tracking-widest uppercase mb-2 lg:mb-4 block">
                          {project.category}
                        </span>
                        <div className="flex items-start justify-between gap-4 mb-3 lg:mb-6">
                          <h2 className="font-heading text-2xl lg:text-4xl font-bold text-gray-900 transition-colors">
                            {project.title}
                          </h2>
                          {project.link && (
                            <div className="lg:hidden shrink-0 mt-1">
                              <Button
                                asChild
                                variant="gold"
                                size="sm"
                                className="h-7 px-2 text-[10px] uppercase tracking-tighter rounded-md"
                              >
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                  Live <ExternalLink size={10} />
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>



                        <p className="font-secondary text-gray-600 text-sm lg:text-lg leading-relaxed mb-6 lg:mb-8 line-clamp-3 lg:line-clamp-none">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-12">
                        <div className="flex flex-wrap gap-1.5 lg:gap-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 lg:px-3 lg:py-1 bg-gray-100 rounded-md text-[10px] lg:text-xs font-mono text-gray-600 border border-gray-200 uppercase">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>


                    <div className="hidden lg:block">
                      {project.link && (
                        <Button
                          asChild
                          variant="gold"
                          size="lg"
                          className="w-full h-14 rounded-xl shadow-xl hover:shadow-primary/20 transition-all duration-300"
                        >
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3">
                            <span>Live Link</span>
                            <ExternalLink size={18} />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <AnimatedSection animation="fade-up" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 sm:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
                  <Quote className="text-gold" size={24} />
                </div>
              </div>

              {/* Testimonial Content */}
              <blockquote className="font-heading text-lg sm:text-xl leading-relaxed text-foreground mb-6 font-medium text-center transition-opacity duration-500">
                "{testimonials[tIndex].quote}"
              </blockquote>

              {/* Author Section */}
              <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/50">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20">
                  <span className="font-heading text-base font-bold text-gold">{testimonials[tIndex].avatarInitial}</span>
                </div>
                <div className="text-left">
                  <p className="font-subheading text-base font-semibold text-foreground">{testimonials[tIndex].author}</p>
                  <p className="font-secondary text-sm text-muted-foreground">{testimonials[tIndex].role}</p>
                </div>
              </div>
              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition-all ${i === tIndex ? "bg-gold w-4" : "bg-border"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="slide-up" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Want to See Your Project Here?
          </h2>
          <p className="font-secondary text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's collaborate to create something exceptional that showcases your brand.
          </p>
          <Button variant="gold" size="lg" asChild className="h-16 px-8">
            <Link to="/contact" className="flex items-center gap-2">
              Start Your Project
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </AnimatedSection>
      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeGallery}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
              onClick={closeGallery}
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-6xl aspect-video flex items-center justify-center">
              {/* Main Gallery Image */}
              <motion.img
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={projects[currentProjectIndex].images?.[currentImageIndex] || projects[currentProjectIndex].image}
                alt={projects[currentProjectIndex].title}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />

              {/* Navigation Arrows */}
              {projects[currentProjectIndex].images && projects[currentProjectIndex].images!.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
                    onClick={prevImage}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
                    onClick={nextImage}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/50 font-secondary text-sm">
                {currentImageIndex + 1} / {projects[currentProjectIndex].images?.length || 1}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
