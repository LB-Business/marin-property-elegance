import { motion } from "motion/react";
import { PropertyCard } from "@/components/PropertyCard";
import { useMarinProperties } from "@/hooks/useMarinProperties";

export function FeaturedProperties() {
  const { filteredProperties, loading, error } = useMarinProperties();

  const featuredProperties = filteredProperties.slice(0, 6);

  return (
    <section id="propiedades" className="py-24 md:py-36 bg-bone">
      <div className="container-pro">
        <div className="grid md:grid-cols-[1fr_auto] items-end gap-8 mb-14 md:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="eyebrow flex items-center gap-3"
            >
              <span className="h-px w-8 bg-navy" />
              Propiedades destacadas
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="headline-display text-[clamp(2rem,4.4vw,3.6rem)] mt-5 max-w-2xl"
            >
              Una selección curada de oportunidades en Canning y zona sur.
            </motion.h2>
          </div>

          <a href="/propiedades" className="btn-outline-dark whitespace-nowrap">
            Ver todas
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[520px] bg-white border border-line animate-pulse"
              />
            ))}
          </div>
        ) : null}

        {!loading && error ? (
          <div className="bg-white border border-line p-10 text-center">
            <h3 className="text-2xl font-light text-navy">
              No pudimos cargar las propiedades.
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : null}

        {!loading && !error && featuredProperties.length === 0 ? (
          <div className="bg-white border border-line p-10 text-center">
            <h3 className="text-2xl font-light text-navy">
              Todavía no hay propiedades publicadas.
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Próximamente vas a poder ver las oportunidades disponibles de
              Marin Propiedades.
            </p>
          </div>
        ) : null}

        {!loading && !error && featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
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
  );
}