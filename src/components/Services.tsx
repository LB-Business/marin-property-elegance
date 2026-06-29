import { motion } from "motion/react";

const WHATSAPP_URL = "https://wa.me/5491173610605";

const SERVICES = [
  {
    title: "Compra y venta",
    desc: "Asesoramiento integral en todo el ciclo de la operación, desde la valuación hasta la escritura.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <path d="M6 42V20L24 6L42 20V42H30V28H18V42H6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Alquileres",
    desc: "Gestión profesional para propietarios e inquilinos, con foco en la rentabilidad y la tranquilidad.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <rect x="8" y="14" width="32" height="28" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M16 14V8M32 14V8M8 22H40" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    title: "Tasaciones",
    desc: "Valuaciones precisas basadas en datos reales del mercado de Canning y zona sur.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <path d="M8 40L20 28M20 28L28 36L40 24M20 28L28 20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/>
        <circle cx="32" cy="14" r="4" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    title: "Inversiones y desarrollos",
    desc: "Análisis de oportunidades con visión estratégica, comercial y financiera para potenciar tu patrimonio.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <path d="M6 42H42M10 42V26M20 42V18M30 42V10M40 42V22" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/>
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-24 md:py-36 bg-white border-t border-line">
      <div className="container-pro">
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow flex items-center gap-3"
          >
            <span className="h-px w-8 bg-navy" />
            Servicios
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="headline-display text-[clamp(2rem,4.4vw,3.6rem)] mt-5"
          >
            Acompañamos cada operación con criterio y experiencia.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white p-8 md:p-10 group hover:bg-bone transition-colors duration-500 flex flex-col"
            >
              <div className="text-navy">{s.icon}</div>
              <h3 className="mt-8 text-xl font-medium text-foreground">{s.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">{s.desc}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.22em] uppercase font-semibold text-navy"
              >
                <span className="border-b border-navy/30 group-hover:border-navy pb-0.5 transition-colors">Consultar</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
