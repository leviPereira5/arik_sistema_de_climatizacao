"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ComoFunciona from "@/components/ComoFunciona";
import Planos from "@/components/Planos";
import Simulador from "@/components/Simulador";
import ParaEmpresas from "@/components/ParaEmpresas";
import SobreNos from "@/components/SobreNos";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="como-funciona">
          <ComoFunciona />
        </section>
        <section id="planos">
          <Planos />
        </section>
        <section id="simulador">
          <Simulador />
        </section>
        <section id="empresas">
          <ParaEmpresas />
        </section>
        <section id="sobre">
          <SobreNos />
        </section>
        <section id="contacto">
          <Contacto />
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-primary text-white shadow-lg hover:bg-green-mid transition-colors"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
