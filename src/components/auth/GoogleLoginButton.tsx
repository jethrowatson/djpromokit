"use client";

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface GoogleLoginButtonProps {
    text?: "signin_with" | "signup_with" | "continue_with";
}

export default function GoogleLoginButton({ text = "continue_with" }: GoogleLoginButtonProps) {
    const supabase = createClient();
    const router = useRouter();
    const buttonRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCredentialResponse = async (response: any) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.credential,
            });

            if (error) {
                console.error("Google Sign In Error:", error);
                router.push('/login?error=' + encodeURIComponent(error.message));
                return;
            }

            // Successfully authenticated via id_token.
            // Our dashboard auto-healer will automatically intercept new Google users 
            // and seed their 'profiles' and 'djs' tables if they don't exist yet!
            router.push('/dashboard');
        } catch (e) {
            console.error("Unknown error during Google auth", e);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Initialize if script already loaded (e.g. on soft navigation)
        const initGoogle = () => {
            if (window.google?.accounts?.id && buttonRef.current) {
                window.google.accounts.id.initialize({
                    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'PENDING_CLIENT_ID',
                    callback: handleCredentialResponse,
                    context: text === "signup_with" ? "signup" : "signin",
                });
                window.google.accounts.id.renderButton(buttonRef.current, {
                    theme: 'filled_black',
                    size: 'large',
                    text: text,
                    shape: 'rectangular',
                    width: 350
                });
            }
        };

        initGoogle();
    }, [text]);

    return (
        <div className="w-full flex justify-center relative">
            <Script
                src="https://accounts.google.com/gsi/client"
                strategy="afterInteractive"
                onLoad={() => {
                    if (window.google?.accounts?.id && buttonRef.current) {
                        window.google.accounts.id.initialize({
                            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'PENDING_CLIENT_ID',
                            callback: handleCredentialResponse,
                            context: text === "signup_with" ? "signup" : "signin",
                        });
                        window.google.accounts.id.renderButton(buttonRef.current, {
                            theme: 'filled_black',
                            size: 'large',
                            text: text,
                            shape: 'rectangular',
                            width: 350
                        });
                    }
                }}
            />
            
            <div ref={buttonRef} className="min-h-[40px] flex items-center justify-center">
                {/* Fallback styling placeholder while script loads */}
            </div>
            
            {isLoading && (
                <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center rounded-lg z-10 w-full h-[40px]">
                    <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}

// Global declaration for the injected google object
declare global {
    interface Window {
        google?: any;
    }
}
