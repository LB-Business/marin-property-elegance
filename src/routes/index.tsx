import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Construction } from "@/components/Construction";
import { Process } from "@/components/Process";
import { Investment } from "@/components/Investment";
import { Location } from "@/components/Location";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const SITE_TITLE = "Marin Propiedades | Inmobiliaria en Canning";
const SITE_DESC =
  "Propiedades, inversiones, desarrollos y construcciones llave en mano en Canning. Asesoramiento integral para comprar, vender, alquilar, invertir o construir.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "es_AR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "Marin Propiedades",
          url: "/",
          telephone: "+5491173610605",
          areaServed: ["Canning", "Ezeiza", "San Vicente", "Buenos Aires"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Mariano Castex 499, Oficina 409, Sky Center",
            addressLocality: "Canning",
            addressRegion: "Buenos Aires",
            addressCountry: "AR",
          },
          sameAs: ["https://instagram.com/marinprop"],
          makesOffer: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Construcción llave en mano",
                areaServed: "Canning y Zona Sur GBA",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Header />
      <Hero />
      <SearchBar />
      <FeaturedProperties />
      <About />
      <Services />
      <Construction />
      <Process />
      <Investment />
      <Location />
      <FinalCTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}