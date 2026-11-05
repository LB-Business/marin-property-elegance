import { Header } from "./Header";
import { Footer } from "./Footer";
import policy from "../content/privacy.json";

export function PrivacyPage() {
  return (
    <div className="bg-background text-foreground">
      <a href="#contenido-privacidad" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:p-4 focus:text-navy">Saltar al contenido</a>
      <Header />
      <main id="contenido-privacidad" tabIndex={-1} className="pt-[78px]">
        <section className="bg-bone border-b border-line py-16 md:py-24">
          <div className="container-pro">
            <p className="eyebrow mb-5">Marin Propiedades</p>
            <h1 className="headline-display text-4xl sm:text-5xl md:text-6xl text-navy max-w-4xl">Política de Privacidad</h1>
            <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">Cómo recibimos, utilizamos y cuidamos tus datos cuando nos consultás por una propiedad o nuestros servicios.</p>
            <p className="mt-5 text-sm text-muted-foreground">Última actualización: <time dateTime="2026-11-05">{policy.updated}</time></p>
          </div>
        </section>
        <div className="container-pro py-12 md:py-20 grid lg:grid-cols-12 gap-12">
          <nav aria-label="Índice de la política de privacidad" className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 border-t border-line pt-6">
              <p className="eyebrow mb-5">Contenido</p>
              <ol className="space-y-3 text-sm leading-relaxed">
                {policy.sections.map(section => <li key={section.id}><a className="text-navy underline decoration-line underline-offset-4 hover:decoration-navy focus-visible:outline-2 focus-visible:outline-offset-4" href={`#${section.id}`}>{section.title}</a></li>)}
              </ol>
            </div>
          </nav>
          <article aria-label="Tratamiento de datos personales" className="lg:col-span-8 min-w-0 space-y-10">
            {policy.sections.map(section => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-titulo`} className="scroll-mt-28 border-b border-line pb-10 last:border-0">
              <h2 id={`${section.id}-titulo`} className="text-xl md:text-2xl font-medium text-navy mb-5">{section.title}</h2>
              <div className="space-y-4 text-sm md:text-base leading-relaxed text-muted-foreground">{section.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
            </section>)}
            <aside className="bg-bone border border-line p-6 md:p-8" aria-label="Contacto y fuentes">
              <h2 className="text-xl font-medium text-navy mb-4">Consultas sobre tus datos</h2>
              <a className="btn-primary" href="https://wa.me/5491173610605">Contactar por WhatsApp</a>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">Podés consultar tus derechos en la <a className="text-navy underline underline-offset-4" href="https://www.argentina.gob.ar/aaip/datospersonales/derechos">AAIP</a>, el texto de la <a className="text-navy underline underline-offset-4" href="https://www.argentina.gob.ar/normativa/nacional/64790/actualizacion">Ley 25.326</a> y la <a className="text-navy underline underline-offset-4" href="https://www.facebook.com/privacy/policy/">Política de privacidad de Meta</a>.</p>
            </aside>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
