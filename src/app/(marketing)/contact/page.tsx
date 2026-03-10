import { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
    title: 'Contact Us | DJ Promo Kit',
    description: 'Get in touch with the DJ Promo Kit team. Have a question about building your EPK? We are here to help.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-12 pb-24 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Contact Us</h1>
                    <p className="text-xl text-slate-400">
                        Have a question about DJ Promo Kit? Need help with your EPK? Send us a message and we'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="max-w-xl mx-auto glass-panel p-6 md:p-10 rounded-3xl relative overflow-hidden border-purple-500/20">
                    <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none"></div>
                    <ContactForm />
                </div>

            </div>
        </div>
    );
}
