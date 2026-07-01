import { motion } from "motion/react";
import casaImg from "@/assets/prop-casa.jpg";
import loteImg from "@/assets/prop-lote.jpg";
import deptoImg from "@/assets/prop-depto.jpg";
import localImg from "@/assets/prop-local.jpg";
import desarrolloImg from "@/assets/prop-desarrollo.jpg";
import oficinaImg from "@/assets/prop-oficina.jpg";

const WHATSAPP_URL = "https://wa.me/5491173610605";

interface Property {
  id: string;
  img: string;
  estado: "Venta" | "Alquiler" | "Oportunidad";
  titulo: string;
  zona: string;
  superficie: string;
  ambientes: string;
  precio: string;
}

const PROPERTIES: Property[] = [
  { id: "casa-canning", img: casaImg, estado: "Venta", titulo: "Casa moderna en barrio cerrado", zona: "Canning", superficie: "320 m²", ambientes: "5 ambientes", precio: "Consultar" },
  { id: "lote-privado", img: loteImg, estado: "Venta", titulo: "Lote en barrio privado", zona: "Canning", superficie: "850 m²", ambientes: "Lote", precio: "Consultar" },
  { id: "depto-sky", img: deptoImg, estado: "Venta", titulo: "Departamento en Sky Center", zona: "Canning", superficie: "92 m²", ambientes: "3 ambientes", precio: "Consultar" },
  { id: "local-comercial", img: localImg, estado: "Alquiler", titulo: "Local comercial estratégico", zona: "Canning", superficie: "120 m²", ambientes: "Frente vidriado", precio: "Consultar" },
  { id: "desarrollo", img: desarrolloImg, estado: "Oportunidad", titulo: "Tierra para desarrollo", zona: "Ezeiza", superficie: "4.200 m²", ambientes: "Apto mixto", precio: "Consultar" },
  { id: "oficina-premium", img: oficinaImg, estado: "Venta", titulo: "Oficina premium en torre", zona: "Sky Center", superficie: "78 m²", ambientes: "2 ambientes", precio: "Consultar" },
];

export function FeaturedProperties() {
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
          <a href="/propiedades" className="btn-outline-dark whitespace-nowrap">Ver todas</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROPERTIES.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const consultarUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(
    `Hola, me interesa la propiedad: ${property.titulo} (${property.zona}).`
  )}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-white border border-line flex flex-col"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.img}
          alt={`${property.titulo} — ${property.zona}`}
          width={1280}
          height={896}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span
          className={`absolute top-4 left-4 px-3 py-1.5 text-[0.6rem] tracking-[0.22em] uppercase font-bold ${
            property.estado === "Oportunidad"
              ? "bg-navy text-white"
              : property.estado === "Alquiler"
              ? "bg-white text-navy"
              : "bg-white/95 text-navy"
          }`}
        >
          {property.estado}
        </span>
      </div>

      <div className="p-7 flex flex-col flex-1">
        <div className="text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground font-semibold">
          {property.zona}
        </div>
        <h3 className="mt-2 text-xl font-medium leading-tight text-foreground">
          {property.titulo}
        </h3>

        <dl className="mt-5 grid grid-cols-2 gap-y-3 text-sm border-t border-line pt-5">
          <div>
            <dt className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Superficie</dt>
            <dd className="font-medium mt-0.5">{property.superficie}</dd>
          </div>
          <div>
            <dt className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Detalle</dt>
            <dd className="font-medium mt-0.5">{property.ambientes}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-end justify-between pt-5 border-t border-line">
          <div>
            <div className="text-[0.6rem] tracking-[0.2em] uppercase text-muted-foreground">Precio</div>
            <div className="text-lg font-medium text-navy mt-0.5">{property.precio}</div>
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
              href={consultarUrl}
              target="_blank"
              rel="noopener noreferrer"
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
