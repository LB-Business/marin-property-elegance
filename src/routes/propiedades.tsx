import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const WHATSAPP_URL = "https://wa.me/5491173610605";

type Operation = "Todas" | "Venta" | "Alquiler";
type PropertyType = "Todos" | "Casa" | "Departamento" | "Lote" | "Desarrollo";

const PROPERTIES = [
  {
    id: 1,
    title: "Casa moderna en barrio privado",
    operation: "Venta",
    type: "Casa",
    zone: "Canning",
    price: "USD 285.000",
    rooms: "5 ambientes",
    area: "240 m² cubiertos",
    land: "720 m² lote",
    badge: "Destacada",
    description:
      "Propiedad de diseño contemporáneo con galería, parque, piscina y ambientes integrados.",
  },
  {
    id: 2,
    title: "Departamento premium con amenities",
    operation: "Venta",
    type: "Departamento",
    zone: "Canning",
    price: "USD 145.000",
    rooms: "3 ambientes",
    area: "86 m² cubiertos",
    land: "Cochera incluida",
    badge: "Oportunidad",
    description:
      "Unidad luminosa en complejo moderno, ideal para vivienda o inversión en zona de alta demanda.",
  },
  {
    id: 3,
    title: "Lote interno en zona residencial",
    operation: "Venta",
    type: "Lote",
    zone: "Ezeiza",
    price: "USD 78.000",
    rooms: "Lote",
    area: "900 m²",
    land: "Barrio consolidado",
    badge: "Inversión",
    description:
      "Excelente ubicación para construir vivienda familiar o proyecto de renta a largo plazo.",
  },
  {
    id: 4,
    title: "Casa llave en mano a estrenar",
    operation: "Venta",
    type: "Casa",
    zone: "San Vicente",
    price: "USD 220.000",
    rooms: "4 ambientes",
    area: "180 m² cubiertos",
    land: "650 m² lote",
    badge: "Llave en mano",
    description:
      "Proyecto terminado con terminaciones modernas, cocina integrada y espacios exteriores.",
  },
  {
    id: 5,
    title: "Propiedad familiar con parque",
    operation: "Alquiler",
    type: "Casa",
    zone: "Canning",
    price: "Consultar",
    rooms: "4 ambientes",
    area: "165 m² cubiertos",
    land: "Jardín y galería",
    badge: "Alquiler",
    description:
      "Casa funcional en zona tranquila, pensada para familias que buscan comodidad y ubicación.",
  },
  {
    id: 6,
    title: "Desarrollo residencial en preventa",
    operation: "Venta",
    type: "Desarrollo",
    zone: "Canning",
    price: "Desde USD 95.000",
    rooms: "Unidades 2 y 3 ambientes",
    area: "Desde 62 m²",
    land: "Entrega programada",
    badge: "Preventa",
    description:
      "Proyecto con unidades modernas, financiación y acompañamiento comercial integral.",
  },
];

export const Route = createFileRoute("/propiedades")({
  head: () => ({
    meta: [
      { title: "Propiedades | Marin Propiedades" },
      {
        name: "description",
        content:
          "Listado de propiedades de Marin Propiedades en Canning y Zona Sur. Casas, departamentos, lotes, desarrollos, ventas y alquileres.",
      },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const [operation, setOperation] = useState<Operation>("Todas");
  const [type, setType] = useState<PropertyType>("Todos");
  const [zone, setZone] = useState("Todas");
  const [search, setSearch] = useState("");

  const zones = useMemo(() => {
    return ["Todas", ...Array.from(new Set(PROPERTIES.map((p) => p.zone)))];
  }, []);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      const matchOperation = operation === "Todas" || property.operation === operation;
      const matchType = type === "Todos" || property.type === type;
      const matchZone = zone === "Todas" || property.zone === zone;
      const matchSearch =
        search.trim() === "" ||
        `${property.title} ${property.zone} ${property.description} ${property.type}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchOperation && matchType && matchZone && matchSearch;
    });
  }, [operation, type, zone, search]);

  return (
    <main className="bg-bone text-foreground min-h-screen">
      <Header />

      <section className="relative overflow-hidden bg-navy text-white pt-36 md:pt-44 pb-20 md:pb-28">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute right-[-8rem] top-24 hidden lg:block w-[32rem] h-[32rem] border border-white/10 rotate-45" />

        <div className="container-pro relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 text-white/60 mb-8"
          >
            <span className="h-px w-12 bg-white/30" />
            <span className="text-[0.7rem] tracking-[0.32em] uppercase font-semibold">
              Propiedades
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.05 }}
            className="headline-display text-[clamp(2.5rem,6vw,5.6rem)] max-w-5xl leading-[0.95]"
          >
            Encontrá la propiedad ideal para vivir, invertir o desarrollar.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="mt-8 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed font-light"
          >
            Explorá casas, departamentos, lotes y desarrollos seleccionados por
            Marin Propiedades en Canning y Zona Sur.
          </motion.p>
        </div>
      </section>

      <section className="relative -mt-12 pb-24 md:pb-32">
        <div className="container-pro">
          <div className="bg-white border border-line shadow-elevated p-5 md:p-7">
            <div className="grid md:grid-cols-5 gap-4">
              <label className="md:col-span-2">
                <span className="block text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold mb-2">
                  Buscar
                </span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Casa, lote, Canning..."
                  className="w-full h-12 border border-line bg-white px-4 text-sm outline-none focus:border-navy"
                />
              </label>

              <FilterSelect
                label="Operación"
                value={operation}
                onChange={(value) => setOperation(value as Operation)}
                options={["Todas", "Venta", "Alquiler"]}
              />

              <FilterSelect
                label="Tipo"
                value={type}
                onChange={(value) => setType(value as PropertyType)}
                options={["Todos", "Casa", "Departamento", "Lote", "Desarrollo"]}
              />

              <FilterSelect
                label="Zona"
                value={zone}
                onChange={setZone}
                options={zones}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="text-[0.7rem] tracking-[0.24em] uppercase text-muted-foreground font-semibold">
                Resultados
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl font-light tracking-tight text-navy">
                {filteredProperties.length} propiedades encontradas
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                setOperation("Todas");
                setType("Todos");
                setZone("Todas");
                setSearch("");
              }}
              className="text-sm font-semibold tracking-[0.16em] uppercase text-navy border-b border-navy w-fit"
            >
              Limpiar filtros
            </button>
          </div>

          <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="mt-12 bg-white border border-line p-10 text-center">
              <h3 className="text-2xl font-light text-navy">
                No encontramos propiedades con esos filtros.
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Probá cambiando la búsqueda o consultanos por WhatsApp para recibir opciones personalizadas.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
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
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label>
      <span className="block text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold mb-2">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full h-12 border border-line bg-white px-4 text-sm outline-none focus:border-navy"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function PropertyCard({
  property,
  index,
}: {
  property: (typeof PROPERTIES)[number];
  index: number;
}) {
  const consultarUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(
    `Hola Marin Propiedades, quiero consultar por esta propiedad: ${property.title} en ${property.zone}.`
  )}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.05 }}
      className="group bg-white border border-line overflow-hidden hover:shadow-elevated transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,36,66,1),rgba(42,64,95,0.92))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />

        <div className="absolute left-5 top-5 bg-white text-navy px-3 py-1.5 text-[0.65rem] tracking-[0.18em] uppercase font-semibold">
          {property.badge}
        </div>

        <div className="absolute left-5 right-5 bottom-5">
          <div className="text-white/55 text-[0.7rem] tracking-[0.22em] uppercase font-semibold">
            {property.operation} · {property.type}
          </div>
          <div className="mt-2 text-white text-2xl font-light tracking-tight">
            {property.zone}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-5">
          <h3 className="text-2xl font-light tracking-tight text-navy">
            {property.title}
          </h3>
          <div className="text-right text-navy font-semibold whitespace-nowrap">
            {property.price}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {property.description}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5">
          {[property.rooms, property.area, property.land].map((item) => (
            <div key={item} className="text-xs leading-relaxed text-muted-foreground">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <a
            href={consultarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Consultar
          </a>

          <a
            href={consultarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.7rem] tracking-[0.18em] uppercase font-semibold text-navy border-b border-navy"
          >
            Ver detalle
          </a>
        </div>
      </div>
    </motion.article>
  );
}