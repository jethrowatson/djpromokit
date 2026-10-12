

export const metadata = {
    title: 'Terms of Service | DJ Promo Kit',
    description: 'Terms of Service for using the DJ Promo Kit platform.',
};

export default function TermsOfServicePage() {
    return (
        <div className="text-white flex flex-col font-sans selection:bg-purple-500/30">
            <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border-white/10">
                    <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
                    <p className="text-slate-400 mb-8 max-w-2xl">Last Updated: March 2026</p>

                    <div className="prose prose-invert prose-slate max-w-none">
                        <p>Welcome to DJ Promo Kit. By accessing or using our website, services, and tools (collectively, the "Platform"), you agree to be bound by these Terms of Service.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p>By creating an account, generating an Electronic Press Kit (EPK), or otherwise using DJ Promo Kit, you agree to these terms. If you do not agree to all the terms, you may not access the Platform.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Description of Service & Product Lifetime</h2>
                        <p>DJ Promo Kit provides a toolset allowing DJs and musical artists to create, host, and distribute digital press kits, collect booking inquiries, and monitor profile analytics. References to "lifetime" access or hosting describe the operational lifetime of the DJ Promo Kit product and hosted service. While we endeavour to provide continuous, uninterrupted service, we reserve the right to modify, maintain, or update the platform as required.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. User Accounts</h2>
                        <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Content Ownership and Rights</h2>
                        <p>You retain all rights to the audio, images, biography text, and other content ("User Content") you upload to your EPK. By uploading User Content, you grant DJ Promo Kit a worldwide, non-exclusive license to host, display, and distribute this content solely for the purpose of rendering your public EPK.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Payments, Pricing & Cancellation Rights</h2>
                        <p>Core profile creation and drafting is free. Publishing an EPK to a live public URL, removing watermarks, and accessing analytics requires an introductory one-off payment of £5.99 (standard reference price: £10.99). There are no recurring subscriptions.</p>
                        <p className="mt-3"><strong>Statutory Cancellation & Refunds:</strong> Under UK consumer law (Consumer Contracts Regulations 2013), consumers normally have a 14-day statutory right to cancel a digital purchase. However, because our service begins immediate digital performance upon publication (provisioning your public URL, hosting your press kit assets, and initiating live analytics), you acknowledge that your statutory right of cancellation ends once performance of the digital service has begun upon publication. Nothing in these terms affects your statutory rights under the Consumer Rights Act 2015 if the service is faulty or not as described. If you experience technical difficulties, please contact our support team at support@djpromokit.com.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Acceptable Use</h2>
                        <p>You agree not to use DJ Promo Kit to:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-300">
                            <li>Upload copyrighted material for which you do not have the rights (e.g., unauthorized remixes or stolen press photography).</li>
                            <li>Distribute malicious software, spam, or phishing links.</li>
                            <li>Impersonate another DJ, artist, or music industry professional.</li>
                            <li>Host content that is illegal, deeply offensive, or violates our community standards.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Termination</h2>
                        <p>We reserve the right to terminate or suspend your account and access to the Platform immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Limitation of Liability</h2>
                        <p>In no event shall DJ Promo Kit, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Contact & Support</h2>
                        <p>If you have any questions about these Terms, need assistance, or wish to exercise your legal consumer rights, please contact our support desk at <a href="mailto:support@djpromokit.com" className="text-purple-400 underline">support@djpromokit.com</a>. We aim to respond to all inquiries within 1–2 business days.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
