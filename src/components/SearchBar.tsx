import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { useMarinProperties } from "@/hooks/useMarinProperties";

const OPERACIONES = [
  "Comprar",
  "Alquilar",
  "Invertir",
];

const DEFAULT_PROPERTY_TYPES = [
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
];

const AMBIENTES = [
  "1",
  "2",
  "3",
  "4",
  "5+",
];

type SelectOption = {
  value: string;
  label: string;
};

export function SearchBar() {
  const [operation, setOperation] =
    useState("Comprar");
  const [propertyType, setPropertyType] =
    useState("");
  const [zone, setZone] = useState("");
  const [rooms, setRooms] = useState("");

  const {
    propertyTypes,
    zones,
    loading,
  } = useMarinProperties();

  const typeOptions = useMemo<
    SelectOption[]
  >(() => {
    const apiTypes = propertyTypes.filter(
      (type) => {
        const normalized =
          normalizeValue(type);

        return (
          normalized !== "todos" &&
          normalized !== "todas"
        );
      }
    );

    return Array.from(
      new Set([
        ...DEFAULT_PROPERTY_TYPES,
        ...apiTypes,
      ])
    )
      .map((type) => ({
        value: type,
        label: formatPropertyType(type),
      }))
      .sort((a, b) =>
        a.label.localeCompare(b.label, "es", {
          sensitivity: "base",
        })
      );
  }, [propertyTypes]);

  const zoneOptions = useMemo<
    SelectOption[]
  >(() => {
    return zones
      .filter((propertyZone) => {
        const normalized =
          normalizeValue(propertyZone);

        return (
          normalized !== "todos" &&
          normalized !== "todas"
        );
      })
      .map((propertyZone) => ({
        value: propertyZone,
        label: formatLabel(propertyZone),
      }))
      .sort((a, b) =>
        a.label.localeCompare(b.label, "es", {
          sensitivity: "base",
        })
      );
  }, [zones]);

  const roomOptions = useMemo<
    SelectOption[]
  >(() => {
    return AMBIENTES.map((value) => ({
      value,
      label:
        value === "1"
          ? "1 ambiente"
          : value === "5+"
            ? "5 o más"
            : `${value} ambientes`,
    }));
  }, []);

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const params = new URLSearchParams();

    const operationValue =
      operation === "Alquilar"
        ? "alquiler"
        : "venta";

    params.set(
      "operacion",
      operationValue
    );

    if (propertyType) {
      params.set("tipo", propertyType);
    }

    if (zone) {
      params.set("zona", zone);
    }

    if (rooms) {
      params.set("ambientes", rooms);
    }

    window.location.assign(
      `/propiedades?${params.toString()}`
    );
  }

  return (
    <section className="relative -mt-16 md:-mt-20 z-20 container-pro">
      <motion.form
        onSubmit={handleSubmit}
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-80px",
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="bg-white border border-line shadow-elevated p-6 md:p-8"
      >
        <div className="flex flex-wrap gap-1 mb-6 border-b border-line">
          {OPERACIONES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setOperation(item)
              }
              className={`px-5 py-3 text-[0.72rem] tracking-[0.18em] uppercase font-semibold transition-all relative ${
                operation === item
                  ? "text-navy"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}

              {operation === item && (
                <motion.span
                  layoutId="op-underline"
                  className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-navy"
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FilterSelect
            label="Tipo"
            value={propertyType}
            onChange={setPropertyType}
            options={typeOptions}
            disabled={loading}
            loadingText="Cargando tipos..."
          />

          <FilterSelect
            label="Zona"
            value={zone}
            onChange={setZone}
            options={zoneOptions}
            disabled={loading}
            loadingText="Cargando zonas..."
          />

          <FilterSelect
            label="Ambientes"
            value={rooms}
            onChange={setRooms}
            options={roomOptions}
          />

          <button
            type="submit"
            className="btn-primary h-full min-h-[58px]"
          >
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
  disabled = false,
  loadingText,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  loadingText?: string;
}) {
  return (
    <label className="block border border-line px-4 py-2.5 focus-within:border-navy transition-colors">
      <span className="block text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-semibold">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        disabled={disabled}
        className="w-full bg-transparent text-sm font-medium text-foreground outline-none mt-1 cursor-pointer disabled:cursor-wait disabled:opacity-60"
      >
        <option value="">
          {disabled && loadingText
            ? loadingText
            : "Todos"}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function formatPropertyType(value: string) {
  const normalized = normalizeValue(value);

  const labels: Record<string, string> = {
    casa: "Casa",
    departamento: "Departamento",
    terreno: "Terreno",
    lote: "Lote",
    local: "Local",
    oficina: "Oficina",
    galpon: "Galpón",
    "galpon logistico":
      "Galpón Logístico",
    "fraccion de terreno":
      "Fracción de terreno",
    campo: "Campo",
    ph: "PH",
    duplex: "Dúplex",
    desarrollo: "Desarrollo",
    construccion: "Construcción",
    otro: "Otro",
  };

  return (
    labels[normalized] ||
    formatLabel(value)
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

function formatLabel(value: string) {
  return value
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/\b\p{L}/gu, (letter) =>
      letter.toUpperCase()
    );
}