"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

const valores = [
  {
    icon: Target,
    title: "Missão",
    desc: "Garantir conforto térmico e eficiência energética de forma acessível e generalizada.",
  },
  {
    icon: Eye,
    title: "Visão",
    desc: "Ser a solução de climatização de referência no mercado nacional e expandir para mercados europeus similares.",
  },
  {
    icon: Heart,
    title: "Valores",
    desc: "Acessibilidade · Compromisso com o cliente · Eficiência energética",
  },
];

const equipa = [
  { initials: "AF", name: "Afonso Rodrigues" },
  { initials: "MZ", name: "Manuel Mira" },
  { initials: "RC", name: "Ricardo Russo" },
  { initials: "SP", name: "Simão Rosa" },
  { initials: "TG", name: "Tomás Gonçalves" },
];

const avatarColors = ["#3B6D11", "#639922", "#BA7517", "#3B6D11", "#639922"];

export default function SobreNos() {
  return (
    <section className="py-24" style={{ backgroundColor: "var(--bg-warm)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Left — story */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-fraunces text-4xl lg:text-5xl mb-6" style={{ fontWeight: 300, color: "var(--text-dark)" }}>
              Sobre a Arik
            </h2>
            <p className="font-sans text-base leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              A Arik nasceu de uma ideia simples: porque é que o conforto térmico deve ser privilégio de quem tem capital para investir?
              Criada por jovens empreendedores portugueses, a nossa missão é tornar o acesso a sistemas de climatização eficientes
              acessível a todos — particulares e negócios.
            </p>
            <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Com sede em Vila Nova de Famalicão, operamos em toda a zona norte do país, com foco nos distritos do Porto e Braga.
            </p>
          </motion.div>

          {/* Right — Missão/Visão/Valores */}
          <div className="grid gap-4">
            {valores.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 p-5 rounded-xl bg-white"
                style={{ border: "1px solid var(--border)" }}
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

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-12"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <h3 className="font-fraunces text-2xl mb-8 text-center" style={{ fontWeight: 400, color: "var(--text-dark)" }}>
            A nossa equipa
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {equipa.map(({ initials, name }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-fraunces text-lg"
                  style={{ backgroundColor: avatarColors[i], fontWeight: 500 }}
                >
                  {initials}
                </div>
                <p className="text-sm font-sans text-center" style={{ color: "var(--text-dark)" }}>{name}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs font-sans mt-8" style={{ color: "var(--text-muted)" }}>
            Projeto desenvolvido no âmbito da Licenciatura de Gestão de Empresas — Universidade Lusófona 2024/2025
          </p>
        </motion.div>
      </div>
    </section>
  );
}
