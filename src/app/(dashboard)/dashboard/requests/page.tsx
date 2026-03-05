import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { CalendarDays, MapPin, Clock, Music, CheckCircle, XCircle, Clock4, Inbox } from "lucide-react";
import RequestCard from "./RequestCard";

export default async function BookingRequestsPage() {
    const supabase = await createClient();

    // The middleware ensures we are authenticated here
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch the DJ's profile to get the profile_id matching the user
    // Since we associate booking requests by profile_id
    let profileId = null;
    let requests: any[] = [];

    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('user_id', user.id)
            .single();

        if (profile) {
            profileId = profile.id;

            // Fetch booking requests
            const { data } = await supabase
                .from('booking_requests')
                .select('*')
                .eq('profile_id', profileId)
                .order('created_at', { ascending: false });

            if (data) requests = data;
        }
    }

    const pendingCount = requests.filter(r => r.status === 'pending').length;

    return (
        <div className="max-w-5xl mx-auto animate-fade-in relative z-10 pb-20">
            <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 flex items-center gap-3">
                    <Inbox className="w-8 h-8 text-cyan-400" /> Booking Requests
                </h1>
                <p className="text-slate-400 text-lg">Manage inquiries and leads from your EPK.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="glass-panel p-4 rounded-xl border-l-4 border-purple-500">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total</p>
                    <p className="text-2xl font-black text-white">{requests.length}</p>
                </div>
                <div className="glass-panel p-4 rounded-xl border-l-4 border-amber-500">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Pending</p>
                    <p className="text-2xl font-black text-amber-400">{pendingCount}</p>
                </div>
            </div>

            {requests.length === 0 ? (
                <div className="glass-panel rounded-2xl p-12 text-center border-dashed border-2 border-slate-700">
                    <Inbox className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No requests yet!</h3>
                    <p className="text-slate-400 max-w-md mx-auto">
                        When promoters fill out the booking form on your EPK, the requests will appear here. Share your link to start getting bookings!
                    </p>
                </div>
            ) : (
                <div className="space-y-4 shadow-xl">
                    {requests.map((req) => (
                        <RequestCard key={req.id} request={req} />
                    ))}
                </div>
            )}
        </div>
    );
}
