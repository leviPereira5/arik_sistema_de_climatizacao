"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  tipoEspaco: string;
  plano: string;
  mensagem: string;
  consentimento: boolean;
}

export default function Contacto() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg text-sm font-sans outline-none transition-colors bg-white/10 text-white placeholder-white/40 border border-white/20";
  const focusStyle = { borderColor: "rgba(255,255,255,0.6)" };
  const blurStyle = { borderColor: "rgba(255,255,255,0.2)" };

  return (
    <section className="py-24 relative" style={{ backgroundColor: "var(--green-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl mb-3 text-white" style={{ fontWeight: 300 }}>
            Pronto para começar?
          </h2>
          <p className="font-sans text-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
            Peça uma visita técnica gratuita. Sem compromisso.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form — 2/3 width */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Nome */}
                <div>
                  <label className="block text-xs font-sans mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Nome <span className="text-green-light">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="O seu nome"
                    {...register("nome", { required: true })}
                    className={inputClass}
                    style={errors.nome ? { ...blurStyle, borderColor: "#f87171" } : blurStyle}
                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.currentTarget.style, errors.nome ? { borderColor: "#f87171" } : blurStyle)}
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-xs font-sans mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Email <span className="text-green-light">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email@exemplo.pt"
                    {...register("email", { required: true })}
                    className={inputClass}
                    style={blurStyle}
                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
                  />
                </div>
                {/* Telefone */}
                <div>
                  <label className="block text-xs font-sans mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Telefone <span className="text-green-light">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+351 9XX XXX XXX"
                    {...register("telefone", { required: true })}
                    className={inputClass}
                    style={blurStyle}
                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
                  />
                </div>
                {/* Tipo de espaço */}
                <div>
                  <label className="block text-xs font-sans mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Tipo de espaço
                  </label>
                  <select
                    {...register("tipoEspaco")}
                    className={inputClass}
                    style={{ ...blurStyle, appearance: "none" }}
                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
                  >
                    <option value="" className="bg-green-dark text-white">Selecionar...</option>
                    <option value="habitacao" className="bg-green-dark text-white">Habitação</option>
                    <option value="alojamento" className="bg-green-dark text-white">Alojamento Local</option>
                    <option value="restauracao" className="bg-green-dark text-white">Restauração</option>
                    <option value="outro" className="bg-green-dark text-white">Outro</option>
                  </select>
                </div>
                {/* Plano */}
                <div>
                  <label className="block text-xs font-sans mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Plano de interesse
                  </label>
                  <select
                    {...register("plano")}
                    className={inputClass}
                    style={{ ...blurStyle, appearance: "none" }}
                    onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
                  >
                    <option value="" className="bg-green-dark text-white">Selecionar...</option>
                    <option value="essential" className="bg-green-dark text-white">Essential</option>
                    <option value="confort" className="bg-green-dark text-white">Confort</option>
                    <option value="premium" className="bg-green-dark text-white">Premium</option>
                    <option value="nao-sei" className="bg-green-dark text-white">Não sei ainda</option>
                  </select>
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label className="block text-xs font-sans mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Mensagem (opcional)
                </label>
                <textarea
                  {...register("mensagem")}
                  rows={3}
                  placeholder="Alguma informação adicional..."
                  className={`${inputClass} resize-none`}
                  style={blurStyle}
                  onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)}
                />
              </div>

              {/* Consentimento */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consentimento"
                  {...register("consentimento", { required: true })}
                  className="mt-0.5 w-4 h-4 accent-green-primary flex-shrink-0"
                />
                <label htmlFor="consentimento" className="text-xs font-sans" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Aceito ser contactado pela equipa Arik <span className="text-green-light">*</span>
                  {errors.consentimento && (
                    <span className="block mt-0.5" style={{ color: "#f87171" }}>Este campo é obrigatório.</span>
                  )}
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: "var(--green-light)",
                  color: "var(--green-dark)",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = "#d4ecb8")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--green-light)")}
              >
                {isSubmitting ? "A enviar..." : "Enviar pedido de visita"}
              </button>

              <p className="text-xs font-sans" style={{ color: "rgba(255,255,255,0.4)" }}>
                ⚠️ Demonstração académica — nenhum dado será processado ou armazenado.
              </p>
            </form>

            {/* Success toast */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ backgroundColor: "var(--green-light)", color: "var(--green-dark)" }}
                >
                  <CheckCircle size={18} />
                  <span className="text-sm font-sans font-medium">
                    Pedido enviado! Entraremos em contacto em 48h.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-6 flex flex-col gap-5"
            style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
          >
            {[
              { icon: MapPin, label: "Morada", value: "Rua Cristins, Avidos e Lagoa\nVila Nova de Famalicão" },
              { icon: Phone, label: "Telefone", value: "+351 912 345 678 (ilustrativo)" },
              { icon: Mail, label: "Email", value: "info@arik.pt (ilustrativo)" },
              { icon: Clock, label: "Horário", value: "Seg–Sex: 9h–18h" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-3">
                <span className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                  <Icon size={16} className="text-white" />
                </span>
                <div>
                  <p className="text-xs font-sans mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
                  <p className="text-sm font-sans whitespace-pre-line text-white">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
