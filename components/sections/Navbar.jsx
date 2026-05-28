"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Vision", href: "#vision" },
    { name: "Research", href: "#research" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "max-w-[720px] w-full flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 pointer-events-auto",
          isScrolled
            ? "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
            : "bg-transparent border border-white/0",
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium tracking-tight font-cormorant-garamond italic">
            Accerra
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-light text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-1 text-sm font-medium bg-white text-[#060810] px-5 py-2 rounded-full hover:scale-105 active:scale-95 transition-all group">
            Join Vision
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>

          <button
            className="md:hidden text-white/80 p-1"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#060810] z-[60] flex flex-col p-10 pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-medium font-cormorant-garamond italic">
                Accerra
              </span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-light text-white/90"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <button className="mt-auto w-full bg-white text-[#060810] py-4 rounded-2xl text-lg font-medium">
              Join the Vision
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
