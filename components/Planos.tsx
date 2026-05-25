"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Star, Sofa, Briefcase } from "lucide-react";
import PlanosModal from "./PlanosModal";

interface Plano {
  id: string;
  name: string;
  price: string;
  equipment?: string;
  idealFor: string;
  idealForEmpresas: string;
  features: { label: string; included: boolean }[];
  popular?: boolean;
  cta?: string;
}

const planos: Plano[] = [
  {
    id: "essential",
    name: "Arik Essential",
    price: "81,23€",
    equipment: "Mono-split 12.000 BTU (GREE Clivia+)",
    idealFor: "T0, T1, quartos individuais",
    idealForEmpresas: "Barbeiros, salões, pequenos escritórios, alojamento local pequeno",
    features: [
      { label: "Instalação incluída", included: true },
      { label: "Reparações cobertas", included: true },
      { label: "Garantia de funcionamento", included: true },
      { label: "Múltiplas divisões", included: false },
    ],
  },
  {
    id: "confort",
    name: "Arik Confort",
    price: "151,95€",
    equipment: "Multi-split 21.000 BTU (GREE FM21)",
    idealFor: "T2, T3, habitações médias",
    idealForEmpresas: "Restaurantes, pastelarias, lojas, alojamento local médio",
    popular: true,
    features: [
      { label: "Instalação incluída", included: true },
      { label: "Reparações cobertas", included: true },
      { label: "Garantia de funcionamento", included: true },
      { label: "Múltiplas divisões", included: true },
    ],
  },
  {
    id: "premium",
    name: "Arik Premium",
    price: "233,26€",
    equipment: "Multi-split 28.000 BTU (GREE FM28)",
    idealFor: "T4+, moradias, grandes espaços",
    idealForEmpresas: "Hotéis, ginásios, escritórios grandes, alojamento local espaçoso",
    features: [
      { label: "Instalação incluída", included: true },
      { label: "Reparações cobertas", included: true },
      { label: "Garantia de funcionamento", included: true },
      { label: "Múltiplas divisões", included: true },
    ],
  },
];

export default function Planos() {
  const [selectedPlano, setSelectedPlano] = useState<Plano | null>(null);

  const handleCta = (plano: Plano) => {
    setSelectedPlano(plano);
  };

  return (
    <section className="py-24" style={{ backgroundColor: "var(--bg-warm)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl mb-4" style={{ fontWeight: 300, color: "var(--text-dark)" }}>
            Escolhe o teu plano
          </h2>
          <p className="text-lg font-sans max-w-xl mx-auto mb-8" style={{ color: "var(--text-muted)" }}>
            Todos os planos incluem instalação, manutenção e reparação. Sem letras pequenas.
          </p>
        </motion.div>

        {/* Cards — desktop grid, mobile scroll */}
        <div className="flex lg:grid lg:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory pb-4 lg:pb-0 lg:overflow-visible">
          {planos.map((plano, i) => (
            <motion.div
              key={plano.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-auto snap-center rounded-2xl p-6 flex flex-col transition-shadow"
              style={{
                backgroundColor: plano.popular ? "var(--green-primary)" : "var(--card-bg)",
                border: plano.popular ? "none" : "1px solid var(--border)",
                boxShadow: plano.popular ? "0 8px 32px rgba(59,109,17,0.25)" : "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {plano.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "var(--amber-accent)", color: "#fff" }}>
                  <Star size={10} fill="currentColor" />
                  Mais popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-fraunces text-xl mb-1" style={{ fontWeight: 500, color: plano.popular ? "#fff" : "var(--text-dark)" }}>
                  {plano.name}
                </h3>
                <div className="flex flex-col gap-1 mb-4">
                  <span className="flex items-center gap-1.5 text-xs font-sans" style={{ color: plano.popular ? "rgba(255,255,255,0.75)" : "var(--text-muted)" }}>
                    <Sofa size={11} style={{ flexShrink: 0 }} />
                    {plano.idealFor}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-sans" style={{ color: plano.popular ? "rgba(255,255,255,0.75)" : "var(--text-muted)" }}>
                    <Briefcase size={11} style={{ flexShrink: 0 }} />
                    {plano.idealForEmpresas}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-fraunces text-4xl" style={{ fontWeight: 300, color: plano.popular ? "#fff" : "var(--text-dark)" }}>
                    {plano.price}
                  </span>
                  {plano.price !== "Contacto" && (
                    <span className="text-sm font-sans" style={{ color: plano.popular ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}>
                      /mês
                    </span>
                  )}
                </div>
                {plano.equipment && (
                  <p className="text-xs mt-2 font-sans" style={{ color: plano.popular ? "rgba(255,255,255,0.6)" : "var(--text-muted)" }}>
                    {plano.equipment}
                  </p>
                )}
              </div>

              <ul className="flex-1 space-y-2.5 mb-6">
                {plano.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-2 text-sm font-sans"
                    style={{ color: plano.popular ? (f.included ? "#fff" : "rgba(255,255,255,0.4)") : (f.included ? "var(--text-dark)" : "var(--text-muted)") }}>
                    {f.included
                      ? <Check size={14} style={{ color: plano.popular ? "#fff" : "var(--green-primary)", flexShrink: 0 }} />
                      : <X size={14} style={{ flexShrink: 0, opacity: 0.4 }} />
                    }
                    {f.label}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCta(plano)}
                className="w-full py-3 rounded-full text-sm font-medium transition-colors"
                style={{
                  backgroundColor: plano.popular ? "#fff" : "var(--green-primary)",
                  color: plano.popular ? "var(--green-primary)" : "#fff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = plano.popular ? "var(--green-light)" : "var(--green-mid)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = plano.popular ? "#fff" : "var(--green-primary)";
                }}
              >
                {plano.cta ?? "Contratar este plano →"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <PlanosModal plano={selectedPlano} onClose={() => setSelectedPlano(null)} />
    </section>
  );
}
