import { useState } from "react";
import { motion } from "motion/react";

const OPERACIONES = ["Comprar", "Alquilar", "Invertir"];
const TIPOS = ["Casa", "Departamento", "Lote", "Local", "Oficina"];
const ZONAS = ["Canning", "Ezeiza", "San Vicente", "Otros"];
const AMBIENTES = ["1", "2", "3", "4", "5+"];

const WHATSAPP_URL = "https://wa.me/5491173610605";

export function SearchBar() {
  const [op, setOp] = useState("Comprar");
  const [tipo, setTipo] = useState("");
  const [zona, setZona] = useState("");
  const [amb, setAmb] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hola Marin Propiedades, busco ${op.toLowerCase()} ${tipo || "una propiedad"}${zona ? ` en ${zona}` : ""}${amb ? `, ${amb} ambientes` : ""}.`;
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="relative -mt-16 md:-mt-20 z-20 container-pro">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white border border-line shadow-elevated p-6 md:p-8"
      >
        {/* Operation tabs */}
        <div className="flex flex-wrap gap-1 mb-6 border-b border-line">
          {OPERACIONES.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOp(o)}
              className={`px-5 py-3 text-[0.72rem] tracking-[0.18em] uppercase font-semibold transition-all relative ${
                op === o ? "text-navy" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {o}
              {op === o && (
                <motion.span
                  layoutId="op-underline"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-navy"
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FilterSelect label="Tipo" value={tipo} onChange={setTipo} options={TIPOS} />
          <FilterSelect label="Zona" value={zona} onChange={setZona} options={ZONAS} />
          <FilterSelect label="Ambientes" value={amb} onChange={setAmb} options={AMBIENTES} />
          <button type="submit" className="btn-primary h-full min-h-[58px]">
            Buscar
            <span aria-hidden>→</span>
          </button>
        </div>
      </motion.form>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block border border-line px-4 py-2.5 focus-within:border-navy transition-colors">
      <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-semibold">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm font-medium text-foreground outline-none mt-1 cursor-pointer"
      >
        <option value="">Todos</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
