"use client";

import { motion } from "framer-motion";
import { Check, Wrench, ShieldCheck } from "lucide-react";
import Image from "next/image";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <div
      className="min-h-screen flex items-center pt-16"
      style={{ backgroundColor: "var(--bg-warm)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-6">
            {/* Tag pill */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ backgroundColor: "var(--green-light)", color: "var(--green-primary)" }}>
                🌿 Climatização sustentável por subscrição
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="font-fraunces text-4xl sm:text-5xl lg:text-7xl leading-tight"
              style={{ fontWeight: 300, color: "var(--text-dark)" }}
            >
              Conforto térmico sem<br />
              <span style={{ color: "var(--green-primary)" }}>investimento inicial.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={item} className="text-lg font-sans max-w-md" style={{ color: "var(--text-muted)" }}>
              A Arik instala, mantém e repara o seu sistema de climatização por uma mensalidade fixa.
              Sem surpresas, sem capital avançado.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => scrollTo("planos")}
                className="px-6 py-3 rounded-full text-white font-medium text-base transition-colors"
                style={{ backgroundColor: "var(--green-primary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--green-mid)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--green-primary)")}
              >
                Descobrir os planos
              </button>
              <button
                onClick={() => scrollTo("como-funciona")}
                className="px-6 py-3 rounded-full font-medium text-base border transition-colors"
                style={{ borderColor: "var(--border)", color: "var(--text-dark)", backgroundColor: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--green-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Como funciona →
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
              {[
                { icon: Check, label: "Instalação incluída" },
                { icon: Wrench, label: "Manutenção incluída" },
                { icon: ShieldCheck, label: "Sem investimento inicial" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 text-sm font-sans" style={{ color: "var(--text-muted)" }}>
                  <Icon size={16} style={{ color: "var(--green-primary)" }} />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm flex items-center justify-center min-h-[320px]">
              {/* Organic background shapes */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" aria-hidden="true">
                <ellipse cx="200" cy="200" rx="190" ry="170" fill="var(--green-light)" opacity="0.7" />
                <ellipse cx="280" cy="120" rx="100" ry="80" fill="var(--green-light)" opacity="0.5" />
                <ellipse cx="100" cy="300" rx="120" ry="90" fill="var(--green-light)" opacity="0.4" />
              </svg>

              {/* Logo */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 my-16 rounded-3xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: "#fff" }}
              >
                <Image
                  src="/logo-arik.png"
                  alt="Arik Sistemas de Climatização"
                  width={320}
                  height={320}
                  className="w-64 h-64 object-contain p-6"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
