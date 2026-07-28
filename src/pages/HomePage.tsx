import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Collections } from "@/components/Collections";
import { Story } from "@/components/Story";
import { CustomCreations } from "@/components/CustomCreations";
import { BrandsMarquee } from "@/components/BrandsMarquee";
import { Services } from "@/components/Services";
import { Reviews } from "@/components/Reviews";
import { Locations } from "@/components/Locations";
import { ContactForm } from "@/components/ContactForm";
import { usePageTitle } from "@/lib/use-page-title";

// Landing page: le sezioni in ordine di racconto
// (header, footer e il <main> comune stanno in App).
export function HomePage() {
  usePageTitle("Gioielleria Saltini | Alta gioielleria e orologeria a Nettuno dal 1946");

  return (
    <>
      <Hero />
      <TrustBar />
      <Collections />
      <Story />
      <CustomCreations />
      <BrandsMarquee />
      <Services />
      <Reviews />
      <Locations />
      <ContactForm />
    </>
  );
}
