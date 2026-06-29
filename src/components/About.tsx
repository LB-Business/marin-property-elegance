import { motion } from "motion/react";
import aboutImg from "@/assets/about-architecture.jpg";

const VALUES = [
  { n: "01", title: "Confianza", desc: "Relaciones de largo plazo, transparencia en cada decisión y compromiso real con cada cliente." },
  { n: "02", title: "Oportunidades", desc: "Lectura estratégica del mercado para detectar el momento y la propiedad adecuada." },
  { n: "03", title: "Valor", desc: "Generamos valor patrimonial transformando oportunidades en resultados concretos." },
];

export function About() {
  return (
    <section id="nosotros" className="py-24 md:py-36 bg-white">
      <div className="container-pro grid lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Text column */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow flex items-center gap-3"
          >
            <span className="h-px w-8 bg-navy" />
            Marin Propiedades
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="headline-display text-[clamp(2rem,4vw,3.4rem)] mt-6 max-w-2xl"
          >
            Una operación inmobiliaria es una decisión patrimonial.
          </motion.h2>

          <div className="mt-10 space-y-6 text-[1.02rem] leading-relaxed text-muted-foreground max-w-xl">
            {[
              "En Marin Propiedades entendemos que una operación inmobiliaria es mucho más que una compra o una venta: es una decisión que impacta en el patrimonio y en el futuro de nuestros clientes.",
              "Nuestra experiencia en el sector inmobiliario y en el desarrollo de proyectos nos permite brindar un asesoramiento integral, acompañando cada operación con una visión estratégica, comercial y financiera.",
              "Creemos en las relaciones de largo plazo, la transparencia y el compromiso con cada cliente. Trabajamos de manera personalizada, entendiendo las necesidades de cada persona, familia o inversor para encontrar la mejor oportunidad.",
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 text-lg md:text-xl font-medium text-navy max-w-md leading-snug"
          >
            Construimos confianza. Generamos oportunidades. Creamos valor.
          </motion.p>
        </div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={aboutImg}
              alt="Detalle arquitectónico contemporáneo"
              width={1280}
              height={1600}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/10" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-navy text-white p-6 max-w-[220px] hidden md:block">
            <div className="text-[0.6rem] tracking-[0.22em] uppercase text-white/60">Oficinas</div>
            <div className="mt-1 font-medium leading-tight">Sky Center, Canning</div>
          </div>
        </motion.div>
      </div>

      {/* Values */}
      <div className="container-pro mt-24 md:mt-32 grid md:grid-cols-3 gap-12 md:gap-8 border-t border-line pt-16">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="md:pr-8"
          >
            <div className="text-[0.7rem] tracking-[0.3em] text-muted-foreground font-semibold">{v.n}</div>
            <h3 className="mt-4 text-2xl font-medium text-navy">{v.title}</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
