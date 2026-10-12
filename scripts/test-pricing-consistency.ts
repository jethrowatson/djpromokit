import fs from 'fs';
import path from 'path';
import { PRICING } from '../src/config/pricing';

let failed = false;

function assert(condition: boolean, msg: string) {
    if (!condition) {
        console.error(`❌ FAIL: ${msg}`);
        failed = true;
    } else {
        console.log(`✅ PASS: ${msg}`);
    }
}

console.log("=== Testing Pricing Consistency ===");

// 1. Centralized config check
assert(PRICING.publishPrice === '£5.99', "PRICING.publishPrice must be £5.99");
assert(PRICING.unitAmountPence === 599, "PRICING.unitAmountPence must be 599");
assert(PRICING.referencePrice === '£10.99', "PRICING.referencePrice must be £10.99");

// 2. Stripe endpoints check
const publishRoute = fs.readFileSync(path.join(process.cwd(), 'src/app/api/profile/publish/route.ts'), 'utf8');
assert(publishRoute.includes('unit_amount: 599'), "Stripe publish route unit_amount is 599 pence (£5.99)");

const directRoute = fs.readFileSync(path.join(process.cwd(), 'src/app/api/checkout/direct/route.ts'), 'utf8');
assert(directRoute.includes('unit_amount: 599'), "Stripe direct checkout route unit_amount is 599 pence (£5.99)");

// 3. How it works check
const howItWorks = fs.readFileSync(path.join(process.cwd(), 'src/app/(marketing)/how-it-works/page.tsx'), 'utf8');
assert(!howItWorks.includes('for a one-time £10.99 fee'), "how-it-works does not claim £10.99 as the publish fee");
assert(howItWorks.includes('£5.99'), "how-it-works displays £5.99");

// 4. Meta Pixel toast check
const toast = fs.readFileSync(path.join(process.cwd(), 'src/app/(dashboard)/dashboard/PaymentStatusToast.tsx'), 'utf8');
assert(toast.includes("value: 5.99"), "Meta Pixel Purchase event tracks 5.99");

if (failed) {
    console.error("\n❌ Pricing consistency checks failed.");
    process.exit(1);
} else {
    console.log("\n✅ All pricing consistency checks passed.");
}
