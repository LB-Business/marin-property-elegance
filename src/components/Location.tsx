import { motion } from "motion/react";

const WHATSAPP_URL = "https://wa.me/5491173610605";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Mariano+Castex+499+Sky+Center+Canning";

export function Location() {
  return (
    <section id="contacto" className="py-24 md:py-36 bg-white border-t border-line">
      <div className="container-pro grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow flex items-center gap-3"
          >
            <span className="h-px w-8 bg-navy" />
            Ubicación
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="headline-display text-[clamp(2rem,4vw,3.2rem)] mt-5"
          >
            Te esperamos en nuestra oficina en Canning.
          </motion.h2>

          <dl className="mt-10 space-y-7 text-foreground">
            <div>
              <dt className="text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold">Dirección</dt>
              <dd className="mt-2 text-lg leading-snug">
                Mariano Castex N°499<br />
                Oficina 409 — Sky Center<br />
                Canning, Buenos Aires
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold">WhatsApp</dt>
              <dd className="mt-2 text-lg">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-navy transition-colors">
                  +54 9 11 7361-0605
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold">Instagram</dt>
              <dd className="mt-2 text-lg">
                <a href="https://instagram.com/marinprop" target="_blank" rel="noopener noreferrer" className="hover:text-navy transition-colors">
                  @marinprop
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">
              Cómo llegar
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Contactar por WhatsApp
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-7 relative min-h-[420px] lg:min-h-[560px] bg-bone overflow-hidden border border-line"
        >
          <iframe
            title="Ubicación Marin Propiedades — Sky Center, Canning"
            src="https://www.google.com/maps?q=Mariano+Castex+499+Canning&output=embed"
            className="absolute inset-0 w-full h-full grayscale-[0.4] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
