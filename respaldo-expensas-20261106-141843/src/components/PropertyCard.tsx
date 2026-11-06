import { motion } from "motion/react";
import type { PublicProperty } from "@/types/property";

const WHATSAPP_URL = "https://wa.me/5491173610605";

type PropertyCardProps = {
    property: PublicProperty;
    index?: number;
};

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
    const imageUrl = getPropertyImage(property);
    const location = getPropertyLocation(property);
    const operation = formatOperation(property.operationType);
    const propertyType = formatPropertyType(property.propertyType);

    const consultarUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(
        `Hola Marin Propiedades, quiero consultar por esta propiedad: ${property.title}${location ? ` en ${location}` : ""
        }.`
    )}`;

    return (
        <motion.article
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
                duration: 0.7,
                delay: (index % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6 }}
            className="group bg-white border border-line flex flex-col overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
        >
            <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={`${property.title} — ${location || "Marin Propiedades"}`}
                        width={1280}
                        height={896}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    />
                ) : (
                    <>
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,36,66,1),rgba(42,64,95,0.92))]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
                    </>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="absolute top-4 left-4 px-3 py-1.5 text-[0.6rem] tracking-[0.22em] uppercase font-bold bg-white/95 text-navy">
                    {operation}
                </span>

                <span className="absolute top-4 right-4 px-3 py-1.5 text-[0.6rem] tracking-[0.22em] uppercase font-bold bg-navy/85 text-white backdrop-blur">
                    {propertyType}
                </span>
            </div>

            <div className="p-7 flex flex-col flex-1">
                <div className="text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
                    {location || "Ubicación a consultar"}
                </div>

                <h3 className="mt-2 text-xl font-medium leading-tight text-foreground">
                    {property.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {property.description?.trim()
                        ? property.description
                        : "Propiedad publicada por Marin Propiedades. Consultanos para recibir más información y coordinar una visita."}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-y-3 text-sm border-t border-line pt-5">
                    <div>
                        <dt className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
                            Superficie
                        </dt>
                        <dd className="font-medium mt-0.5">
                            {formatSurface(property)}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
                            Detalle
                        </dt>
                        <dd className="font-medium mt-0.5">
                            {formatRooms(property)}
                        </dd>
                    </div>
                </dl>

                <div className="mt-5 flex flex-wrap gap-2">
                    {property.features?.bedrooms ? (
                        <FeatureBadge text={`${property.features.bedrooms} dorm.`} />
                    ) : null}

                    {property.features?.bathrooms ? (
                        <FeatureBadge text={`${property.features.bathrooms} baños`} />
                    ) : null}

                    {property.features?.garages ? (
                        <FeatureBadge text={`${property.features.garages} cocheras`} />
                    ) : null}

                    {property.features?.coveredArea ? (
                        <FeatureBadge text={`${property.features.coveredArea} m² cub.`} />
                    ) : null}

                    {property.features?.hasPool ? <FeatureBadge text="Piscina" /> : null}

                    {property.features?.hasGrill ? <FeatureBadge text="Parrilla" /> : null}

                    {property.features?.hasGarden ? <FeatureBadge text="Jardín" /> : null}

                    {property.features?.hasSecurity ? (
                        <FeatureBadge text="Seguridad" />
                    ) : null}

                    {property.acceptsFinancing ? (
                        <FeatureBadge text="Financiación" />
                    ) : null}

                    {property.acceptsExchange ? <FeatureBadge text="Permuta" /> : null}
                </div>

                <div className="mt-auto flex items-end justify-between gap-4 pt-6 border-t border-line">
                    <div>
                        <div className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">
                            Precio
                        </div>
                        <div className="text-lg font-medium text-navy mt-0.5">
                            {formatPrice(property.price, property.currency)}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <a
                            href={consultarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 text-[0.65rem] tracking-[0.16em] uppercase font-semibold border border-line hover:border-navy hover:text-navy transition-colors"
                        >
                            Consultar
                        </a>

                        <a
                            href={`/propiedades/${property._id}`}
                            className="px-4 py-2.5 text-[0.65rem] tracking-[0.16em] uppercase font-semibold bg-navy text-white hover:bg-navy-deep transition-colors"
                        >
                            Ver detalle
                        </a>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

function FeatureBadge({ text }: { text: string }) {
    return (
        <span className="bg-bone border border-line px-3 py-1 text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground font-semibold">
            {text}
        </span>
    );
}

function getPropertyImage(property: PublicProperty) {
    return (
        property.coverImage?.url ||
        property.images?.find((image) => image.isCover)?.url ||
        property.images?.[0]?.url ||
        ""
    );
}

function getPropertyLocation(property: PublicProperty) {
    const neighborhood = property.address?.neighborhood;
    const city = property.address?.city;
    const state = property.address?.state;

    return [neighborhood, city, state].filter(Boolean).join(", ");
}

function formatSurface(property: PublicProperty) {
    if (property.features?.totalArea) {
        return `${property.features.totalArea} m²`;
    }

    if (property.features?.coveredArea) {
        return `${property.features.coveredArea} m² cub.`;
    }

    return "A consultar";
}

function formatRooms(property: PublicProperty) {
    if (property.features?.rooms) {
        return `${property.features.rooms} ambientes`;
    }

    if (property.features?.bedrooms) {
        return `${property.features.bedrooms} dormitorios`;
    }

    return formatPropertyType(property.propertyType);
}

function formatPrice(price?: number, currency?: string) {
    if (!price || price <= 0) return "Consultar";

    try {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: currency || "USD",
            maximumFractionDigits: 0,
        }).format(price);
    } catch {
        return `${currency || ""} ${price.toLocaleString("es-AR")}`.trim();
    }
}

function formatOperation(operationType?: string) {
    const labels: Record<string, string> = {
        venta: "Venta",
        alquiler: "Alquiler",
        temporario: "Temporario",
    };

    return labels[operationType || ""] || "Operación";
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

    return labels[propertyType || ""] || "Propiedad";
}