import LuxuryGallery from "../../../../components/LuxuryGallery";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Gifting | Crestline",
  description: "Curated luxury corporate gifts for visionary organizations.",
};

export default function CorporateGiftingPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#2C2620] flex flex-col">
      <Navbar alwaysShowLogo={true} theme="light" />
      
      <div className="flex-grow flex flex-col pt-20">
        {/* White Gold Luxury Hero Section */}
        <section className="relative w-full py-16 lg:py-24 flex flex-col items-center justify-center border-b border-[#EADDCA]">
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <h1 className="text-4xl md:text-6xl font-outfit font-light text-[#2C2620] tracking-widest uppercase mb-6">
              Corporate <span className="font-medium text-[#C5A059]">Gifting</span>
            </h1>
            <p className="text-[#8B7355] font-outfit text-sm uppercase tracking-[0.2em] max-w-lg mx-auto">
              Curated exclusively for visionary organizations
            </p>
          </div>
        </section>

        {/* The Bespoke Gallery */}
        <LuxuryGallery />
      </div>

      <div className="relative z-10 w-full mt-auto">
        <Footer theme="white-gold" />
      </div>
    </main>
  );
}
