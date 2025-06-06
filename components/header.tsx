"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, Globe, Phone, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { QuoteModal } from "@/components/quote-modal";
import { SupportModal } from "@/components/support-modal";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close mobile menu if open
      setIsOpen(false);

      // Calculate header height for offset
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;

      // Get the element's position
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      // Scroll with offset for header
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { name: "Holidays & Tours", id: "tours" },
    { name: "Experiences", id: "experiences" },
    { name: "Success Stories", id: "stories" },
    { name: "About us", id: "about" },
    { name: "FAQ", id: "faq" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`sticky top-0 z-50 ${
        scrolled ? "bg-white/95 shadow-md" : "bg-white/90"
      } backdrop-blur-sm border-b border-slate-200 transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 z-20"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">
              Anuja Travels
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                whileHover={{
                  y: -3,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                whileTap={{ scale: 0.95 }}
                className="text-slate-600 hover:text-emerald-600 transition-all duration-300 font-medium relative group"
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </motion.button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => setShowSupportModal(true)}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">24/7 Support</span>
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setShowQuoteModal(true)}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden z-20">
              <Button variant="ghost" size="sm" className="p-1">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-slate-800">
                      Sri Lanka Travels
                    </span>
                  </div>
                  <SheetClose className="rounded-full p-1 hover:bg-slate-100">
                    <X className="w-5 h-5" />
                  </SheetClose>
                </div>

                <div className="flex-1 overflow-auto py-6 px-6">
                  <nav className="flex flex-col space-y-6">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="text-slate-700 hover:text-emerald-600 transition-colors font-medium py-2 text-left w-full border-b border-slate-100 pb-4"
                      >
                        {item.name}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6 border-t border-slate-100 space-y-4">
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => setShowQuoteModal(true)}
                  >
                    Get a Quote
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowSupportModal(true)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    24/7 Support
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Modals */}
      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
      />
      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </motion.header>
  );
}
