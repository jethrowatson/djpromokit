import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BookingForm from "./BookingForm";

export default async function Step6Booking() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('booking_type, public_email, agent_name, fee_range, availability_notes')
    .eq('id', user.id)
    .single();

  const defaults = {
    bookingType: (profile?.booking_type || 'form') as 'form' | 'email',
    publicEmail: profile?.public_email || '',
    agentName: profile?.agent_name || '',
    feeRange: profile?.fee_range || '',
    availNotes: profile?.availability_notes || ''
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">Booking Contact</h1>
        <p className="text-slate-400">How should promoters reach out to book you?</p>
      </div>

      <BookingForm defaults={defaults} />
    </div>
  );
}
