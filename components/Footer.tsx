"use client";

const links = [
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
  { label: "Simulador", href: "#simulador" },
  { label: "Empresas", href: "#empresas" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Contacto", href: "#contacto" },
];

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

const social = [
  { Icon: IconInstagram, label: "Instagram" },
  { Icon: IconLinkedIn, label: "LinkedIn" },
  { Icon: IconFacebook, label: "Facebook" },
];

function scrollTo(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: "var(--text-dark)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Logo + tagline */}
          <div>
            <div className="mb-2">
              <span className="font-fraunces text-2xl font-semibold text-white">Arik</span>
              <span className="block text-[11px] tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>
                Sistemas de Climatização
              </span>
            </div>
            <p className="text-sm font-sans" style={{ color: "rgba(255,255,255,0.5)" }}>
              Conforto térmico acessível para todos.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-sans uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
              Navegação
            </p>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
              {links.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-sm font-sans transition-colors"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-sans uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
              Redes sociais
            </p>
            <div className="flex gap-3">
              {social.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors text-white"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--green-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex flex-col sm:flex-row justify-between gap-3 text-xs font-sans"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            <p>© 2025 Arik Sistemas de Climatização, Lda. · NIF: 123 456 789 (ilustrativo) · Vila Nova de Famalicão</p>
            <p className="sm:text-right">
              Site desenvolvido para fins académicos — Projeto Aplicado de Gestão · Universidade Lusófona 2024/2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
