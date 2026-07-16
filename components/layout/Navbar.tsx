"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { navigation } from "@/lib/constants/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils/cn";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track active section for highlights
  const sectionIds = navigation.map((item) => item.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds, 0.5);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border-color py-4"
          : "bg-transparent py-6"
      )}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="font-heading font-bold text-xl tracking-tighter text-primary">
          RM.
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navigation.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              
              return (
                <li key={item.name} className="relative">
                  <a
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-[150ms] hover:text-primary py-2",
                      isActive ? "text-accent" : "text-muted"
                    )}
                  >
                    {item.name}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          <Button asChild variant="outline" size="sm">
            <a href="/resume.pdf" download>
              Resume
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-muted hover:text-primary transition-colors duration-[150ms] relative after:absolute after:inset-0 after:min-h-[44px] after:min-w-[44px] after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface border-b border-border-color shadow-lg py-4 px-6 flex flex-col gap-4">
          <ul className="flex flex-col gap-4">
            {navigation.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-base font-medium transition-colors block py-2 border-b border-border-color/50",
                      isActive ? "text-accent" : "text-muted"
                    )}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <Button asChild variant="primary" size="sm" className="w-full mt-2">
            <a href="/resume.pdf" download onClick={() => setMobileMenuOpen(false)}>
              Download Resume
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
