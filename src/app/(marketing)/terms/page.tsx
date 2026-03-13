

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

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Description of Service</h2>
                        <p>DJ Promo Kit provides a toolset allowing DJs and musical artists to create, host, and distribute digital press kits, collect booking inquiries, and monitor profile analytics. We reserve the right to modify, suspend, or discontinue any tier of service at any time.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. User Accounts</h2>
                        <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Content Ownership and Rights</h2>
                        <p>You retain all rights to the audio, images, biography text, and other content ("User Content") you upload to your EPK. By uploading User Content, you grant DJ Promo Kit a worldwide, non-exclusive license to host, display, and distribute this content solely for the purpose of rendering your public EPK.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Payments and Publishing Fees</h2>
                        <p>Core profile creation is free. Publishing an EPK, exporting PDFs, and accessing advanced analytics require a one-time publishing fee (currently £5.99). This fee is non-refundable once an EPK has been published and rendered public.</p>

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

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Contact Us</h2>
                        <p>If you have any questions about these Terms, please contact us at support@djpromokit.com.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
