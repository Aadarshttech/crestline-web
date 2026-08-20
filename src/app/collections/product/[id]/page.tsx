import { notFound } from "next/navigation";
import Navbar from "../../../../../components/Navbar";
import Footer from "../../../../../components/Footer";
import ProductDetail from "../../../../../components/ProductDetail";
import { getProductById, getProducts } from "../../../../../lib/data";

// Generate static params for all 395 products at build time (optional but good for performance)
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);
  
  if (!product) {
    return {
      title: "Product Not Found | Crestline",
    };
  }

  return {
    title: `${product.title} | Crestline`,
    description: product.description || `Buy ${product.title} at Crestline.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="relative w-full bg-[#FAFAF8] min-h-screen flex flex-col selection:bg-neutral-900 selection:text-white text-neutral-900">
      <Navbar alwaysShowLogo={true} theme="light" />

      {/* Main Content */}
      <div className="flex-grow pt-24">
        <ProductDetail product={product} />
      </div>

      <div className="mt-auto">
        <Footer theme="light" />
      </div>
    </main>
  );
}
