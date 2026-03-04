import Link from "next/link";
import { Disc3, Menu, X } from "lucide-react";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <Disc3 className="w-8 h-8 text-purple-500 group-hover:text-cyan-400 transition-colors duration-300" />
                            <span className="font-bold text-xl tracking-tight text-white">DJpromokit<span className="text-purple-500">.com</span></span>
                        </Link>
                    </div>

                    <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                        <Link href="/how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">How it works</Link>
                        <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
                        <Link href="/examples" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Examples</Link>
                        <Link href="/sync" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                            SYNCdj <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 ring-1 ring-inset ring-cyan-500/20">NEW</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</Link>
                        <Link href="/signup" className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all hover-glow">Start free</Link>
                    </div>

                    <div className="flex md:hidden items-center">
                        {/* Mobile menu button could go here */}
                        <button type="button" className="text-slate-300 hover:text-white">
                            <span className="sr-only">Open main menu</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
