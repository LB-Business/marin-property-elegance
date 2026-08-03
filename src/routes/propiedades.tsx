import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { PropertyCard } from "@/components/PropertyCard";
import { useMarinProperties } from "@/hooks/useMarinProperties";

import type {
  PropertyOperationType,
  PropertyType,
} from "@/types/property";

export const Route = createFileRoute("/propiedades")({
  component: PropertiesPage,
});

function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [operationType, setOperationType] = useState<
    PropertyOperationType | "Todas"
  >("Todas");
  const [propertyType, setPropertyType] = useState<
    PropertyType | "Todos"
  >("Todos");
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

  const sortedPropertyTypes = useMemo(() => {
    const values = propertyTypes.filter(
      (type) => normalizeValue(type) !== "todos"
    );

    return [
      "Todos",
      ...values.sort((a, b) =>
        formatPropertyType(a).localeCompare(
          formatPropertyType(b),
          "es",
          {
            sensitivity: "base",
          }
        )
      ),
    ];
  }, [propertyTypes]);

  const sortedZones = useMemo(() => {
    const values = zones.filter(
      (item) =>
        normalizeValue(item) !== "todos" &&
        normalizeValue(item) !== "todas"
    );

    return [
      "Todas",
      ...values.sort((a, b) =>
        a.localeCompare(b, "es", {
          sensitivity: "base",
        })
      ),
    ];
  }, [zones]);

  const hasFilters =
    search.trim() !== "" ||
    operationType !== "Todas" ||
    propertyType !== "Todos" ||
    zone !== "Todas";

  const resultText = useMemo(() => {
    if (loading) {
      return "Cargando propiedades...";
    }

    if (filteredProperties.length === 1) {
      return "1 propiedad encontrada";
    }

    return `${filteredProperties.length} propiedades encontradas`;
  }, [filteredProperties.length, loading]);

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

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[0.75rem] tracking-[0.24em] uppercase font-semibold text-navy border-b border-navy w-fit"
                >
                  Limpiar filtros
                </button>
              )}
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
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
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
                  onChange={(event) =>
                    setOperationType(
                      event.target.value as
                        | PropertyOperationType
                        | "Todas"
                    )
                  }
                  className="h-12 w-full border border-line bg-white px-4 text-sm outline-none transition focus:border-navy"
                >
                  <option value="Todas">Todas</option>
                  <option value="venta">Venta</option>
                  <option value="alquiler">Alquiler</option>
                  <option value="temporario">
                    Temporario
                  </option>
                </select>
              </label>

              <label>
                <span className="block mb-2 text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
                  Tipo
                </span>

                <select
                  value={propertyType}
                  disabled={loading}
                  onChange={(event) =>
                    setPropertyType(
                      event.target.value as
                        | PropertyType
                        | "Todos"
                    )
                  }
                  className="h-12 w-full border border-line bg-white px-4 text-sm outline-none transition focus:border-navy disabled:cursor-wait disabled:opacity-60"
                >
                  {sortedPropertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "Todos"
                        ? "Todos"
                        : formatPropertyType(type)}
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
                  disabled={loading}
                  onChange={(event) =>
                    setZone(event.target.value)
                  }
                  className="h-12 w-full border border-line bg-white px-4 text-sm outline-none transition focus:border-navy disabled:cursor-wait disabled:opacity-60"
                >
                  {sortedZones.map((item) => (
                    <option key={item} value={item}>
                      {item === "Todas"
                        ? "Todas"
                        : formatGenericLabel(item)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </motion.div>

          <div className="mb-10 flex items-center justify-between gap-6">
            <h2 className="headline-display text-[clamp(2rem,4vw,3.2rem)] text-navy">
              {resultText}
            </h2>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-[560px] bg-white border border-line animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="bg-white border border-line p-10 text-center">
              <h3 className="text-2xl font-light text-navy">
                No pudimos cargar las propiedades.
              </h3>

              <p className="mt-3 text-sm text-muted-foreground">
                {error}
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            filteredProperties.length === 0 && (
              <div className="bg-white border border-line p-10 text-center">
                <h3 className="text-2xl font-light text-navy">
                  No encontramos propiedades con esos filtros.
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  Probá modificando la búsqueda o consultanos por
                  WhatsApp.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            filteredProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProperties.map(
                  (property, index) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      index={index}
                    />
                  )
                )}
              </div>
            )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

function formatPropertyType(propertyType?: string) {
  if (!propertyType) {
    return "Propiedad";
  }

  const normalized = normalizeValue(propertyType);

  const labels: Record<string, string> = {
    casa: "Casa",
    departamento: "Departamento",
    terreno: "Terreno",
    lote: "Lote",
    local: "Local",
    oficina: "Oficina",
    galpon: "Galpón",
    "galpon logistico": "Galpón Logístico",
    campo: "Campo",
    ph: "PH",
    duplex: "Dúplex",
    desarrollo: "Desarrollo",
    "fraccion de terreno": "Fracción de terreno",
    "fraccion terreno": "Fracción de terreno",
    otro: "Otro",
  };

  return labels[normalized] || formatGenericLabel(propertyType);
}

function normalizeValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function formatGenericLabel(value: string) {
  return value
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\b\p{L}/gu, (letter) =>
      letter.toUpperCase()
    );
}