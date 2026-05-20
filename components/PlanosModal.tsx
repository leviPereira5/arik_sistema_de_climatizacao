"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";

interface Plano {
  id: string;
  name: string;
}

interface Props {
  plano: Plano | null;
  onClose: () => void;
}

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  morada: string;
  mensagem: string;
}

export default function PlanosModal({ plano, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    if (plano) { setIsSuccess(false); reset(); }
  }, [plano, reset]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const onSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsSuccess(true); }, 1500);
  };

  return (
    <AnimatePresence>
      {plano && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl"
            style={{ backgroundColor: "var(--card-bg)" }}
          >
            <button
              onClick={onClose}
              aria-label="Fechar modal"
              className="absolute top-4 right-4 p-1 rounded-md text-text-muted hover:text-text-dark transition-colors"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="py-8 text-center flex flex-col items-center gap-4">
                <CheckCircle size={48} style={{ color: "var(--green-primary)" }} />
                <h3 className="font-fraunces text-2xl" style={{ fontWeight: 500, color: "var(--text-dark)" }}>
                  Pedido recebido!
                </h3>
                <p className="font-sans text-sm" style={{ color: "var(--text-muted)" }}>
                  Entraremos em contacto em 48h.
                </p>
                <button onClick={onClose} className="mt-2 px-5 py-2 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: "var(--green-primary)" }}>
                  Fechar
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-fraunces text-2xl mb-1" style={{ fontWeight: 500, color: "var(--text-dark)" }}>
                  Contratar {plano.name}
                </h3>
                <p className="text-xs font-sans mb-5" style={{ color: "var(--amber-accent)" }}>
                  ⚠️ Demonstração académica. Nenhum pagamento será processado.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  {[
                    { id: "nome", label: "Nome completo", type: "text", required: true },
                    { id: "email", label: "Email", type: "email", required: true },
                    { id: "telefone", label: "Telefone", type: "tel", required: true },
                    { id: "morada", label: "Morada", type: "text", required: true },
                  ].map(({ id, label, type, required }) => (
                    <div key={id}>
                      <label className="block text-xs font-sans mb-1" style={{ color: "var(--text-muted)" }}>
                        {label} {required && <span style={{ color: "var(--green-primary)" }}>*</span>}
                      </label>
                      <input
                        type={type}
                        {...register(id as keyof FormData, { required })}
                        className="w-full px-3 py-2 rounded-lg text-sm font-sans outline-none transition-colors"
                        style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-warm)", color: "var(--text-dark)" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green-primary)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = errors[id as keyof FormData] ? "#ef4444" : "var(--border)")}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-sans mb-1" style={{ color: "var(--text-muted)" }}>Mensagem</label>
                    <textarea
                      {...register("mensagem")}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg text-sm font-sans outline-none resize-none transition-colors"
                      style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-warm)", color: "var(--text-dark)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green-primary)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full text-sm font-medium text-white transition-opacity"
                    style={{ backgroundColor: "var(--green-primary)", opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    {isSubmitting ? "A enviar..." : "Enviar pedido"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
