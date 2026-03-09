import Link from "next/link";
import { AudioWaveform, Mail, Lock, User, AtSign, ArrowRight } from "lucide-react";
import { signup } from "./actions";

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
                    <form className="space-y-6" action={signup}>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="dj-name" className="block text-sm font-medium text-slate-300">
                                    DJ Name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        id="dj-name"
                                        name="djName"
                                        type="text"
                                        required
                                        className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-3 transition-colors"
                                        placeholder="DJ Marcus"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-slate-300">
                                    Username
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <AtSign className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-3 transition-colors"
                                        placeholder="djmarcus"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-slate-500 text-right pr-1">djpromokit.com/djmarcus</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-3 transition-colors"
                                    placeholder="hello@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-3 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-slate-700 rounded bg-slate-900"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-slate-300">
                                I agree to the <Link href="/terms" target="_blank" className="text-cyan-400 hover:text-cyan-300">Terms of Service</Link> and <Link href="/privacy" target="_blank" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</Link>
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-900 transition-colors"
                            >
                                Create draft profile
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </div>

                        <div className="mt-6 text-center text-xs text-slate-500">
                            Free to build. £10.99 to publish. Secure payments via Stripe.
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
