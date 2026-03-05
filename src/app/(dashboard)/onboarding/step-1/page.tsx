import { createClient } from "@/lib/supabase/server";
import { ArrowRight, User, MapPin, Music } from "lucide-react";
import { redirect } from "next/navigation";
import { saveStep1Basics } from "./actions";

export default async function Step1Basics() {
    const supabase = await createClient();

    // Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    // Fetch Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, location, genres, tagline')
        .eq('user_id', user.id)
        .single();

    const primaryGenre = profile?.genres?.[0] || '';
    const secondaryGenre = profile?.genres?.[1] || '';
    const genres = [
        "House", "Techno", "Tech House", "Deep House", "Drum & Bass",
        "Dubstep", "Hip Hop", "R&B", "Pop", "Open Format", "Wedding/Events"
    ];

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2">The Basics</h1>
                <p className="text-slate-400">Let's start with your core identity. This is what promoters will see first.</p>
            </div>

            <form action={saveStep1Basics} className="space-y-6">
                <div>
                    <label htmlFor="dj-name" className="block text-sm font-medium text-slate-300">
                        DJ Name <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="text"
                            name="djName"
                            id="djName"
                            defaultValue={profile?.full_name || ''}
                            required
                            className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                            placeholder="e.g. Calvin Harris"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-300">
                        Location (City) <span className="text-red-400">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            required
                            defaultValue={profile?.location || ''}
                            className="block w-full pl-10 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                            placeholder="e.g. London, UK"
                        />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="primary-genre" className="block text-sm font-medium text-slate-300">
                            Primary Genre <span className="text-red-400">*</span>
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm border border-slate-700 bg-slate-900 overflow-hidden">
                            <select
                                id="primaryGenre"
                                name="primaryGenre"
                                defaultValue={primaryGenre}
                                required
                                className="block w-full pl-3 pr-10 py-3 bg-transparent text-white focus:ring-purple-500 focus:border-purple-500 sm:text-sm appearance-none outline-none"
                            >
                                <option value="" disabled className="bg-slate-900">Select a genre</option>
                                {genres.map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400 bg-slate-800 border-l border-slate-700">
                                <Music className="h-4 w-4" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="secondary-genre" className="block text-sm font-medium text-slate-300">
                            Secondary Genre <span className="text-slate-500 text-xs font-normal">(Optional)</span>
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm border border-slate-700 bg-slate-900 overflow-hidden">
                            <select
                                id="secondaryGenre"
                                name="secondaryGenre"
                                className="block w-full pl-3 pr-10 py-3 bg-transparent text-white focus:ring-purple-500 focus:border-purple-500 sm:text-sm appearance-none outline-none"
                                defaultValue={secondaryGenre}
                            >
                                <option value="" disabled className="bg-slate-900">Select another</option>
                                {genres.map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="tagline" className="block text-sm font-medium text-slate-300">
                        Tagline <span className="text-slate-500 text-xs font-normal">(Optional, max 80 chars)</span>
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="tagline"
                            id="tagline"
                            defaultValue={profile?.tagline || ''}
                            maxLength={80}
                            className="block w-full px-4 bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-purple-500 focus:border-purple-500 sm:text-sm py-3 transition-colors"
                            placeholder="e.g. Bringing high energy to the dancefloor."
                        />
                    </div>
                </div>

                <div className="pt-6 flex justify-end gap-3">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all hover-glow"
                    >
                        Save and Continue
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </div>
            </form>
        </div>
    );
}
