export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  tags: string[];
  price: string;
  compareAtPrice?: string;
  images: {
    src: string;
    alt: string;
  }[];
  variants: {
    id: string;
    title: string;
    price: string;
    inventoryQuantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  createdAt: string;
  totalPrice: string;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  lineItems: {
    id: string;
    title: string;
    quantity: number;
    price: string;
    variantId: string;
  }[];
  status: 'open' | 'closed' | 'cancelled';
  tags: string[];
}

export interface ShopifyCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  tags: string[];
  ordersCount: number;
  totalSpent: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyWebhook {
  id: string;
  topic: string;
  address: string;
  format: 'json' | 'xml';
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyConfig {
  storeDomain: string;
  apiKey: string;
  apiSecret: string;
  apiVersion: string;
  webhookRoutes: string[];
  autoSync: boolean;
  productTags: string[];
  currency: string;
  location: string;
} 