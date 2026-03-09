

export const metadata = {
    title: 'Privacy Policy | DJ Promo Kit',
    description: 'Privacy Policy for the DJ Promo Kit platform.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="text-white flex flex-col font-sans selection:bg-purple-500/30">
            <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto glass-panel p-8 md:p-12 rounded-3xl border-white/10">
                    <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
                    <p className="text-slate-400 mb-8 max-w-2xl">Last Updated: March 2026</p>

                    <div className="prose prose-invert prose-slate max-w-none">
                        <p>At DJ Promo Kit, accessible from djpromokit.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by DJ Promo Kit and how we use it.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
                        <p>We collect several different types of information for various purposes to provide and improve our Service to you:</p>
                        <h3 className="text-xl font-bold text-white mt-6 mb-2">Personal Data</h3>
                        <p>While using our platform (e.g., during account creation or billing), we may ask you to provide us with certain personally identifiable information, including but not limited to:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2 text-slate-300">
                            <li>Email address</li>
                            <li>First name and last name</li>
                            <li>DJ stage name and geographical location</li>
                            <li>Social media profile links</li>
                        </ul>

                        <h3 className="text-xl font-bold text-white mt-6 mb-2">Usage Data & Analytics</h3>
                        <p>We may also collect information that your browser sends whenever you visit our Service. This Usage Data may include information such as your device's Internet Protocol address (e.g. IP address), browser type, the pages of our Service that you visit, the time and date of your visit, and diagnostic data. We also track interactions (views, button clicks, mix plays) on public DJ EPKs to provide performance statistics back to our users.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Use of Data</h2>
                        <p>DJ Promo Kit uses the collected data for various purposes:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-300">
                            <li>To provide and maintain our Service.</li>
                            <li>To notify you about changes to our Service.</li>
                            <li>To allow you to participate in interactive features of our platform (e.g., sending/receiving booking requests).</li>
                            <li>To provide customer support.</li>
                            <li>To gather analysis or valuable information so that we can improve our product.</li>
                            <li>To detect, prevent and address technical issues.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Data Security and Hosting</h2>
                        <p>The security of your data is important to us. Your data is housed securely within our Supabase (PostgreSQL) databases, protected by Row Level Security (RLS) policies. Please remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Third-Party Service Providers</h2>
                        <p>We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related services or assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. (e.g., Stripe for payment processing, Resend for transactional email routing).</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Children's Privacy</h2>
                        <p>Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Changes to This Privacy Policy</h2>
                        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

                        <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at privacy@djpromokit.com.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
