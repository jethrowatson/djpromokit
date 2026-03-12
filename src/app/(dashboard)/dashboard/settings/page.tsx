import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import AccountSettingsForm from "./AccountSettingsForm";

export default async function AccountSettingsPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!profile) {
        redirect('/dashboard');
    }

    return (
        <div className="pt-8">
            <div className="max-w-2xl mx-auto pb-24 animate-fade-in relative">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-white">Account Settings</h1>
                        <p className="text-slate-400">Manage your credentials and billing.</p>
                    </div>
                </div>

                <AccountSettingsForm user={user} profile={profile} />

            </div>
        </div>
    );
}
