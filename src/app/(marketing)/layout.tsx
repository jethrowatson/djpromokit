import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950">
            <Navbar />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
}
