import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import heroImg from "@/assets/hero-building.jpg";
import { IsotipoMark } from "./IsotipoMark";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);

  // 3D isotype motion
  const isoRotateY = useTransform(scrollYProgress, [0, 1], [0, 35]);
  const isoRotateX = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const isoY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const isoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.18, 0]);

  useEffect(() => {
    // gentle mouse-follow for the isotype on desktop
    if (reduce) return;
  }, [reduce]);

  return (
    <section id="inicio" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-navy text-white">
      {/* Background image with parallax */}
      <motion.div
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
        className="absolute inset-0 -z-10"
      >
        <img
          src={heroImg}
          alt="Edificio arquitectónico moderno en Canning"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Premium dark overlay */}
      <motion.div
        style={reduce ? { opacity: 0.7 } : { opacity: overlayOpacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy via-navy/70 to-navy"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_60%)]" />

      {/* Floating 3D isotype */}
      <motion.div
        style={reduce ? undefined : { rotateY: isoRotateY, rotateX: isoRotateX, y: isoY, opacity: isoOpacity }}
        className="hidden md:block absolute right-[6%] top-1/2 -translate-y-1/2 w-[42vw] max-w-[640px] aspect-[5/6] pointer-events-none"
        aria-hidden="true"
      >
        <IsotipoMark className="w-full h-full" color="rgba(255,255,255,0.85)" accent="rgba(255,255,255,0.45)" />
      </motion.div>

      <div className="container-pro relative z-10 flex flex-col justify-end min-h-[100svh] pt-40 pb-20">
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4 text-white/70 mb-10"
        >
          <span className="h-px w-12 bg-white/40" />
          <span className="text-[0.7rem] tracking-[0.32em] uppercase font-semibold">Canning · Buenos Aires</span>
        </motion.div>

        <h1 className="headline-display text-[clamp(2.4rem,6.4vw,5.6rem)] max-w-5xl">
          {["Propiedades,", "inversión y desarrollo", "en Canning."].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 max-w-xl text-base md:text-lg text-white/75 leading-relaxed font-light"
        >
          Asesoramiento inmobiliario integral para comprar, vender, alquilar o invertir
          con una visión estratégica, comercial y financiera.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="/propiedades" className="btn-base bg-white text-navy hover:bg-bone">
            Ver propiedades
            <span aria-hidden>→</span>
          </a>
          <a href="#contacto" className="btn-outline-light">
            Hablar con un asesor
          </a>
        </motion.div>

        {/* Bottom meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 border-t border-white/15 pt-8"
        >
          {[
            ["+15", "Años de experiencia"],
            ["+200", "Operaciones concretadas"],
            ["100%", "Asesoramiento integral"],
            ["Canning", "Y zona sur GBA"],
          ].map(([k, v]) => (
            <div key={v}>
              <div className="text-2xl md:text-3xl font-light tracking-tight">{k}</div>
              <div className="text-[0.7rem] mt-1 tracking-[0.18em] uppercase text-white/55">{v}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-8 bg-white/40"
        />
      </div>
    </section>
  );
}
