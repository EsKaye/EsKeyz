import { Shopify } from '@shopify/shopify-api';
import { ShopifyConfig, ShopifyProduct, ShopifyOrder, ShopifyCustomer } from '@/types/shopify';

class ShopifyClient {
  private client: typeof Shopify;
  private config: ShopifyConfig;

  constructor(config: ShopifyConfig) {
    this.config = config;
    this.initializeClient();
  }

  private initializeClient() {
    this.client = Shopify;
    this.client.Context.initialize({
      API_KEY: this.config.apiKey,
      API_SECRET_KEY: this.config.apiSecret,
      SCOPES: [
        'read_products',
        'write_products',
        'read_orders',
        'write_orders',
        'read_customers',
        'write_customers',
        'read_inventory',
        'write_inventory'
      ],
      HOST_NAME: this.config.storeDomain,
      API_VERSION: this.config.apiVersion,
      IS_EMBEDDED_APP: false,
    });
  }

  async getProducts(): Promise<ShopifyProduct[]> {
    const client = new this.client.Clients.Rest(this.config.storeDomain, this.config.apiKey);
    const response = await client.get({
      path: 'products',
    });
    return response.body.products;
  }

  async getOrders(): Promise<ShopifyOrder[]> {
    const client = new this.client.Clients.Rest(this.config.storeDomain, this.config.apiKey);
    const response = await client.get({
      path: 'orders',
    });
    return response.body.orders;
  }

  async getCustomers(): Promise<ShopifyCustomer[]> {
    const client = new this.client.Clients.Rest(this.config.storeDomain, this.config.apiKey);
    const response = await client.get({
      path: 'customers',
    });
    return response.body.customers;
  }

  async createProduct(product: Partial<ShopifyProduct>): Promise<ShopifyProduct> {
    const client = new this.client.Clients.Rest(this.config.storeDomain, this.config.apiKey);
    const response = await client.post({
      path: 'products',
      data: { product },
    });
    return response.body.product;
  }

  async updateProduct(id: string, product: Partial<ShopifyProduct>): Promise<ShopifyProduct> {
    const client = new this.client.Clients.Rest(this.config.storeDomain, this.config.apiKey);
    const response = await client.put({
      path: `products/${id}`,
      data: { product },
    });
    return response.body.product;
  }

  async deleteProduct(id: string): Promise<void> {
    const client = new this.client.Clients.Rest(this.config.storeDomain, this.config.apiKey);
    await client.delete({
      path: `products/${id}`,
    });
  }

  async syncInventory(): Promise<void> {
    const client = new this.client.Clients.Rest(this.config.storeDomain, this.config.apiKey);
    const products = await this.getProducts();
    
    for (const product of products) {
      for (const variant of product.variants) {
        await client.put({
          path: `variants/${variant.id}`,
          data: {
            variant: {
              inventory_quantity: variant.inventoryQuantity,
            },
          },
        });
      }
    }
  }
}

// Initialize the Shopify client with environment variables
const shopifyClient = new ShopifyClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  apiKey: process.env.SHOPIFY_API_KEY || '',
  apiSecret: process.env.SHOPIFY_SECRET || '',
  apiVersion: '2024-01',
  webhookRoutes: ['/orders', '/products', '/customers'],
  autoSync: true,
  productTags: ['divine', 'limited', 'keyed-in'],
  currency: 'USD',
  location: 'online-only temple',
});

export default shopifyClient; 