import { motion } from "motion/react";

const WHATSAPP_URL = "https://wa.me/5491173610605";

export function FinalCTA() {
  return (
    <section className="relative py-28 md:py-40 surface-navy overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]" />
      <div className="container-pro relative text-center max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="headline-display text-[clamp(2.2rem,5.6vw,5rem)] text-white"
        >
          ¿Estás buscando comprar, vender o invertir?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light"
        >
          En Marin Propiedades te acompañamos con asesoramiento personalizado
          y visión estratégica.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-base bg-white text-navy hover:bg-bone">
            Hablar por WhatsApp
          </a>
          <a href="#propiedades" className="btn-outline-light">
            Ver propiedades
          </a>
        </motion.div>
      </div>
    </section>
  );
}
