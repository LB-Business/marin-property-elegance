import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { useMarinProperties } from "@/hooks/useMarinProperties";

const OPERACIONES = ["Comprar", "Alquilar", "Invertir"];
const AMBIENTES = ["1", "2", "3", "4", "5+"];

const WHATSAPP_URL = "https://wa.me/5491173610605";

type SelectOption = {
  value: string;
  label: string;
};

export function SearchBar() {
  const [op, setOp] = useState("Comprar");
  const [tipo, setTipo] = useState("");
  const [zona, setZona] = useState("");
  const [amb, setAmb] = useState("");

  const {
    propertyTypes,
    zones,
    loading,
  } = useMarinProperties();

  const typeOptions = useMemo<SelectOption[]>(() => {
    return propertyTypes
      .filter((propertyType) => {
        const normalizedValue = propertyType.trim().toLowerCase();

        return normalizedValue !== "todos" && normalizedValue !== "todas";
      })
      .map((propertyType) => ({
        value: propertyType,
        label: formatPropertyType(propertyType),
      }))
      .sort((a, b) =>
        a.label.localeCompare(b.label, "es", {
          sensitivity: "base",
        })
      );
  }, [propertyTypes]);

  const zoneOptions = useMemo<SelectOption[]>(() => {
    return zones
      .filter((propertyZone) => {
        const normalizedValue = propertyZone.trim().toLowerCase();

        return normalizedValue !== "todos" && normalizedValue !== "todas";
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

  const roomOptions = useMemo<SelectOption[]>(() => {
    return AMBIENTES.map((rooms) => ({
      value: rooms,
      label: rooms,
    }));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedType = typeOptions.find(
      (option) => option.value === tipo
    )?.label;

    const selectedZone = zoneOptions.find(
      (option) => option.value === zona
    )?.label;

    const message =
      `Hola Marin Propiedades, busco ${op.toLowerCase()} ` +
      `${selectedType || "una propiedad"}` +
      `${selectedZone ? ` en ${selectedZone}` : ""}` +
      `${amb ? `, ${amb} ambientes` : ""}.`;

    window.open(
      `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="relative -mt-16 md:-mt-20 z-20 container-pro">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="bg-white border border-line shadow-elevated p-6 md:p-8"
      >
        <div className="flex flex-wrap gap-1 mb-6 border-b border-line">
          {OPERACIONES.map((operation) => (
            <button
              key={operation}
              type="button"
              onClick={() => setOp(operation)}
              className={`px-5 py-3 text-[0.72rem] tracking-[0.18em] uppercase font-semibold transition-all relative ${
                op === operation
                  ? "text-navy"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {operation}

              {op === operation && (
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
            value={tipo}
            onChange={setTipo}
            options={typeOptions}
            disabled={loading}
            loadingText="Cargando tipos..."
          />

          <FilterSelect
            label="Zona"
            value={zona}
            onChange={setZona}
            options={zoneOptions}
            disabled={loading}
            loadingText="Cargando zonas..."
          />

          <FilterSelect
            label="Ambientes"
            value={amb}
            onChange={setAmb}
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
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="w-full bg-transparent text-sm font-medium text-foreground outline-none mt-1 cursor-pointer disabled:cursor-wait disabled:opacity-60"
      >
        <option value="">
          {disabled && loadingText ? loadingText : "Todos"}
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
  const normalizedValue = value
    .trim()
    .toLowerCase()
    .replaceAll("_", " ")
    .replaceAll("-", " ");

  const knownLabels: Record<string, string> = {
    casa: "Casa",
    departamento: "Departamento",
    terreno: "Terreno",
    lote: "Lote",
    local: "Local",
    oficina: "Oficina",
    galpon: "Galpón",
    "galpón": "Galpón",
    "galpon logistico": "Galpón Logístico",
    "galpón logístico": "Galpón Logístico",
    "fraccion de terreno": "Fracción de terreno",
    "fracción de terreno": "Fracción de terreno",
    campo: "Campo",
    ph: "PH",
    duplex: "Dúplex",
    "dúplex": "Dúplex",
    desarrollo: "Desarrollo",
    otro: "Otro",
  };

  return knownLabels[normalizedValue] || formatLabel(normalizedValue);
}

function formatLabel(value: string) {
  return value
    .trim()
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\s+/g, " ")
    .replace(/\b\p{L}/gu, (letter) => letter.toUpperCase());
}