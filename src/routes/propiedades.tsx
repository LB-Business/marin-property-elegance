import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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

type PropertiesSearch = {
  tipo?: string;
};

const DEFAULT_PROPERTY_TYPES: PropertyType[] = [
  "casa",
  "departamento",
  "terreno",
  "lote",
  "local",
  "oficina",
  "galpon",
  "campo",
  "ph",
  "duplex",
  "desarrollo",
  "construccion",
  "otro",
];

export const Route = createFileRoute("/propiedades")({
  validateSearch: (
    search: Record<string, unknown>
  ): PropertiesSearch => ({
    tipo:
      typeof search.tipo === "string" &&
      search.tipo.trim() !== ""
        ? search.tipo.trim().toLowerCase()
        : undefined,
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const { tipo } = Route.useSearch();
  const navigate = Route.useNavigate();

  const initialPropertyType: PropertyType | "Todos" =
    tipo || "Todos";

  const [search, setSearch] = useState("");
  const [operationType, setOperationType] = useState<
    PropertyOperationType | "Todas"
  >("Todas");
  const [propertyType, setPropertyType] = useState<
    PropertyType | "Todos"
  >(initialPropertyType);
  const [zone, setZone] = useState("Todas");

  useEffect(() => {
    setPropertyType(tipo || "Todos");
  }, [tipo]);

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
    const apiPropertyTypes = propertyTypes.filter(
      (type) => normalizeValue(type) !== "todos"
    );

    const selectedPropertyType =
      propertyType !== "Todos"
        ? [propertyType]
        : [];

    const uniqueValues = Array.from(
      new Set([
        ...DEFAULT_PROPERTY_TYPES,
        ...apiPropertyTypes,
        ...selectedPropertyType,
      ])
    );

    return [
      "Todos",
      ...uniqueValues.sort((a, b) =>
        formatPropertyType(a).localeCompare(
          formatPropertyType(b),
          "es",
          {
            sensitivity: "base",
          }
        )
      ),
    ];
  }, [propertyTypes, propertyType]);

  const sortedZones = useMemo(() => {
    const values = zones.filter(
      (item) =>
        normalizeValue(item) !== "todos" &&
        normalizeValue(item) !== "todas"
    );

    return [
      "Todas",
      ...Array.from(new Set(values)).sort((a, b) =>
        a.localeCompare(b, "es", {
          sensitivity: "base",
        })
      ),
    ];
  }, [zones]);

  const isConstructionFilter =
    normalizeValue(propertyType) === "construccion";

  const hasFilters =
    search.trim() !== "" ||
    operationType !== "Todas" ||
    propertyType !== "Todos" ||
    zone !== "Todas";

  const resultText = useMemo(() => {
    if (loading) {
      return isConstructionFilter
        ? "Cargando construcciones..."
        : "Cargando propiedades...";
    }

    if (filteredProperties.length === 1) {
      return isConstructionFilter
        ? "1 construcción encontrada"
        : "1 propiedad encontrada";
    }

    return isConstructionFilter
      ? `${filteredProperties.length} construcciones encontradas`
      : `${filteredProperties.length} propiedades encontradas`;
  }, [
    filteredProperties.length,
    loading,
    isConstructionFilter,
  ]);

  function handlePropertyTypeChange(
    value: PropertyType | "Todos"
  ) {
    setPropertyType(value);

    navigate({
      search:
        value === "Todos"
          ? {}
          : {
              tipo: value,
            },
      replace: true,
    });
  }

  function clearFilters() {
    setSearch("");
    setOperationType("Todas");
    setPropertyType("Todos");
    setZone("Todas");

    navigate({
      search: {},
      replace: true,
    });
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

              {isConstructionFilter
                ? "Construcciones"
                : "Propiedades"}
            </div>

            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <h1 className="headline-display text-[clamp(2.4rem,5.5vw,5rem)] max-w-4xl leading-[0.95] text-navy">
                  {isConstructionFilter
                    ? "Construcciones disponibles"
                    : "Propiedades disponibles"}
                </h1>

                <p className="mt-6 max-w-2xl text-muted-foreground text-base md:text-lg leading-relaxed">
                  {isConstructionFilter
                    ? "Explorá los proyectos y obras publicados por Marin Propiedades. Los datos se actualizan automáticamente desde LB Business."
                    : "Explorá las propiedades publicadas por Marin Propiedades. Los datos se actualizan automáticamente desde LB Business."}
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
            transition={{
              duration: 0.65,
              delay: 0.08,
            }}
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
                  <option value="Todas">
                    Todas
                  </option>

                  <option value="venta">
                    Venta
                  </option>

                  <option value="alquiler">
                    Alquiler
                  </option>

                  <option value="temporario">
                    Temporario
                  </option>

                  <option value="alquiler_temporario">
                    Alquiler temporario
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
                    handlePropertyTypeChange(
                      event.target.value as
                        | PropertyType
                        | "Todos"
                    )
                  }
                  className="h-12 w-full border border-line bg-white px-4 text-sm outline-none transition focus:border-navy disabled:cursor-wait disabled:opacity-60"
                >
                  {sortedPropertyTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                    >
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
                    <option
                      key={item}
                      value={item}
                    >
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
                No pudimos cargar la información.
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
                  {isConstructionFilter
                    ? "Todavía no hay construcciones publicadas."
                    : "No encontramos propiedades con esos filtros."}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  {isConstructionFilter
                    ? "Próximamente vas a poder conocer nuestros proyectos y obras."
                    : "Probá modificando la búsqueda o consultanos por WhatsApp."}
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
    construccion: "Construcción",
    "fraccion de terreno": "Fracción de terreno",
    "fraccion terreno": "Fracción de terreno",
    otro: "Otro",
  };

  return (
    labels[normalized] ||
    formatGenericLabel(propertyType)
  );
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