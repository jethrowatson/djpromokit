import Link from "next/link";
import { AudioWaveform } from "lucide-react";
import SignupForm from "./SignupForm";

export default async function Signup(props: { searchParams: Promise<{ error?: string }> }) {
    const searchParams = await props.searchParams;
    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <Link href="/" className="flex justify-center items-center gap-2 mb-8 group">
                    <AudioWaveform className="w-10 h-10 text-cyan-500 group-hover:text-purple-400 transition-colors duration-300" />
                    <span className="font-bold text-2xl tracking-tight text-white">DJ Promo Kit</span>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Or{" "}
                    <Link href="/login" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                        log in to existing account
                    </Link>
                </p>
                {searchParams.error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold p-3 rounded-lg text-center mt-6">
                        {searchParams.error}
                    </div>
                )}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
                <div className="glass-panel py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border-white/10">
                    <SignupForm />
                </div>
            </div>
        </div>
    );
}

