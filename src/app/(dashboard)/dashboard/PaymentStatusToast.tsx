'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, X } from "lucide-react";

export default function PaymentStatusToast() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'success' | 'canceled' | null>(null);

    useEffect(() => {
        const paymentParam = searchParams.get('payment');
        if (paymentParam === 'success' || paymentParam === 'canceled') {
            setStatus(paymentParam);
            // Optional: Remove query param from URL without refreshing
            const url = new URL(window.location.href);
            url.searchParams.delete('payment');
            window.history.replaceState({}, '', url);

            // Auto-hide after 10s
            const timer = setTimeout(() => setStatus(null), 10000);
            return () => clearTimeout(timer);
        }
    }, [searchParams]);

    if (!status) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div className={`flex items-start gap-3 p-4 pr-12 rounded-2xl shadow-2xl border backdrop-blur-md relative ${status === 'success'
                    ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-100'
                    : 'bg-red-950/90 border-red-500/30 text-red-100'
                }`}>
                <div className="flex-shrink-0 mt-0.5">
                    {status === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                    )}
                </div>
                <div>
                    <h4 className={`font-bold text-sm ${status === 'success' ? 'text-emerald-300' : 'text-red-300'}`}>
                        {status === 'success' ? 'Payment Successful' : 'Payment Canceled'}
                    </h4>
                    <p className="text-xs mt-1 opacity-80 leading-relaxed">
                        {status === 'success'
                            ? 'Your EPK is now permanently published and synced with the network.'
                            : 'Your checkout was canceled. Your EPK remains in draft mode until published.'}
                    </p>
                </div>
                <button
                    onClick={() => setStatus(null)}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
