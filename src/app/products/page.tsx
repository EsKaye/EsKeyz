import { Suspense } from 'react';
import type { ShopifyProduct } from '@/types/shopify';
import shopifyClient from '@/lib/shopify';

async function getProducts(): Promise<ShopifyProduct[]> {
  return await shopifyClient.getProducts();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-obsidian text-neon-violet p-8">
      <h1 className="text-4xl font-bold mb-8 text-liquid-gold">
        Divine Collection
      </h1>
      
      <Suspense fallback={<div>Loading products...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-midnight-haze rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              {product.images[0] && (
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}
              
              <h2 className="text-2xl font-semibold mb-2 text-liquid-gold">
                {product.title}
              </h2>
              
              <p className="text-neon-violet mb-4">
                {product.description}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-liquid-gold">
                  ${product.price}
                </span>
                
                {product.compareAtPrice && (
                  <span className="text-neon-violet line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-obsidian text-neon-violet rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
} 