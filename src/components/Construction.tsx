import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { PublicProperty } from "@/types/property";
import { motion } from "motion/react";
import { useMarinProperties } from "@/hooks/useMarinProperties";

export function Construction() {
  const { filteredProperties, loading, error, reload } = useMarinProperties({
    propertyType: "construccion",
  });

  const [projectIndex, setProjectIndex] = useState(0);
  const activeProjectIndex = filteredProperties.length ? projectIndex % filteredProperties.length : 0;
  const activeProject = filteredProperties[activeProjectIndex];
  const changeProject = (direction: number) => {
    if (filteredProperties.length > 1) setProjectIndex((value) => (value + direction + filteredProperties.length) % filteredProperties.length);
  };

  return (
    <section id="construcciones" className="relative overflow-hidden py-16 md:py-24 bg-navy text-white border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_55%)]" />
      <div className="container-pro relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <h2 className="headline-display text-[clamp(2rem,3.6vw,3.5rem)]">Construcciones</h2>
          <a href="/propiedades?tipo=construccion" className="btn-outline-light">Ver construcciones <span aria-hidden>→</span></a>
        </div>

        {loading && <div role="status" aria-label="Cargando construcciones" className="grid md:grid-cols-2 gap-6">
          {[0, 1, 2, 3].map((item) => <div key={item} className="aspect-[16/9] bg-white/10 animate-pulse" />)}
        </div>}
        {!loading && error && <div role="alert" className="border border-white/20 p-8 text-center">
          <p>No pudimos cargar las construcciones.</p>
          <button type="button" onClick={() => void reload()} className="btn-outline-light mt-6">Reintentar</button>
        </div>}
        {!loading && !error && filteredProperties.length === 0 && <p className="border border-white/20 p-8 text-white/70">Próximamente vas a encontrar nuestros proyectos de construcción acá.</p>}
        {!loading && !error && activeProject && <>
          <ConstructionGallery key={activeProject._id} property={activeProject}
            onPreviousProject={() => changeProject(-1)} onNextProject={() => changeProject(1)}
            hasMultipleProjects={filteredProperties.length > 1} />
          <p aria-live="polite" aria-atomic="true" className="text-center mt-3 text-xs tracking-widest uppercase text-white/60">
            Proyecto {activeProjectIndex + 1} de {filteredProperties.length}
          </p>
        </>}
      </div>
    </section>
  );
}

function ConstructionGallery({ property, onPreviousProject, onNextProject, hasMultipleProjects }: {
  property: PublicProperty;
  onPreviousProject: () => void;
  onNextProject: () => void;
  hasMultipleProjects: boolean;
}) {
  const images = Array.from(new Set([
    property.coverImage?.url,
    property.images?.find((image) => image.isCover)?.url,
    ...(property.images ?? []).map((image) => image.url),
  ].filter((url): url is string => Boolean(url))));
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const active = images.length ? current % images.length : 0;
  const image = images[active];
  const change = (direction: number) => setCurrent((value) => (value + direction + images.length) % images.length);

  return (
    <article aria-label={`Fotos de ${property.title}`} aria-roledescription="carrusel" className="grid grid-cols-[minmax(44px,1fr)_minmax(0,768px)_minmax(44px,1fr)] gap-x-2 md:grid-cols-[minmax(80px,1fr)_minmax(0,768px)_minmax(80px,1fr)] md:gap-x-6 items-start">
      <button type="button" aria-label="Proyecto anterior" title="Proyecto anterior" disabled={!hasMultipleProjects} onClick={onPreviousProject}
        className="col-start-1 row-start-1 self-center justify-self-start flex h-11 w-11 md:h-20 md:w-20 items-center justify-center rounded-full border border-white/40 bg-white/5 hover:bg-white/15 disabled:opacity-25 disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        <ArrowLeft aria-hidden="true" className="h-7 w-7 md:h-11 md:w-11" strokeWidth={1.5} />
      </button>
      <button type="button" aria-label="Proyecto siguiente" title="Proyecto siguiente" disabled={!hasMultipleProjects} onClick={onNextProject}
        className="col-start-3 row-start-1 self-center justify-self-end flex h-11 w-11 md:h-20 md:w-20 items-center justify-center rounded-full border border-white/40 bg-white/5 hover:bg-white/15 disabled:opacity-25 disabled:cursor-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        <ArrowRight aria-hidden="true" className="h-7 w-7 md:h-11 md:w-11" strokeWidth={1.5} />
      </button>
      <div className="col-start-2 row-start-1 relative aspect-[16/9] overflow-hidden bg-white/10">
        {image && !failed.includes(image) ? (
          <motion.img key={image} src={image} alt={`${property.title} — foto ${active + 1}`} loading="lazy" decoding="async"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
            className="h-full w-full object-cover"
            onError={() => setFailed((previous) => [...previous, image])} />
        ) : <span className="absolute inset-0 flex items-center justify-center text-white/60">Imagen no disponible</span>}
        {images.length > 1 && <>
          <button type="button" aria-label="Foto anterior" onClick={() => change(-1)} className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-navy/80 text-white border border-white/30 hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button type="button" aria-label="Foto siguiente" onClick={() => change(1)} className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-navy/80 text-white border border-white/30 hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><ChevronRight aria-hidden="true" size={22} /></button>
          <span aria-live="polite" aria-atomic="true" className="absolute bottom-3 right-3 rounded-full bg-navy/80 px-3 py-1 text-xs">{active + 1} / {images.length}</span>
        </>}
      </div>
      <a href={`/propiedades/${encodeURIComponent(property._id)}`} className="col-start-2 row-start-2 flex flex-wrap items-center justify-between gap-3 py-5 hover:text-white/70 focus-visible:outline-2 focus-visible:outline-white">
        <h3 className="text-xl md:text-2xl font-light">{property.title}</h3>
        <span className="text-sm whitespace-nowrap">Ver proyecto <span aria-hidden>↗</span></span>
      </a>
    </article>
  );
}
