"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Building2, UtensilsCrossed, Scissors, Users, FileText, Percent, UserCheck } from "lucide-react";

const casos = [
  {
    icon: Building2,
    title: "Alojamento Local",
    desc: "Melhore as avaliações online e atraia mais hóspedes com climatização de qualidade — sem capital inicial.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restauração & Cafés",
    desc: "Os seus clientes ficam mais tempo quando se sentem confortáveis. Climatize sem grandes investimentos.",
  },
  {
    icon: Scissors,
    title: "Pequenos Negócios",
    desc: "Barbeiros, estéticas, clínicas — ambientes agradáveis fidelizam clientes. A Arik cuida disso.",
  },
];

const vantagens = [
  { icon: Percent, label: "Desconto de 5% na mensalidade" },
  { icon: Building2, label: "Gestão de múltiplos espaços numa só conta" },
  { icon: FileText, label: "Faturação centralizada" },
  { icon: UserCheck, label: "Técnico dedicado para a sua conta" },
];

const stats = [
  { value: 82, suffix: "%", label: "dos portugueses sem ar condicionado" },
  { value: 37.9, suffix: "%", label: "dos alojamentos locais geridos por empresas" },
  { value: 66, suffix: "%", label: "crescimento do setor (2020–2024)", prefix: "+" },
];

function useCounter(target: number, started: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(1)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
}

function StatItem({ value, suffix, label, prefix, started }: {
  value: number; suffix: string; label: string; prefix?: string; started: boolean;
}) {
  const count = useCounter(value, started);
  const display = Number.isInteger(value) ? Math.round(count) : count.toFixed(1);
  return (
    <div className="text-center">
      <p className="font-fraunces text-4xl lg:text-5xl mb-1" style={{ fontWeight: 300, color: "var(--green-primary)" }}>
        {prefix}{display}{suffix}
      </p>
      <p className="text-sm font-sans" style={{ color: "var(--text-muted)" }}>{label}</p>
    </div>
  );
}

export default function ParaEmpresas() {
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCountersStarted(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-fraunces text-4xl lg:text-5xl mb-4" style={{ fontWeight: 300, color: "var(--text-dark)" }}>
              A Arik é parceira do seu negócio
            </h2>
            <p className="font-sans text-lg mb-8" style={{ color: "var(--text-muted)" }}>
              Soluções para alojamentos locais, restauração e pequenos negócios em todo o norte de Portugal.
            </p>

            <ul className="space-y-3 mb-8">
              {vantagens.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm font-sans" style={{ color: "var(--text-dark)" }}>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--green-light)" }}>
                    <Icon size={15} style={{ color: "var(--green-primary)" }} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <button
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full text-white text-sm font-medium transition-colors"
              style={{ backgroundColor: "var(--green-primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--green-mid)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--green-primary)")}
            >
              Tornar-me parceiro →
            </button>
          </motion.div>

          {/* Right — use case cards */}
          <div className="grid gap-4">
            {casos.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-xl"
                style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-warm)" }}
              >
                <span className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--green-light)" }}>
                  <Icon size={18} style={{ color: "var(--green-primary)" }} />
                </span>
                <div>
                  <h3 className="font-fraunces text-base mb-1" style={{ fontWeight: 500, color: "var(--text-dark)" }}>{title}</h3>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12"
          style={{ borderTop: "1px solid var(--border)" }}>
          {stats.map((s) => (
            <StatItem key={s.label} {...s} started={countersStarted} />
          ))}
        </div>
      </div>
    </section>
  );
}
