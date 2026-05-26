"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, X, ArrowLeft, RotateCcw,
  Home, Hotel, Store,
  Minimize2, Square, Maximize2,
  DoorOpen, LayoutDashboard, LayoutGrid,
  Sofa, Briefcase,
  type LucideIcon,
} from "lucide-react";
import {
  calcularPlano,
  type TipoEspaco,
  type Tamanho,
  type Divisoes,
  type PlanoRecomendado,
} from "@/lib/simulador";

const steps: { question: string; options: { value: string; icon: LucideIcon; desc: string }[] }[] = [
  {
    question: "Qual é o tipo de espaço?",
    options: [
      { value: "habitacao", icon: Home, desc: "Habitação particular" },
      { value: "alojamento", icon: Hotel, desc: "Alojamento local" },
      { value: "comercio", icon: Store, desc: "Restauração / Comércio" },
    ],
  },
  {
    question: "Qual é o tamanho do espaço?",
    options: [
      { value: "pequeno", icon: Minimize2, desc: "Menos de 60 m²" },
      { value: "medio", icon: Square, desc: "Entre 60 m² e 100 m²" },
      { value: "grande", icon: Maximize2, desc: "Mais de 100 m²" },
    ],
  },
  {
    question: "Quantas divisões a climatizar?",
    options: [
      { value: "uma", icon: DoorOpen, desc: "1 divisão" },
      { value: "algumas", icon: LayoutDashboard, desc: "2 a 3 divisões" },
      { value: "muitas", icon: LayoutGrid, desc: "4 ou mais divisões" },
    ],
  },
];

const planoInfo: Record<PlanoRecomendado, {
  price: string;
  equipment: string;
  idealFor: string;
  idealForEmpresas: string;
  features: { label: string; included: boolean }[];
}> = {
  Essential: {
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
  Confort: {
    price: "151,95€",
    equipment: "Multi-split 21.000 BTU (GREE FM21)",
    idealFor: "T2, T3, habitações médias",
    idealForEmpresas: "Restaurantes, pastelarias, lojas, alojamento local médio",
    features: [
      { label: "Instalação incluída", included: true },
      { label: "Reparações cobertas", included: true },
      { label: "Garantia de funcionamento", included: true },
      { label: "Múltiplas divisões", included: true },
    ],
  },
  Premium: {
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
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -80, opacity: 0 }),
};

export default function Simulador() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultado, setResultado] = useState<PlanoRecomendado | null>(null);

  const progress = resultado ? 100 : Math.round((step / steps.length) * 100);

  const handleOption = (value: string) => {
    const next = [...answers, value];
    if (step < steps.length - 1) {
      setDir(1);
      setAnswers(next);
      setStep((s) => s + 1);
    } else {
      const [tipo, tamanho, divisoes] = next;
      setResultado(
        calcularPlano(
          tipo as TipoEspaco,
          tamanho as Tamanho,
          divisoes as Divisoes
        )
      );
    }
  };

  const handleBack = () => {
    setDir(-1);
    setAnswers((a) => a.slice(0, -1));
    setStep((s) => s - 1);
  };

  const handleReset = () => {
    setDir(-1);
    setStep(0);
    setAnswers([]);
    setResultado(null);
  };

  const handleContratar = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24" style={{ backgroundColor: "var(--green-light)" }}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontWeight: 300, color: "var(--text-dark)" }}>
            Qual é o plano certo para si?
          </h2>
          <p className="font-sans text-base" style={{ color: "var(--text-muted)" }}>
            Responda a 3 perguntas e receba a recomendação personalizada.
          </p>
        </motion.div>

        <div className="rounded-2xl p-6 sm:p-8 shadow-lg" style={{ backgroundColor: "var(--card-bg)" }}>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-sans mb-2" style={{ color: "var(--text-muted)" }}>
              <span>{resultado ? "Recomendação" : `Passo ${step + 1} de 3`}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--green-light)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "var(--green-primary)" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait" custom={dir}>
            {!resultado ? (
              <motion.div
                key={step}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <h3 className="font-fraunces text-2xl mb-6 text-center" style={{ fontWeight: 400, color: "var(--text-dark)" }}>
                  {steps[step].question}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {steps[step].options.map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleOption(opt.value)}
                        className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all"
                        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-warm)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--green-primary)";
                          e.currentTarget.style.backgroundColor = "var(--green-light)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.backgroundColor = "var(--bg-warm)";
                        }}
                      >
                        <span className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "var(--green-light)" }}>
                          <Icon size={20} style={{ color: "var(--green-primary)" }} />
                        </span>
                        <span className="text-sm font-sans text-center" style={{ color: "var(--text-dark)" }}>
                          {opt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {step > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 flex items-center gap-1.5 text-sm font-sans mx-auto transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-dark)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    <ArrowLeft size={14} /> Voltar
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="resultado"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="text-center"
              >
                <p className="text-sm font-sans mb-4" style={{ color: "var(--text-muted)" }}>
                  Recomendamos
                </p>

                <div className="mb-4">
                  <h3 className="font-fraunces text-2xl mb-2" style={{ fontWeight: 500, color: "var(--text-dark)" }}>
                    Arik {resultado}
                  </h3>
                  <div className="flex flex-col gap-1 mb-3 items-center">
                    <span className="flex items-center gap-1.5 text-xs font-sans" style={{ color: "var(--text-muted)" }}>
                      <Sofa size={11} style={{ flexShrink: 0 }} />
                      {planoInfo[resultado].idealFor}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-sans" style={{ color: "var(--text-muted)" }}>
                      <Briefcase size={11} style={{ flexShrink: 0 }} />
                      {planoInfo[resultado].idealForEmpresas}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 justify-center">
                    <span className="font-fraunces text-4xl" style={{ fontWeight: 300, color: "var(--text-dark)" }}>
                      {planoInfo[resultado].price}
                    </span>
                    <span className="text-sm font-sans" style={{ color: "var(--text-muted)" }}>/mês</span>
                  </div>
                  <p className="text-xs mt-1 font-sans" style={{ color: "var(--text-muted)" }}>
                    {planoInfo[resultado].equipment}
                  </p>
                </div>

                <ul className="space-y-2.5 mb-8 inline-flex flex-col items-start">
                  {planoInfo[resultado].features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2 text-sm font-sans"
                      style={{ color: f.included ? "var(--text-dark)" : "var(--text-muted)" }}>
                      {f.included
                        ? <Check size={14} style={{ color: "var(--green-primary)", flexShrink: 0 }} />
                        : <X size={14} style={{ flexShrink: 0, opacity: 0.4 }} />
                      }
                      {f.label}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleContratar}
                    className="flex-1 py-3 rounded-full text-white text-sm font-medium transition-colors"
                    style={{ backgroundColor: "var(--green-primary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--green-mid)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--green-primary)")}
                  >
                    Contratar este plano →
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 rounded-full text-sm font-medium border transition-colors flex items-center justify-center gap-1.5"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)", backgroundColor: "transparent" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--green-light)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <RotateCcw size={14} /> Recomeçar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
