// FILE: src/components/Navbar.tsx
"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { FiSearch, FiMenu, FiX, FiHome, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }

      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node) &&
        isMoreOpen
      ) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, isMoreOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
    setIsSearchOpen(false);
  };

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeOut" } },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
  };

  const mobileMenuVariants: Variants = {
    hidden: { x: "-100%", transition: { duration: 0.3, ease: "easeOut" } },
    visible: { x: "0%", transition: { duration: 0.3, ease: "easeOut" } },
  };

  // Helper function to determine if a link is active
  const isActive = (href: string) => {
    // Special handling for the root path
    if (href === "/" && pathname === "/") {
      return true;
    }
    // For other paths, check if the pathname starts with the href
    // This handles cases like /research/topic also highlighting /research
    return href !== "/" && pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-gradient-to-r from-white/90 to-gray-50/90 dark:from-gray-950/90 dark:to-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-lg transition-all duration-300 ease-in-out font-jakarta">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left side for Desktop: Home Icon and All Nav Links */}
        {mounted && (
          <div className="hidden md:flex gap-8 items-center relative text-gray-800 dark:text-gray-200">
            {/* Home Link */}
            <Link
              href="/"
              className={`
                relative flex items-center gap-1 text-lg font-medium transition-colors duration-300 group
                ${isActive("/") ? "text-blue-600 dark:text-blue-400" : "hover:text-blue-600 dark:hover:text-blue-400"}
              `}
              onClick={handleLinkClick}
            >
              <FiHome className="text-xl" /> Home
              <span className={`
                absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform
                ${isActive("/") ? "scaleX-100" : "scaleX-0 group-hover:scaleX-100"}
                transition-transform origin-left duration-300
              `}></span>
            </Link>

            {/* Regular Nav Links with Hover/Active Animation */}
            {[
              { href: "/about", label: "About" },
              { href: "/team", label: "Team" },
              { href: "/research", label: "Research" },
              { href: "/publications", label: "Publications" },
              { href: "/events", label: "News & Events" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative text-lg font-medium transition-colors duration-300 group
                  ${isActive(item.href) ? "text-blue-600 dark:text-blue-400" : "hover:text-blue-600 dark:hover:text-blue-400"}
                `}
                onClick={handleLinkClick}
              >
                {item.label}
                <span className={`
                  absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform
                  ${isActive(item.href) ? "scaleX-100" : "scaleX-0 group-hover:scaleX-100"}
                  transition-transform origin-left duration-300
                `}></span>
              </Link>
            ))}

            {/* More dropdown with Framer Motion for desktop */}
            <div
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
              ref={moreDropdownRef}
            >
              <button
                className={`
                  text-lg font-medium transition-colors duration-300 flex items-center gap-1 group
                  ${isMoreOpen || (pathname.startsWith("/facilities") || pathname.startsWith("/gallery") || pathname.startsWith("/careers") || pathname.startsWith("/blog"))
                    ? "text-blue-600 dark:text-blue-400"
                    : "hover:text-blue-600 dark:hover:text-blue-400"
                  }
                `}
              >
                More{" "}
                <span className="text-sm">
                  {isMoreOpen ? (
                    <FiChevronUp className="h-5 w-5 transform rotate-0 transition-transform duration-300" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 transform rotate-0 transition-transform duration-300" />
                  )}
                </span>
                <span className={`
                  absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform
                  ${isMoreOpen || (pathname.startsWith("/facilities") || pathname.startsWith("/gallery") || pathname.startsWith("/careers") || pathname.startsWith("/blog"))
                    ? "scaleX-100"
                    : "scaleX-0 group-hover:scaleX-100"
                  }
                  transition-transform origin-left duration-300
                `}></span>
              </button>
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[180px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg overflow-hidden py-2"
                  >
                    {[
                      { href: "/facilities", label: "Facilities" },
                      { href: "/gallery", label: "Gallery" },
                      { href: "/careers", label: "Careers" },
                      { href: "/blog", label: "Blog" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`
                          block px-5 py-2 transition-colors duration-200 text-base
                          ${isActive(item.href) ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"}
                        `}
                        onClick={handleLinkClick}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Right side for Desktop: Search Icon */}
        {mounted && (
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle search"
            >
              <FiSearch className="text-xl" />
            </button>
          </div>
        )}

        {/* Mobile Layout: Hamburger/Close (Left) and Search (Right) */}
        {mounted && (
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Hamburger/Close Menu Icon for Mobile (Left) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>

            {/* Mobile Search Button (Right) */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              aria-label="Toggle search"
            >
              <FiSearch className="text-xl" />
            </button>
          </div>
        )}
      </div>

      {/* Overlay for mobile menu */}
      {mounted && isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></motion.div>
      )}

      {/* Mobile Navigation Drawer - **Solid Background** */}
      {mounted && (
        <motion.div
          ref={mobileMenuRef}
          initial="hidden"
          animate={isMobileMenuOpen ? "visible" : "hidden"}
          variants={mobileMenuVariants}
          className={`fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-950 shadow-2xl md:hidden z-40 flex flex-col`}
        >
          {/* Close button inside the drawer */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          <div className="flex-1 p-5 flex flex-col gap-2 overflow-y-auto hide-scrollbar">
            {/* Home Link for Mobile */}
            <Link
              href="/"
              className={`
                block py-3 px-3 rounded-lg transition-colors duration-200 flex items-center gap-3 font-medium text-lg
                ${isActive("/")
                  ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-400"
                  : "text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                }
              `}
              onClick={handleLinkClick}
            >
              <FiHome className="text-xl" /> Home
            </Link>
            {[
              { href: "/about", label: "About" },
              { href: "/team", label: "Team" },
              { href: "/research", label: "Research" },
              { href: "/publications", label: "Publications" },
              { href: "/events", label: "News & Events" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  block py-3 px-3 rounded-lg transition-colors duration-200 font-medium text-lg
                  ${isActive(item.href)
                    ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-400"
                    : "text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                  }
                `}
                onClick={handleLinkClick}
              >
                {item.label}
              </Link>
            ))}

            {/* More dropdown in mobile menu should still be click-triggered for accessibility */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`
                  block w-full text-left py-3 px-3 rounded-lg transition-colors duration-200 flex items-center justify-between font-medium text-lg
                  ${isMoreOpen || (pathname.startsWith("/facilities") || pathname.startsWith("/gallery") || pathname.startsWith("/careers") || pathname.startsWith("/blog"))
                    ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-400"
                    : "text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                  }
                `}
              >
                More{" "}
                <span className="text-sm">
                  {isMoreOpen ? (
                    <FiChevronUp className="h-5 w-5 transform rotate-0 transition-transform duration-300" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 transform rotate-0 transition-transform duration-300" />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="pl-6 mt-2 border-l-2 border-blue-200 dark:border-blue-700 flex flex-col gap-1"
                  >
                    {[
                      { href: "/facilities", label: "Facilities" },
                      { href: "/gallery", label: "Gallery" },
                      { href: "/careers", label: "Careers" },
                      { href: "/blog", label: "Blog" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`
                          block px-4 py-2 rounded-md transition-colors duration-200 text-base
                          ${isActive(item.href)
                            ? "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                          }
                        `}
                        onClick={handleLinkClick}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search Bar Component */}
      {mounted && isSearchOpen && (
        <SearchBar onClose={() => setIsSearchOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;