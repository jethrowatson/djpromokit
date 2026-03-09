import React from "react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/(marketing)/login/actions";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    let username = '';

    if (user) {
        const { data } = await supabase.from('profiles').select('username').eq('id', user.id).single();
        if (data) username = data.username;
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">

            {/* Responsive Sidebar Injection */}
            <DashboardSidebar username={username} logoutAction={logout} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto relative z-10 w-full">
                {/* Responsive padding container */}
                <div className="p-4 sm:p-6 md:p-10 w-full h-full relative">
                    <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-600/5 rounded-full blur-[70px] md:blur-[100px] pointer-events-none"></div>
                    {children}
                </div>
            </main>

        </div>
    );
}
