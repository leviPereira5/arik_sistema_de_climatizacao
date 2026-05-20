"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
  { label: "Simulador", href: "#simulador" },
  { label: "Empresas", href: "#empresas" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["hero", "como-funciona", "planos", "simulador", "empresas", "sobre", "contacto"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    setIsMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
        style={{ background: "rgba(247,245,238,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("#hero")} className="flex flex-col items-start leading-none">
            <span className="font-fraunces text-2xl font-semibold text-text-dark">Arik</span>
            <span className="text-[10px] text-text-muted tracking-wide font-sans">Sistemas de Climatização</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map((l) => {
              const sectionId = l.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className={`text-sm font-sans transition-colors ${
                    isActive
                      ? "text-green-primary font-medium"
                      : "text-text-muted hover:text-text-dark"
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("#simulador")}
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: "var(--green-primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--green-mid)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--green-primary)")}
            >
              Pedir Simulação
            </button>
            <button
              className="lg:hidden p-2 rounded-md text-text-dark"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-bg-warm shadow-xl flex flex-col pt-20 pb-8 px-6 gap-2"
            >
              <button
                className="absolute top-4 right-4 p-2"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <X size={22} className="text-text-dark" />
              </button>
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => scrollTo(l.href)}
                  className="text-left py-3 text-base font-sans text-text-dark border-b border-border hover:text-green-primary transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#simulador")}
                className="mt-4 w-full py-3 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: "var(--green-primary)" }}
              >
                Pedir Simulação
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
