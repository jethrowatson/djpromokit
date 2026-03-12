import Link from "next/link";
import SecureSignupForm from "./SecureSignupForm";

export default async function SecureSignupPage({ searchParams }: { searchParams: Promise<{ email?: string, profileUrl?: string, error?: string }> }) {
    const resolvedParams = await searchParams;
    
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-0 right-[-10%] w-[50%] h-[500px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <Link href="/" className="flex justify-center mb-6">
                    <span className="text-2xl font-black tracking-tighter text-white">DJ<span className="text-purple-500">Promo</span>Kit</span>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Secure your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Almost there! Choose a strong password to continue.
                </p>
                {resolvedParams.error && (
                    <div className="mt-4 p-4 rounded-lg bg-red-900/30 border border-red-500/50 flex items-start gap-3 text-red-200">
                        <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">{resolvedParams.error}</p>
                    </div>
                )}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="glass-panel py-8 px-4 shadow-2xl sm:rounded-3xl sm:px-10 border border-slate-700">
                    <SecureSignupForm 
                        email={resolvedParams.email || ''} 
                        profileUrl={resolvedParams.profileUrl || ''} 
                    />
                </div>
            </div>
        </div>
    );
}
