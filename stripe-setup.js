const stripe = require('stripe');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

// We will run this function for both TEST and LIVE modes.
async function setupStripe(mode) {
    const isLive = mode === 'LIVE';
    const secretKey = isLive ? process.env.STRIPE_SECRET_KEY : process.env.STRIPE_SECRET_TEST_KEY;
    
    if (!secretKey) {
        throw new Error(`Missing secret key for ${mode} mode`);
    }

    const stripeClient = stripe(secretKey);
    console.log(`\n=== Starting Stripe Setup for ${mode} MODE ===`);

    // 1. Archive existing payment links, prices, and products
    // Note: Stripe doesn't allow deleting products that have been used, so archiving (setting active=false) is standard.
    
    // Deactivate generic Payment Links
    const paymentLinks = await stripeClient.paymentLinks.list({ limit: 100, active: true });
    console.log(`Archiving ${paymentLinks.data.length} payment links...`);
    for (const link of paymentLinks.data) {
        await stripeClient.paymentLinks.update(link.id, { active: false });
    }

    // Deactivate Products (this automatically hides their prices in checkout if they were active)
    const products = await stripeClient.products.list({ limit: 100, active: true });
    console.log(`Archiving ${products.data.length} products...`);
    for (const prod of products.data) {
        await stripeClient.products.update(prod.id, { active: false });
    }
    
    // (Prices don't technically need manual archiving if the product is archived, but we can do it for cleanliness)
    const prices = await stripeClient.prices.list({ limit: 100, active: true });
    for (const price of prices.data) {
        await stripeClient.prices.update(price.id, { active: false });
    }
    
    console.log('--- Cleanup Complete ---');

    // 2. Create New Products and Prices
    console.log('Creating new products...');
    
    // Product 1: Dubai guide
    const dubaiProduct = await stripeClient.products.create({
        name: 'Dubai Guide',
        description: 'Comprehensive guide to Dubai'
    });
    const dubaiPrice = await stripeClient.prices.create({
        product: dubaiProduct.id,
        unit_amount: 5000, // $50.00
        currency: 'usd',
    });
    const dubaiLink = await stripeClient.paymentLinks.create({
        line_items: [{ price: dubaiPrice.id, quantity: 1 }],
    });

    // Product 2: AI agents for productivity
    const aiProduct = await stripeClient.products.create({
        name: 'AI Agents for Productivity',
        description: 'Maximize your productivity with AI agents'
    });
    const aiPrice = await stripeClient.prices.create({
        product: aiProduct.id,
        unit_amount: 5000, // $50.00
        currency: 'usd',
    });
    const aiLink = await stripeClient.paymentLinks.create({
        line_items: [{ price: aiPrice.id, quantity: 1 }],
    });

    console.log(`Created: Dubai Guide -> ${dubaiLink.url}`);
    console.log(`Created: AI Agents -> ${aiLink.url}`);
    
    return {
        mode,
        dubaiLink: dubaiLink.url,
        aiLink: aiLink.url
    };
}

async function main() {
    try {
        const testResults = await setupStripe('TEST');
        const liveResults = await setupStripe('LIVE');
        
        console.log('\n--- Final Links ---');
        console.log(JSON.stringify({
            test: testResults,
            live: liveResults
        }, null, 2));

    } catch (e) {
        console.error("Error setting up Stripe:", e);
    }
}

main();
