"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft, RotateCcw } from "lucide-react";
import {
  calcularPlano,
  type TipoEspaco,
  type Tamanho,
  type Divisoes,
  type Orcamento,
  type PlanoRecomendado,
} from "@/lib/simulador";

const steps = [
  {
    question: "Qual é o tipo de espaço?",
    options: [
      { value: "habitacao", label: "🏠", desc: "Habitação particular" },
      { value: "alojamento", label: "🏨", desc: "Alojamento local" },
      { value: "comercio", label: "🍽️", desc: "Restauração / Comércio" },
    ],
  },
  {
    question: "Qual é o tamanho do espaço?",
    options: [
      { value: "pequeno", label: "◻️", desc: "Menos de 60 m²" },
      { value: "medio", label: "🔲", desc: "Entre 60 m² e 100 m²" },
      { value: "grande", label: "⬛", desc: "Mais de 100 m²" },
    ],
  },
  {
    question: "Quantas divisões a climatizar?",
    options: [
      { value: "uma", label: "1️⃣", desc: "1 divisão" },
      { value: "algumas", label: "2️⃣", desc: "2 a 3 divisões" },
      { value: "muitas", label: "🔢", desc: "4 ou mais divisões" },
    ],
  },
  {
    question: "Qual é o seu orçamento mensal?",
    options: [
      { value: "baixo", label: "💚", desc: "Até 35€/mês" },
      { value: "medio", label: "💛", desc: "Entre 35€ e 60€/mês" },
      { value: "alto", label: "🧡", desc: "Mais de 60€/mês" },
    ],
  },
];

const planoInfo: Record<PlanoRecomendado, { price: string; features: string[] }> = {
  Essential: {
    price: "29€/mês",
    features: ["Instalação incluída", "Manutenção anual", "Reparações cobertas"],
  },
  Confort: {
    price: "49€/mês",
    features: ["Instalação incluída", "Manutenção semestral", "Reparações cobertas", "Múltiplas divisões"],
  },
  Premium: {
    price: "79€/mês",
    features: ["Instalação incluída", "Manutenção trimestral", "Reparações cobertas", "Controlo inteligente"],
  },
  "Essential Business": {
    price: "39€/mês",
    features: ["Instalação incluída", "Manutenção incluída", "Desconto 5% contrato anual"],
  },
  Business: {
    price: "69€/mês",
    features: ["Instalação incluída", "Manutenção incluída", "Gestor dedicado", "Faturação centralizada"],
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
      const [tipo, tamanho, divisoes, orcamento] = next;
      setResultado(
        calcularPlano(
          tipo as TipoEspaco,
          tamanho as Tamanho,
          divisoes as Divisoes,
          orcamento as Orcamento
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
          <h2 className="font-fraunces text-4xl lg:text-5xl mb-3" style={{ fontWeight: 300, color: "var(--text-dark)" }}>
            Qual é o plano certo para si?
          </h2>
          <p className="font-sans text-base" style={{ color: "var(--text-muted)" }}>
            Responda a 4 perguntas e receba a recomendação personalizada.
          </p>
        </motion.div>

        <div className="rounded-2xl p-6 sm:p-8 shadow-lg" style={{ backgroundColor: "var(--card-bg)" }}>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-sans mb-2" style={{ color: "var(--text-muted)" }}>
              <span>{resultado ? "Recomendação" : `Passo ${step + 1} de ${steps.length}`}</span>
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
                  {steps[step].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleOption(opt.value)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all"
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
                      <span className="text-3xl">{opt.label}</span>
                      <span className="text-sm font-sans text-center" style={{ color: "var(--text-dark)" }}>
                        {opt.desc}
                      </span>
                    </button>
                  ))}
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
                <p className="text-sm font-sans mb-2" style={{ color: "var(--text-muted)" }}>
                  Recomendamos
                </p>
                <h3 className="font-fraunces text-3xl mb-1" style={{ fontWeight: 400, color: "var(--green-primary)" }}>
                  Arik {resultado}
                </h3>
                <p className="font-fraunces text-2xl mb-6" style={{ fontWeight: 300, color: "var(--text-dark)" }}>
                  {planoInfo[resultado].price}{" "}
                  <span className="text-sm font-sans" style={{ color: "var(--text-muted)" }}>(ilustrativo)</span>
                </p>

                <ul className="inline-flex flex-col items-start gap-2 mb-8">
                  {planoInfo[resultado].features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-sans" style={{ color: "var(--text-dark)" }}>
                      <Check size={14} style={{ color: "var(--green-primary)" }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={handleContratar}
                    className="px-6 py-3 rounded-full text-white text-sm font-medium transition-colors"
                    style={{ backgroundColor: "var(--green-primary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--green-mid)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--green-primary)")}
                  >
                    Contratar agora →
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-full text-sm font-medium border transition-colors flex items-center justify-center gap-1.5"
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
