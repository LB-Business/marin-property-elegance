import { motion } from "motion/react";

const STEPS = [
  { n: "01", title: "Escuchamos tu objetivo", desc: "Entendemos qué buscás, en qué momento estás y cuáles son tus prioridades reales." },
  { n: "02", title: "Analizamos la oportunidad", desc: "Estudiamos el mercado, la propiedad y las variables comerciales y financieras." },
  { n: "03", title: "Diseñamos una estrategia", desc: "Definimos el mejor camino para alcanzar el resultado en tiempo y forma." },
  { n: "04", title: "Acompañamos la operación", desc: "Trabajamos a tu lado en cada etapa, con información clara y disponibilidad real." },
  { n: "05", title: "Cerramos con seguridad", desc: "Garantizamos transparencia, cumplimiento y respaldo jurídico hasta la escritura." },
];

export function Process() {
  return (
    <section className="py-24 md:py-36 bg-bone">
      <div className="container-pro">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow flex items-center gap-3"
            >
              <span className="h-px w-8 bg-navy" />
              Cómo trabajamos
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="headline-display text-[clamp(2rem,4vw,3.4rem)] mt-5"
            >
              Un proceso claro, sin sorpresas.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 lg:col-start-7 text-muted-foreground leading-relaxed self-end"
          >
            Cada operación inmobiliaria es única. Por eso adaptamos nuestro proceso a cada cliente,
            manteniendo el mismo nivel de rigor profesional, transparencia y acompañamiento real
            en cinco etapas claras.
          </motion.p>
        </div>

        <ol className="relative">
          <span className="absolute left-0 right-0 top-[1px] h-px bg-line hidden md:block" />
          <div className="grid md:grid-cols-5 md:gap-px">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative bg-bone pt-10 md:pt-14 pb-4 md:px-5 border-t border-line md:border-t-0"
              >
                <span className="hidden md:block absolute -top-[5px] left-0 w-2.5 h-2.5 bg-navy" />
                <div className="text-[0.7rem] tracking-[0.3em] font-semibold text-navy">{s.n}</div>
                <h3 className="mt-4 text-lg font-medium leading-snug text-foreground">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.li>
            ))}
          </div>
        </ol>
      </div>
    </section>
  );
}
