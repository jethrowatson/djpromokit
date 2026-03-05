'use client';

import { useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';

export default function CheckoutButton({
    className = "w-full flex items-center justify-center rounded-xl bg-purple-600 px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_-5px_#8b5cf6] hover:bg-purple-500 transition-all hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0",
    text = "Pay & Publish Now"
}: {
    className?: string,
    text?: string
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/profile/publish', {
                method: 'POST',
            });
            const data = await res.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error(data.error);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Failed to create checkout session', error);
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={isLoading}
            className={className}
        >
            {isLoading ? (
                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
            ) : (
                <CreditCard className="mr-2 w-5 h-5" />
            )}
            {isLoading ? 'Redirecting...' : text}
        </button>
    );
}
