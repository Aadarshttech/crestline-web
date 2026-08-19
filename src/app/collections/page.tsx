"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import SimpleProductGallery from "../../../components/SimpleProductGallery";
import ProductCategories from "../../../components/ProductCategories";

export default function CollectionsPage() {
  return (
    <main className="relative w-full bg-black min-h-screen flex flex-col selection:bg-white selection:text-black overflow-x-clip">
      <Navbar alwaysShowLogo={true} />

      <div className="flex-grow flex flex-col pt-10 md:mt-20 md:pt-0">
        <div className="block md:hidden">
          <SimpleProductGallery />
        </div>
        <div className="hidden md:block">
          <ProductCategories />
        </div>
      </div>

      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>
    </main>
  );
}
