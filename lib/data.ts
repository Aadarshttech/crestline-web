import fs from 'fs';
import path from 'path';

export interface Product {
  id: string;
  url: string;
  title: string;
  price: string;
  minOrder: string;
  category: string;
  description: string;
  attributes: Record<string, string>;
  keyAttributes?: Record<string, string>;
  skuOptions?: Record<string, string[]>;
  priceLadder?: { price: string; quantity: string }[];
  colors: string[];
  sizes: string[];
  hasVideo: boolean;
  images: {
    remote: string[];
    local: string[];
  };
  video?: {
    remote: string;
    local: string;
  };
}

// In production, this should be an absolute path or relative to process.cwd()
// Since we are running this locally, we can point to the scraped data folder
const DATA_FILE = path.join(process.cwd(), '..', 'scraped_data', 'products.json');

let cachedProducts: Product[] | null = null;

function getValidImages(images: string[]): string[] {
  if (!images || !Array.isArray(images)) return [];
  
  const valid = images.filter(url => {
    if (!url) return false;
    // Exclude the specific company banner that appears on many products
    if (url.includes('H4b756c6a53fa48d489e1b3d5a0cde5d5N.jpg')) return false;
    // Exclude Alibaba UI/Description graphics (often have -tps-)
    if (url.includes('-tps-')) return false;
    // Exclude tiny icons
    if (url.includes('_84-84.png') || url.includes('_220x220.')) return false;
    return true;
  });
  
  // Always return something if possible, fallback to the original if our filter was too aggressive
  return valid.length > 0 ? valid : images;
}

export async function getProducts(): Promise<Product[]> {
  if (cachedProducts) {
    return cachedProducts;
  }
  
  try {
    const fileContents = fs.readFileSync(DATA_FILE, 'utf8');
    const rawProducts = JSON.parse(fileContents);
    
    // Deduplicate products by ID to prevent React key errors
    const uniqueProductsMap = new Map<string, Product>();
    for (const product of rawProducts) {
      if (product && product.id && !uniqueProductsMap.has(product.id)) {
        
        // Clean up junk images from the remote array
        if (product.images && Array.isArray(product.images.remote)) {
          product.images.remote = getValidImages(product.images.remote);
        }
        
        uniqueProductsMap.set(product.id, product);
      }
    }
    
    cachedProducts = Array.from(uniqueProductsMap.values());
    return cachedProducts;
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

export async function getCategories(): Promise<string[]> {
  const products = await getProducts();
  const categories = new Set(products.map(p => p.category).filter(Boolean));
  return Array.from(categories);
}
