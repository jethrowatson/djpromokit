'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { submitContactForm, type ContactState } from './actions'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

const initialState: ContactState = {
    success: false,
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-base font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_-5px_#8b5cf6]"
        >
            {pending ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                </>
            ) : (
                <>
                    Send Message <Send className="ml-2 w-5 h-5" />
                </>
            )}
        </button>
    )
}

export default function ContactForm() {
    const [state, formAction] = useFormState(submitContactForm, initialState)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        if (state.success) {
            setIsSuccess(true)
        }
    }, [state.success])

    if (isSuccess) {
        return (
            <div className="glass-panel p-8 md:p-12 rounded-[2rem] border-emerald-500/30 text-center relative overflow-hidden max-w-xl mx-auto">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-500/10 mb-6">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-4">Message Sent!</h3>
                <p className="text-slate-300 text-lg mb-8">
                    {state.message}
                </p>
                <button
                    onClick={() => {
                        setIsSuccess(false);
                        state.success = false;
                    }}
                    className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
                >
                    Send another message
                </button>
            </div>
        )
    }

    return (
        <form action={formAction} className="space-y-6">
            {!state.success && state.message && (
                <div className="rounded-xl bg-red-500/10 p-4 border border-red-500/20 flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3 shrink-0" />
                    <p className="text-sm font-medium text-red-400">{state.message}</p>
                </div>
            )}

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
                <div className="mt-2 text-white">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="block w-full rounded-xl border-0 py-3.5 pl-4 bg-slate-800/50 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 placeholder:text-slate-500 transition-all font-medium"
                        placeholder="Your name"
                    />
                    {state.errors?.name && (
                        <p className="mt-2 text-sm text-red-400" id="name-error">{state.errors.name[0]}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email address</label>
                <div className="mt-2 text-white">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="block w-full rounded-xl border-0 py-3.5 pl-4 bg-slate-800/50 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 placeholder:text-slate-500 transition-all font-medium"
                        placeholder="you@example.com"
                    />
                    {state.errors?.email && (
                        <p className="mt-2 text-sm text-red-400" id="email-error">{state.errors.email[0]}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                <div className="mt-2 text-white">
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="block w-full rounded-xl border-0 py-3.5 pl-4 bg-slate-800/50 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 placeholder:text-slate-500 transition-all font-medium resize-none"
                        placeholder="How can we help?"
                    />
                    {state.errors?.message && (
                        <p className="mt-2 text-sm text-red-400" id="message-error">{state.errors.message[0]}</p>
                    )}
                </div>
            </div>

            <div className="pt-2">
                <SubmitButton />
            </div>
        </form>
    )
}
