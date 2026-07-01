import { MarinLogo } from "./MarinLogo";

const WHATSAPP_URL = "https://wa.me/5491173610605";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-pro py-20 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <MarinLogo variant="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
            Inmobiliaria en Canning. Propiedades, inversiones, desarrollos y
            construcciones llave en mano con asesoramiento integral y visión
            estratégica.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="text-[0.65rem] tracking-[0.22em] uppercase text-white/40 font-semibold mb-5">
            Navegación
          </div>

          <ul className="space-y-3 text-sm">
            {[
              ["Inicio", "#inicio"],
              ["Propiedades", "#propiedades"],
              ["Servicios", "#servicios"],
              ["Construcciones", "#construcciones"],
              ["Nosotros", "#nosotros"],
              ["Contacto", "#contacto"],
            ].map(([l, h]) => (
              <li key={h}>
                <a href={h} className="hover:text-white transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-[0.65rem] tracking-[0.22em] uppercase text-white/40 font-semibold mb-5">
            Contacto
          </div>

          <address className="not-italic text-sm leading-relaxed space-y-2">
            <div>Mariano Castex N°499, Of. 409</div>
            <div>Sky Center, Canning</div>

            <div className="pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                +54 9 11 7361-0605
              </a>
            </div>

            <div>
              <a
                href="https://instagram.com/marinprop"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                @marinprop
              </a>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-pro py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[0.7rem] text-white/40">
          <div>
            © {new Date().getFullYear()} Marin Propiedades. Todos los derechos reservados.
          </div>
          <div>Canning, Buenos Aires — Argentina</div>
        </div>
      </div>
    </footer>
  );
}