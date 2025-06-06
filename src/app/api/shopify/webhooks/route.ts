import { NextResponse } from 'next/server';
import { Shopify } from '@shopify/shopify-api';
import type { ShopifyWebhook } from '@/types/shopify';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = request.headers.get('x-shopify-topic');
    const hmac = request.headers.get('x-shopify-hmac-sha256');

    // Verify webhook authenticity
    const isValid = Shopify.Utils.validateWebhookHmac(
      body,
      hmac || '',
      process.env.SHOPIFY_SECRET || ''
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // Handle different webhook topics
    switch (topic) {
      case 'products/create':
      case 'products/update':
        await handleProductWebhook(body);
        break;
      case 'orders/create':
      case 'orders/updated':
        await handleOrderWebhook(body);
        break;
      case 'customers/create':
      case 'customers/update':
        await handleCustomerWebhook(body);
        break;
      default:
        console.log(`Unhandled webhook topic: ${topic}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleProductWebhook(data: any) {
  // Implement product webhook handling logic
  console.log('Product webhook received:', data);
}

async function handleOrderWebhook(data: any) {
  // Implement order webhook handling logic
  console.log('Order webhook received:', data);
}

async function handleCustomerWebhook(data: any) {
  // Implement customer webhook handling logic
  console.log('Customer webhook received:', data);
} 