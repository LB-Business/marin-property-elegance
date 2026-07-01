import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { useMarinProperties } from "@/hooks/useMarinProperties";
import type { PublicProperty } from "@/types/property";

const WHATSAPP_URL = "https://wa.me/5491173610605";

export const Route = createFileRoute("/propiedades_/$id")({
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const { id } = Route.useParams();
  const { publishedProperties, loading, error } = useMarinProperties();

  const property = useMemo(() => {
    return publishedProperties.find((item) => item._id === id);
  }, [publishedProperties, id]);

  const images = useMemo(() => {
    if (!property) return [];

    const allImages = [property.coverImage, ...(property.images ?? [])].filter(
      Boolean
    ) as NonNullable<PublicProperty["coverImage"]>[];

    return allImages.filter(
      (image, index, self) =>
        image.url && index === self.findIndex((item) => item.url === image.url)
    );
  }, [property]);

  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const mainImageUrl =
    selectedImageUrl ||
    images.find((image) => image.isCover)?.url ||
    images[0]?.url ||
    "";

  if (loading) {
    return (
      <main className="min-h-screen bg-bone text-foreground">
        <Header />

        <section className="pt-32 md:pt-40 pb-24">
          <div className="container-pro">
            <div className="h-[620px] bg-white border border-line animate-pulse" />
          </div>
        </section>

        <Footer />
        <WhatsAppFloat />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-bone text-foreground">
        <Header />

        <section className="pt-32 md:pt-40 pb-24">
          <div className="container-pro">
            <div className="bg-white border border-line p-10 text-center">
              <h1 className="text-3xl font-light text-navy">
                No pudimos cargar la propiedad.
              </h1>

              <p className="mt-4 text-muted-foreground">{error}</p>

              <a href="/propiedades" className="btn-primary mt-8 inline-flex">
                Volver a propiedades
              </a>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppFloat />
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-bone text-foreground">
        <Header />

        <section className="pt-32 md:pt-40 pb-24">
          <div className="container-pro">
            <div className="bg-white border border-line p-10 text-center">
              <h1 className="text-3xl font-light text-navy">
                Propiedad no encontrada.
              </h1>

              <p className="mt-4 text-muted-foreground">
                Puede que la propiedad haya sido pausada, vendida o eliminada.
              </p>

              <a href="/propiedades" className="btn-primary mt-8 inline-flex">
                Ver propiedades
              </a>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppFloat />
      </main>
    );
  }

  const location = getPropertyLocation(property);
  const mapUrl = getMapUrl(property);

  const whatsappUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(
    `Hola Marin Propiedades, quiero consultar por esta propiedad: ${property.title}${
      location ? ` en ${location}` : ""
    }.`
  )}`;

  return (
    <main className="min-h-screen bg-bone text-foreground">
      <Header />

      <section className="pt-32 md:pt-40 pb-12">
        <div className="container-pro">
          <a
            href="/propiedades"
            className="inline-flex mb-8 text-[0.72rem] tracking-[0.22em] uppercase font-semibold text-navy border-b border-navy"
          >
            Volver a propiedades
          </a>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14"
          >
            <div>
              <div className="relative aspect-[4/3] bg-navy overflow-hidden border border-line">
                {mainImageUrl ? (
                  <img
                    src={mainImageUrl}
                    alt={property.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,36,66,1),rgba(42,64,95,0.92))]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
                  </>
                )}

                <div className="absolute left-5 top-5 bg-white text-navy px-4 py-2 text-[0.65rem] tracking-[0.2em] uppercase font-bold">
                  {formatOperation(property.operationType)}
                </div>

                <div className="absolute right-5 top-5 bg-navy/85 text-white px-4 py-2 text-[0.65rem] tracking-[0.2em] uppercase font-bold backdrop-blur">
                  {formatPropertyType(property.propertyType)}
                </div>
              </div>

              {images.length > 1 ? (
                <div className="mt-4 grid grid-cols-4 md:grid-cols-6 gap-3">
                  {images.map((image) => (
                    <button
                      key={image.url}
                      type="button"
                      onClick={() => setSelectedImageUrl(image.url)}
                      className={`relative aspect-square overflow-hidden border transition ${
                        mainImageUrl === image.url
                          ? "border-navy"
                          : "border-line hover:border-navy"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={property.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <aside className="bg-white border border-line p-7 md:p-9 h-fit">
              <div className="text-[0.7rem] tracking-[0.24em] uppercase text-muted-foreground font-semibold">
                {location || "Ubicación a consultar"}
              </div>

              <h1 className="headline-display mt-4 text-[clamp(2.2rem,4vw,4.2rem)] leading-[0.95] text-navy">
                {property.title}
              </h1>

              <div className="mt-7">
                <div className="text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
                  Precio
                </div>

                <div className="mt-2 text-3xl md:text-4xl font-medium text-navy">
                  {formatPrice(property.price, property.currency)}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-line py-6">
                <DetailMini
                  title="Operación"
                  value={formatOperation(property.operationType)}
                />
                <DetailMini
                  title="Tipo"
                  value={formatPropertyType(property.propertyType)}
                />
                <DetailMini
                  title="Ambientes"
                  value={
                    property.features?.rooms
                      ? `${property.features.rooms}`
                      : "Consultar"
                  }
                />
                <DetailMini
                  title="Dormitorios"
                  value={
                    property.features?.bedrooms
                      ? `${property.features.bedrooms}`
                      : "Consultar"
                  }
                />
                <DetailMini
                  title="Baños"
                  value={
                    property.features?.bathrooms
                      ? `${property.features.bathrooms}`
                      : "Consultar"
                  }
                />
                <DetailMini
                  title="Cocheras"
                  value={
                    property.features?.garages
                      ? `${property.features.garages}`
                      : "Consultar"
                  }
                />
                <DetailMini
                  title="Sup. total"
                  value={
                    property.features?.totalArea
                      ? `${property.features.totalArea} m²`
                      : "Consultar"
                  }
                />
                <DetailMini
                  title="Sup. cubierta"
                  value={
                    property.features?.coveredArea
                      ? `${property.features.coveredArea} m²`
                      : "Consultar"
                  }
                />
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary justify-center"
                >
                  Consultar por WhatsApp
                </a>

                {mapUrl ? (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-dark justify-center"
                  >
                    Ver mapa
                  </a>
                ) : null}
              </div>
            </aside>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-pro">
          <div className="grid lg:grid-cols-[1fr_0.45fr] gap-10 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="bg-white border border-line p-7 md:p-10"
            >
              <div className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-navy" />
                Descripción
              </div>

              <div className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                {property.description?.trim()
                  ? property.description
                  : "Propiedad publicada por Marin Propiedades. Consultanos para recibir más información, conocer detalles adicionales y coordinar una visita."}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="bg-white border border-line p-7 md:p-10 h-fit"
            >
              <div className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-navy" />
                Características
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {property.features?.hasPool ? <FeatureBadge text="Piscina" /> : null}
                {property.features?.hasGrill ? <FeatureBadge text="Parrilla" /> : null}
                {property.features?.hasGarden ? <FeatureBadge text="Jardín" /> : null}
                {property.features?.hasSecurity ? <FeatureBadge text="Seguridad" /> : null}
                {property.features?.hasElevator ? <FeatureBadge text="Ascensor" /> : null}
                {property.features?.hasBalcony ? <FeatureBadge text="Balcón" /> : null}
                {property.features?.hasTerrace ? <FeatureBadge text="Terraza" /> : null}
                {property.acceptsFinancing ? <FeatureBadge text="Acepta financiación" /> : null}
                {property.acceptsExchange ? <FeatureBadge text="Acepta permuta" /> : null}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

function DetailMini({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <div className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground font-semibold">
        {title}
      </div>
      <div className="mt-1 text-base font-medium text-navy">{value}</div>
    </div>
  );
}

function FeatureBadge({ text }: { text: string }) {
  return (
    <span className="bg-bone border border-line px-3 py-1 text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground font-semibold">
      {text}
    </span>
  );
}

function getPropertyLocation(property: PublicProperty) {
  const neighborhood = property.address?.neighborhood;
  const city = property.address?.city;
  const state = property.address?.state;

  return [neighborhood, city, state].filter(Boolean).join(", ");
}

function getMapUrl(property: PublicProperty) {
  const latitude = property.address?.latitude;
  const longitude = property.address?.longitude;
  const showExactLocation = property.address?.showExactLocation;

  if (!latitude || !longitude || !showExactLocation) {
    return null;
  }

  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
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