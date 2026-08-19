"use client";

import SyncScrollSlider from "./ui/SyncScrollSlider";

const products = [
  { id: 1, image: "/catalog/product_1.png", title: "Air Fryer" },
  { id: 2, image: "/catalog/product_2.png", title: "Rice Cooker" },
  { id: 3, image: "/catalog/product_3.png", title: "Pressure Cooker" },
  { id: 4, image: "/catalog/product_4.png", title: "Smart Hotplate" },
  { id: 5, image: "/catalog/product_5.png", title: "Breakfast Maker" },
  { id: 6, image: "/catalog/product_6.png", title: "Coffee Maker" },
  { id: 7, image: "/catalog/product_7.png", title: "Toaster" },
  { id: 8, image: "/catalog/product_8.png", title: "Blender" },
  { id: 9, image: "/catalog/product_9.png", title: "Kettle" },
  { id: 10, image: "/catalog/product_10.png", title: "Juicer" },
  { id: 11, image: "/catalog/product_11.png", title: "Mixer" },
  { id: 12, image: "/catalog/product_12.png", title: "Grill" },
  { id: 13, image: "/catalog/product_13.jpg", title: "Microwave" },
];

export default function ProductCatalogGrid() {
  // Map our product images to simple URL arrays as expected by the Framer component
  const row1Media = products.slice(0, 5).map(p => p.image);
  const row2Media = products.slice(5, 9).map(p => p.image);
  const row3Media = products.slice(9, 13).map(p => p.image);

  return (
    <section className="w-full bg-black py-20 overflow-hidden relative z-10">
      <div className="w-full text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest uppercase">
          Product Gallery
        </h2>
      </div>

      <div className="w-full relative scale-[1.1] md:scale-100 origin-center">
        <SyncScrollSlider
          rowCount={3}
          mediaRow1={row1Media}
          mediaRow2={row2Media}
          mediaRow3={row3Media}
          gap={24}
          imgWidth={350}
          imgHeight={250}
          borderRadius={24}
          speed={2}
        />
      </div>
    </section>
  );
}
