import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MarinLogo } from "./MarinLogo";

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Propiedades", href: "#propiedades" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const WHATSAPP_URL = "https://wa.me/5491173610605";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-pro flex items-center justify-between h-[78px]">
        <a href="#inicio" aria-label="Marin Propiedades — inicio">
          <MarinLogo variant={scrolled ? "dark" : "light"} />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[0.78rem] font-medium tracking-[0.16em] uppercase transition-colors ${
                scrolled ? "text-foreground hover:text-navy" : "text-white/85 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-[0.72rem] font-semibold tracking-[0.18em] uppercase border transition-all ${
              scrolled
                ? "bg-navy text-white border-navy hover:bg-navy-deep"
                : "bg-white text-navy border-white hover:bg-transparent hover:text-white"
            }`}
          >
            WhatsApp
          </a>
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid place-items-center w-10 h-10"
          >
            <div className="flex flex-col gap-[5px]">
              <span className={`block h-px w-6 transition-all ${scrolled ? "bg-navy" : "bg-white"} ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 transition-all ${scrolled ? "bg-navy" : "bg-white"} ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 transition-all ${scrolled ? "bg-navy" : "bg-white"} ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white border-t border-line overflow-hidden"
          >
            <div className="container-pro py-6 flex flex-col gap-1">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium tracking-[0.16em] uppercase text-foreground border-b border-line last:border-0"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
