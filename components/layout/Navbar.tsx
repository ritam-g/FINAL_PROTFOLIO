"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { navigation } from "@/lib/constants/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils/cn";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

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
        "top-0 right-0 left-0 z-50 fixed transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border-color py-4"
          : "bg-transparent py-6"
      )}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="top-0 right-0 left-0 z-50 absolute bg-accent h-[2px] origin-left"
        style={{ scaleX }}
      />

      <div className="flex justify-between items-center mx-auto px-6 max-w-6xl">
        <a href="#hero" className="font-heading font-bold text-primary text-xl tracking-tighter">
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
                      "py-2 font-medium hover:text-primary text-sm transition-colors duration-[150ms]",
                      isActive ? "text-accent" : "text-muted"
                    )}
                  >
                    {item.name}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="right-0 -bottom-1 left-0 absolute bg-accent rounded-full h-[2px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          <Magnetic>
            <Button asChild variant="outline" size="sm">
              <a href="/RESUME.pdf" download>
                Resume
              </a>
            </Button>
          </Magnetic>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden after:top-1/2 after:left-1/2 after:absolute relative after:inset-0 -mr-2 p-2 after:min-w-[44px] after:min-h-[44px] text-muted hover:text-primary transition-colors after:-translate-x-1/2 after:-translate-y-1/2 duration-[150ms]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden top-full right-0 left-0 absolute flex flex-col gap-4 bg-surface shadow-lg px-6 py-4 border-border-color border-b">
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
                      "block py-2 border-border-color/50 border-b font-medium text-base transition-colors",
                      isActive ? "text-accent" : "text-muted"
                    )}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <Button asChild variant="primary" size="sm" className="mt-2 w-full">
            <a href="/resume.pdf" download onClick={() => setMobileMenuOpen(false)}>
              Download Resume
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
