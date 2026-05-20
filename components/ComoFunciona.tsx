"use client";

import { motion } from "framer-motion";
import { MousePointerClick, ClipboardList, Zap, CreditCard } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: MousePointerClick,
    title: "Simulação online",
    desc: "Responde a algumas perguntas sobre a tua habitação e recebe a recomendação do plano ideal.",
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "Visita técnica",
    desc: "Um técnico especializado visita o espaço para confirmar os detalhes da instalação, sem custo.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Instalação",
    desc: "A nossa equipa instala o sistema completo. Tu não pagas nada neste momento.",
  },
  {
    num: "04",
    icon: CreditCard,
    title: "Subscrição ativa",
    desc: "Pagas uma mensalidade fixa. Nós tratamos de tudo — manutenção e reparação incluídas.",
  },
];

export default function ComoFunciona() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-fraunces text-4xl lg:text-5xl mb-4" style={{ fontWeight: 300, color: "var(--text-dark)" }}>
            Como funciona a Arik?
          </h2>
          <p className="text-lg font-sans max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Um processo simples, do primeiro contacto até ao conforto total.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
          {/* Dotted connector (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px"
            style={{ borderTop: "2px dashed var(--green-light)" }} aria-hidden="true" />

          {steps.map(({ num, icon: Icon, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* Icon circle */}
              <div className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "var(--green-light)" }}>
                <span className="absolute top-1 left-3 font-fraunces text-4xl leading-none select-none"
                  style={{ fontWeight: 700, color: "var(--green-light)", WebkitTextStroke: "1px var(--green-mid)", opacity: 0.6 }}>
                  {num}
                </span>
                <Icon size={28} style={{ color: "var(--green-primary)" }} />
              </div>

              <h3 className="font-fraunces text-xl mb-2" style={{ fontWeight: 500, color: "var(--text-dark)" }}>
                {title}
              </h3>
              <p className="text-sm font-sans leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
