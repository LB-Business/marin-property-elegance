import { motion } from "motion/react";
import { IsotipoMark } from "./IsotipoMark";

const WHATSAPP_URL = "https://wa.me/5491173610605?text=Hola%2C%20quiero%20recibir%20oportunidades%20de%20inversi%C3%B3n.";

export function Investment() {
  return (
    <section className="relative py-28 md:py-40 surface-navy overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]"
      />
      <motion.div
        initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
        whileInView={{ opacity: 0.08, rotate: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-20 -bottom-20 md:right-[5%] md:bottom-[-10%] w-[480px] md:w-[640px] aspect-[5/6] pointer-events-none"
      >
        <IsotipoMark className="w-full h-full" color="white" accent="white" />
      </motion.div>

      <div className="container-pro relative z-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[0.72rem] tracking-[0.3em] uppercase font-semibold text-white/60 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-white/40" />
            Inversión inmobiliaria
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="headline-display text-[clamp(2.2rem,5.4vw,4.8rem)] mt-6 text-white"
          >
            Invertí con visión estratégica.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 max-w-xl text-white/75 text-lg leading-relaxed font-light"
          >
            Analizamos oportunidades inmobiliarias desde una mirada comercial, financiera
            y patrimonial para ayudarte a tomar mejores decisiones, en el momento adecuado
            y con respaldo profesional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base bg-white text-navy hover:bg-bone"
            >
              Quiero recibir oportunidades
              <span aria-hidden>→</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-6 border-t border-white/15 pt-8 max-w-xl"
          >
            {[
              ["Comercial", "Lectura del mercado"],
              ["Financiera", "Análisis de retorno"],
              ["Patrimonial", "Visión de largo plazo"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="text-white font-medium">{k}</div>
                <div className="text-[0.7rem] mt-1 tracking-[0.18em] uppercase text-white/50">{v}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
