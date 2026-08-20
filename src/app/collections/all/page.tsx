import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import ProductGallery from "../../../../components/ProductGallery";
import { getProducts, getCategories } from "../../../../lib/data";

export const metadata = {
  title: "Home & Appliances | Crestline",
  description: "Browse the complete catalog of Crestline's premium home and appliance products.",
};

export default async function AllCollectionsPage() {
  // Fetch data on the server
  const products = await getProducts();
  const categories = await getCategories();

  // Sort categories alphabetically
  categories.sort();

  // Select top 5 picks focusing on Air Fryers, Rice Cookers, and Pressure Cookers
  const targetCategories = ["Air Fryers", "Rice Cookers", "Electric Pressure Cookers"];
  
  // Filter for products that have a video AND are not spare parts
  const videoProducts = products.filter(p => {
    const isSparePart = p.category?.toLowerCase().includes("parts") || p.title.toLowerCase().includes("parts");
    return p.hasVideo && p.video?.remote && p.video.remote.length > 5 && !isSparePart;
  });
  
  // Try to get a mix of targeted categories that have videos
  let topPicks: Product[] = [];
  
  for (const cat of targetCategories) {
    const pick = videoProducts.find(p => p.category === cat && !topPicks.includes(p));
    if (pick) topPicks.push(pick);
  }
  
  // Fill the rest up to 5 with other video products
  for (const p of videoProducts) {
    if (topPicks.length >= 5) break;
    if (!topPicks.includes(p)) topPicks.push(p);
  }
  
  // Fallback if we don't even have 5 video products
  if (topPicks.length < 5) {
    const filler = products.filter(p => !topPicks.includes(p)).slice(0, 5 - topPicks.length);
    topPicks = [...topPicks, ...filler];
  }

  return (
    <main className="relative w-full bg-[#FAFAF8] min-h-screen flex flex-col selection:bg-neutral-900 selection:text-white text-neutral-900">
      <Navbar alwaysShowLogo={true} theme="light" />

      {/* Page Header */}
      <div className="w-full pt-32 pb-8 px-6 md:px-12 bg-white border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-100 border border-neutral-200/80 mb-4 text-[11px] font-semibold tracking-wider text-neutral-700 uppercase">
            Complete Catalog
          </div>
          <h1 className="text-4xl md:text-5xl font-outfit font-light tracking-tight text-neutral-950 uppercase">
            Home & <span className="font-semibold text-neutral-900">Appliances</span>
          </h1>
          <p className="mt-4 text-neutral-500 font-outfit font-light text-base max-w-2xl">
            Explore our comprehensive directory of precision-engineered culinary hardware and home appliances.
          </p>
        </div>
      </div>

      {/* The Gallery Component (Client-Side filtering) */}
      <div className="flex-grow">
        <ProductGallery products={products} categories={categories} topPicks={topPicks} />
      </div>

      <div className="mt-auto">
        <Footer theme="light" />
      </div>
    </main>
  );
}
