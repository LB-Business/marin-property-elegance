import { motion } from "motion/react";

const WHATSAPP_URL =
  "https://wa.me/5491173610605?text=Hola%20Marin%20Propiedades%2C%20quiero%20consultar%20por%20el%20servicio%20de%20construcci%C3%B3n%20llave%20en%20mano.";

const STEPS = [
  {
    title: "Proyecto",
    text: "Definimos necesidades, estilo, presupuesto y objetivos para transformar la idea inicial en una propuesta concreta.",
  },
  {
    title: "Planificación",
    text: "Coordinamos etapas, tiempos, materiales, proveedores y documentación para ordenar todo el proceso de obra.",
  },
  {
    title: "Ejecución",
    text: "Acompañamos la construcción con seguimiento profesional, control de avances y foco en calidad de terminaciones.",
  },
  {
    title: "Entrega",
    text: "El objetivo es que el cliente reciba una solución integral, lista para habitar, invertir o comercializar.",
  },
];

export function Construction() {
  return (
    <section
      id="construcciones"
      className="relative overflow-hidden py-24 md:py-36 bg-navy text-white border-t border-white/10"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_55%)]" />

      <div className="absolute -right-24 top-20 hidden lg:block w-[34rem] h-[34rem] border border-white/10 rotate-45" />

      <div className="absolute right-24 bottom-16 hidden lg:block w-64 h-64 bg-white/[0.035] rotate-45" />

      <div className="container-pro relative z-10">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-4 text-white/60 mb-8"
            >
              <span className="h-px w-12 bg-white/30" />

              <span className="text-[0.7rem] tracking-[0.32em] uppercase font-semibold">
                Construcciones
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="headline-display text-[clamp(2.2rem,4.8vw,4.9rem)] leading-[0.95] max-w-3xl"
            >
              Llave en mano para vivir, invertir o desarrollar.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="mt-8 text-base md:text-lg leading-relaxed text-white/70 font-light max-w-xl"
            >
              Acompañamos proyectos de construcción desde la planificación hasta
              la entrega final, integrando visión inmobiliaria, comercial y de
              desarrollo para que cada decisión tenga sentido patrimonial.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.18 }}
              className="mt-10 flex flex-col items-start gap-4"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base bg-white text-navy hover:bg-bone"
              >
                Consultar proyecto
                <span aria-hidden>→</span>
              </a>

              <a
                href="#contacto"
                className="btn-outline-light"
              >
                Hablar con un asesor
              </a>

              <a
                href="/propiedades?tipo=construccion"
                className="btn-outline-light"
              >
                Ver construcciones
                <span aria-hidden>→</span>
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-4">
              {STEPS.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                  }}
                  className="group min-h-[230px] border border-white/12 bg-white/[0.045] p-7 md:p-8 hover:bg-white/[0.075] transition-colors"
                >
                  <div className="flex items-center justify-between mb-10">
                    <span className="text-[0.7rem] tracking-[0.26em] uppercase text-white/45 font-semibold">
                      0{index + 1}
                    </span>

                    <span className="h-px w-10 bg-white/20 group-hover:w-16 transition-all" />
                  </div>

                  <h3 className="text-2xl font-light tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-sm leading-relaxed text-white/62">
                    {item.text}
                  </p>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 border border-white/12 bg-white text-navy p-7 md:p-9 grid md:grid-cols-[1fr_auto] gap-8 items-center"
            >
              <div>
                <div className="text-[0.68rem] tracking-[0.28em] uppercase text-navy/55 font-semibold mb-4">
                  Servicio integral
                </div>

                <h3 className="text-2xl md:text-3xl font-light tracking-tight">
                  Ideal para clientes que buscan construir sin ocuparse de toda
                  la gestión técnica y operativa.
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6 md:gap-8 text-center md:text-left">
                <div>
                  <div className="text-3xl font-light">
                    360°
                  </div>

                  <div className="mt-1 text-[0.65rem] tracking-[0.18em] uppercase text-navy/50">
                    Gestión
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-light">
                    1
                  </div>

                  <div className="mt-1 text-[0.65rem] tracking-[0.18em] uppercase text-navy/50">
                    Equipo
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}