"use client";

import { useState } from "react";
import Step1Form from "@/app/(dashboard)/onboarding/step-1/Step1Form";
import Step2Form from "@/app/(dashboard)/onboarding/step-2/Step2Form";
import ImageUpload from "@/components/ui/ImageUpload";
import { saveProfileAvatar, addPressShot, removePressShot } from "@/app/(dashboard)/onboarding/step-3/actions";
import Step4Client from "@/app/(dashboard)/onboarding/step-4/Step4Client";
import Step5Form from "@/app/(dashboard)/onboarding/step-5/Step5Form";
import BookingForm from "@/app/(dashboard)/onboarding/step-6/BookingForm";
import { User, Music, Camera, BookText, Link as LinkIcon, Calendar, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ProfileEditor({ profile, pressShots, featuredMixes, socialLink }: { profile: any, pressShots: any[], featuredMixes: any[], socialLink: any }) {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState(1);

    const tabs = [
        { id: 1, label: "Basic Info", icon: User, key: 'basic' },
        { id: 2, label: "Mixes", icon: Music, key: 'mixes' },
        { id: 3, label: "Photos", icon: Camera, key: 'photos' },
        { id: 4, label: "Biography", icon: BookText, key: 'bio' },
        { id: 5, label: "Socials", icon: LinkIcon, key: 'socials' },
        { id: 6, label: "Booking", icon: Calendar, key: 'booking' },
    ];

    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam) {
            const foundTab = tabs.find(t => t.key === tabParam);
            if (foundTab) setActiveTab(foundTab.id);
        }
    }, [searchParams]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 1:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Basic Profile Info</h2>
                            <p className="text-slate-400 text-sm sm:text-base">Manage your core identity and the genres you play.</p>
                        </div>
                        <Step1Form profile={{
                            name: profile.name,
                            location: profile.location,
                            genres: profile.genres || [],
                            tagline: profile.tagline
                        }} />
                    </div>
                );
            case 2:
                const mixes = featuredMixes.map(m => ({ title: m.title || 'Mix', url: m.url }));
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Featured Mixes</h2>
                            <p className="text-slate-400 text-sm sm:text-base">Update the mix displayed on your EPK.</p>
                        </div>
                        <Step2Form existingMixUrl={mixes.length > 0 ? mixes[0].url : ''} />
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Profile Photos</h2>
                            <p className="text-slate-400 text-sm sm:text-base">Manage your avatar and press shots.</p>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Profile Photo</h3>
                                <div className="flex items-center gap-6">
                                    <ImageUpload type="avatar" bucket="avatars" currentImageUrl={profile.avatar_url} onUploadComplete={saveProfileAvatar} />
                                </div>
                            </div>
                            <hr className="border-white/5" />
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Press Shots</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {pressShots.map((shot) => (
                                        <ImageUpload key={shot.id} type="press_shot" bucket="press_shots" currentImageUrl={shot.url} onDelete={async () => { await removePressShot(shot.id); }} onUploadComplete={async () => {}} />
                                    ))}
                                    {pressShots.length < 5 && (
                                        <ImageUpload type="press_shot" bucket="press_shots" onUploadComplete={addPressShot} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Biography</h2>
                            <p className="text-slate-400 text-sm sm:text-base">Edit your professional artist biography.</p>
                        </div>
                        <Step4Client profile={profile} />
                    </div>
                );
            case 5:
                const socialsRecord = {
                    instagram: socialLink?.instagram,
                    soundcloud: socialLink?.soundcloud,
                    mixcloud: socialLink?.mixcloud,
                    youtube: socialLink?.youtube,
                    spotify: socialLink?.spotify,
                    resident_advisor: socialLink?.resident_advisor
                };
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Social Links</h2>
                            <p className="text-slate-400 text-sm sm:text-base">Update social profiles on your EPK.</p>
                        </div>
                        <Step5Form existingSocials={socialsRecord as any} />
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <div className="mb-4">
                            <h2 className="text-2xl font-extrabold text-white">Booking Preferences</h2>
                            <p className="text-slate-400 text-sm sm:text-base">Configure how promoters contact you.</p>
                        </div>
                        <BookingForm defaults={{
                            bookingType: profile.booking_type || 'form',
                            publicEmail: profile.public_email || '',
                            agentName: profile.agent_name || '',
                            feeRange: profile.fee_range || '',
                            availNotes: profile.availability_notes || ''
                        }} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start animate-fade-in relative">
            {/* Desktop Sidebar / Mobile Horizontal Scroll */}
            <div className="lg:col-span-3 glass-panel rounded-2xl p-2 border-white/5 relative min-w-0">
                <div className="overflow-x-auto lg:overflow-x-visible hide-scrollbar relative z-10 w-full">
                    <nav className="flex lg:flex-col gap-1 min-w-max lg:min-w-0 pb-1 lg:pb-0 px-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap lg:whitespace-normal text-left
                                        ${isActive 
                                            ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_-3px_#8b5cf6]' 
                                            : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                                        }
                                    `}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
                {/* Scroll Indicator Gradient for mobile */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent lg:hidden pointer-events-none rounded-r-2xl flex items-center justify-end pr-1">
                    <ArrowRight className="w-3 h-3 text-slate-500 opacity-50" />
                </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-9 glass-panel rounded-3xl p-5 sm:p-10 border border-white/5 relative overflow-hidden bg-slate-900 shadow-2xl">
                {renderTabContent()}
            </div>
        </div>
    );
}
