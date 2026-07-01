import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { PropertyCard } from "@/components/PropertyCard";
import { useMarinProperties } from "@/hooks/useMarinProperties";

export const Route = createFileRoute("/propiedades")({
  component: PropertiesPage,
});

function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [operationType, setOperationType] = useState("Todas");
  const [propertyType, setPropertyType] = useState("Todos");
  const [zone, setZone] = useState("Todas");

  const {
    filteredProperties,
    zones,
    propertyTypes,
    loading,
    error,
  } = useMarinProperties({
    search,
    operationType,
    propertyType,
    zone,
  });

  const hasFilters =
    search.trim() !== "" ||
    operationType !== "Todas" ||
    propertyType !== "Todos" ||
    zone !== "Todas";

  function clearFilters() {
    setSearch("");
    setOperationType("Todas");
    setPropertyType("Todos");
    setZone("Todas");
  }

  return (
    <main className="min-h-screen bg-bone text-foreground">
      <Header />

      <section className="pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="container-pro">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-12"
          >
            <div className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-navy" />
              Propiedades
            </div>

            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <h1 className="headline-display text-[clamp(2.4rem,5.5vw,5rem)] max-w-4xl leading-[0.95] text-navy">
                  Propiedades disponibles
                </h1>

                <p className="mt-6 max-w-2xl text-muted-foreground text-base md:text-lg leading-relaxed">
                  Explorá las propiedades publicadas por Marin Propiedades.
                  Los datos se actualizan automáticamente desde LB Business.
                </p>
              </div>

              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[0.75rem] tracking-[0.24em] uppercase font-semibold text-navy border-b border-navy w-fit"
                >
                  Limpiar filtros
                </button>
              ) : null}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="bg-white border border-line shadow-sm p-5 md:p-7 mb-12"
          >
            <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
              <label>
                <span className="block mb-2 text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
                  Buscar
                </span>

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por título, zona o ciudad..."
                  className="h-12 w-full border border-line bg-white px-4 text-sm outline-none transition focus:border-navy"
                />
              </label>

              <label>
                <span className="block mb-2 text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
                  Operación
                </span>

                <select
                  value={operationType}
                  onChange={(event) => setOperationType(event.target.value)}
                  className="h-12 w-full border border-line bg-white px-4 text-sm outline-none transition focus:border-navy"
                >
                  <option value="Todas">Todas</option>
                  <option value="venta">Venta</option>
                  <option value="alquiler">Alquiler</option>
                  <option value="temporario">Temporario</option>
                </select>
              </label>

              <label>
                <span className="block mb-2 text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
                  Tipo
                </span>

                <select
                  value={propertyType}
                  onChange={(event) => setPropertyType(event.target.value)}
                  className="h-12 w-full border border-line bg-white px-4 text-sm outline-none transition focus:border-navy"
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "Todos" ? "Todos" : formatPropertyType(type)}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="block mb-2 text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
                  Zona
                </span>

                <select
                  value={zone}
                  onChange={(event) => setZone(event.target.value)}
                  className="h-12 w-full border border-line bg-white px-4 text-sm outline-none transition focus:border-navy"
                >
                  {zones.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </motion.div>

          <div className="mb-10 flex items-center justify-between gap-6">
            <h2 className="headline-display text-[clamp(2rem,4vw,3.2rem)] text-navy">
              {loading
                ? "Cargando propiedades..."
                : `${filteredProperties.length} propiedades encontradas`}
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-[560px] bg-white border border-line animate-pulse"
                />
              ))}
            </div>
          ) : null}

          {!loading && error ? (
            <div className="bg-white border border-line p-10 text-center">
              <h3 className="text-2xl font-light text-navy">
                No pudimos cargar las propiedades.
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                {error}
              </p>
            </div>
          ) : null}

          {!loading && !error && filteredProperties.length === 0 ? (
            <div className="bg-white border border-line p-10 text-center">
              <h3 className="text-2xl font-light text-navy">
                No encontramos propiedades con esos filtros.
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                Probá modificando la búsqueda o consultanos por WhatsApp.
              </p>
            </div>
          ) : null}

          {!loading && !error && filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  index={index}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

function formatPropertyType(propertyType?: string) {
  const labels: Record<string, string> = {
    casa: "Casa",
    departamento: "Departamento",
    terreno: "Terreno",
    lote: "Lote",
    local: "Local",
    oficina: "Oficina",
    galpon: "Galpón",
    campo: "Campo",
    ph: "PH",
    duplex: "Dúplex",
    desarrollo: "Desarrollo",
    otro: "Propiedad",
  };

  return labels[propertyType || ""] || propertyType || "Propiedad";
}