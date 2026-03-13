import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${scrolled ? 'pt-4' : 'pt-0'
        }`}
    >
      <div
        className={`transition-all duration-500 flex items-center justify-between transition-all duration-500
          ${scrolled
            ? 'w-[90%] md:w-[650px] py-1 px-8 rounded-xl mt-4 border border-white/40 shadow-xl bg-white/30 backdrop-blur-xl'
            : 'w-[80%] py-6 px-4 sm:px-6 lg:px-12 bg-transparent'
          }`}
      >
        <Link
          to="/"
          className="flex items-center hover-scale transition-transform duration-200 z-50 mr-0"
          onClick={() => window.scrollTo(0, 0)}
          aria-label="Zyra Digitals Home"
        >
          <img
            src="/zyra_digitals_grey_bg-removebg-preview.png"
            alt="Zyra Digitals - Best Website Design & Development Agency in Coimbatore"
            className={`h-10 md:h-12 w-auto object-contain shrink-0 transition-all duration-300 ${scrolled ? 'h-11 md:h-12' : ''
              }`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-0.5">
          {scrolled ? (
            <div className="bg-black rounded-xl border border-gray-800 p-2 flex items-center space-x-0.5">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          ) : (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-black hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-xl bg-white/30 border border-white/40 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-out ${isMobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Container */}
        <div
          className={`absolute top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm transition-all duration-300 ease-out ${isMobileMenuOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-4'
            }`}
        >
          <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-8">
            {/* Navigation Links */}
            <nav className="space-y-4 mb-8">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/services", label: "Services" },
                { to: "/portfolio", label: "Portfolio" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                  className={`block text-center py-3 px-6 rounded-2xl font-medium transition-all duration-200 ${location.pathname === item.to
                    ? 'bg-black text-white shadow-lg'
                    : 'text-black hover:bg-black/10'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Contact Button */}
            <div className="text-center">
              <Link
                to="/contact"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className="inline-block px-8 py-3 bg-black text-white font-medium rounded-2xl shadow-lg hover:bg-neutral-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const isActive = location.pathname === to

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Link
      to={to}
      className={`group relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${scrolled
        ? (isActive
          ? "text-white bg-white/20 shadow-sm"
          : "text-white/80 hover:text-white hover:bg-white/10")
        : (isActive
          ? "text-black bg-gray-100/70 shadow-sm"
          : "text-gray-600 hover:text-black hover:bg-gray-100/50")
        }`}
      onClick={() => window.scrollTo(0, 0)}
    >
      {children}
    </Link>
  )
}
