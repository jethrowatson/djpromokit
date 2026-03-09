'use client';

import { useState } from 'react';
import { Loader2, ArrowRight, ArrowLeft, RefreshCw, Sparkles, Check } from 'lucide-react';

interface AIBioGeneratorProps {
    defaultValues: {
        djName: string;
        location: string;
        genres: string[];
    };
    onSave: (shortBio: string, longBio: string) => Promise<void>;
    onCancel: () => void;
}

export default function AIBioGenerator({ defaultValues, onSave, onCancel }: AIBioGeneratorProps) {
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        djName: defaultValues.djName || '',
        location: defaultValues.location || '',
        genres: defaultValues.genres || [],
        yearsDjing: '',
        performanceHistory: '',
        influences: '',
        isProducer: false,
        releases: '',
        labels: '',
        favoriteProducers: '',
        djStyle: '',
        goals: ''
    });

    // Generated Bios
    const [shortBio, setShortBio] = useState('');
    const [longBio, setLongBio] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleGenerate = async (isRegenerating = false) => {
        setIsGenerating(true);
        try {
            const body = {
                formData,
                ...(isRegenerating && { previousShortBio: shortBio, previousLongBio: longBio, feedback })
            };

            const res = await fetch('/api/generate-bio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to generate biography. Please check your API key.");
            }

            if (data.shortBio && data.longBio) {
                setShortBio(data.shortBio);
                setLongBio(data.longBio);
                setFeedback(''); // clear feedback after update
                if (!isRegenerating) setStep(7); // Move to review step if first time
            }
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Failed to generate biography.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        await onSave(shortBio, longBio);
        setIsSaving(false);
    };

    return (
        <div className="bg-[#020617] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-white flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-purple-400" />
                        AI Biography Creator
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                        {step < 7 ? `Step ${step} of 6` : 'Review & Refine'}
                    </p>
                </div>
                <button onClick={onCancel} className="text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800 rounded-lg px-3 py-1 text-sm font-medium transition-colors">
                    Cancel
                </button>
            </div>

            {/* Step 1: Basics */}
            {step === 1 && (
                <div className="space-y-6 animate-fade-in relative z-10">
                    <h3 className="text-lg font-bold text-white">Basic Background</h3>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">DJ / Artist Name</label>
                        <input type="text" value={formData.djName} onChange={(e) => setFormData({ ...formData, djName: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="e.g. Alex Rivera" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">How long have you been DJing?</label>
                        <select value={formData.yearsDjing} onChange={(e) => setFormData({ ...formData, yearsDjing: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none">
                            <option value="">Select experience</option>
                            <option value="Less than 1 year">Less than 1 year</option>
                            <option value="1 to 3 years">1 to 3 years</option>
                            <option value="3 to 5 years">3 to 5 years</option>
                            <option value="5 to 10 years">5 to 10 years</option>
                            <option value="More than 10 years">More than 10 years</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Where are you based?</label>
                        <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="e.g. London, UK" />
                    </div>
                </div>
            )}

            {/* Step 2: Performance */}
            {step === 2 && (
                <div className="space-y-6 animate-fade-in relative z-10">
                    <h3 className="text-lg font-bold text-white">Performance History</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Where have you performed before?</label>
                        <p className="text-xs text-slate-400 mb-3">List clubs, venues, festivals, or types of events you have played (e.g. Fabric, Ministry of Sound, local bars, weddings).</p>
                        <textarea rows={4} value={formData.performanceHistory} onChange={(e) => setFormData({ ...formData, performanceHistory: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="e.g. Played main room at Warehouse Project, resident at local tech-house nights..." />
                    </div>
                </div>
            )}

            {/* Step 3: Influences */}
            {step === 3 && (
                <div className="space-y-6 animate-fade-in relative z-10">
                    <h3 className="text-lg font-bold text-white">Musical Influences</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Which artists or DJs influence your sound?</label>
                        <p className="text-xs text-slate-400 mb-3">Artists you admire, DJs who inspire your style.</p>
                        <textarea rows={3} value={formData.influences} onChange={(e) => setFormData({ ...formData, influences: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="e.g. Carl Cox, Peggy Gou, Fred again.." />
                    </div>
                </div>
            )}

            {/* Step 4: Production */}
            {step === 4 && (
                <div className="space-y-6 animate-fade-in relative z-10">
                    <h3 className="text-lg font-bold text-white">Music Production</h3>

                    <div className="flex items-center gap-4 bg-slate-900/50 p-4 border border-slate-700 rounded-xl">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" checked={formData.isProducer} onChange={() => setFormData({ ...formData, isProducer: true })} className="w-4 h-4 text-purple-600 bg-slate-900 border-slate-600 focus:ring-purple-600" />
                            <span className="text-white font-medium">Yes, I produce music</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" checked={!formData.isProducer} onChange={() => setFormData({ ...formData, isProducer: false })} className="w-4 h-4 text-purple-600 bg-slate-900 border-slate-600 focus:ring-purple-600" />
                            <span className="text-white font-medium">No, just DJing</span>
                        </label>
                    </div>

                    {formData.isProducer && (
                        <div className="space-y-4 pt-2 border-t border-white/5 animate-fade-in">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Have you released music?</label>
                                <input type="text" value={formData.releases} onChange={(e) => setFormData({ ...formData, releases: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="e.g. 'Midnight EP', single on streaming platforms..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Have you released on any record labels?</label>
                                <input type="text" value={formData.labels} onChange={(e) => setFormData({ ...formData, labels: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="e.g. Defected, Toolroom..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Who are your favourite producers?</label>
                                <input type="text" value={formData.favoriteProducers} onChange={(e) => setFormData({ ...formData, favoriteProducers: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="..." />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Step 5: Style */}
            {step === 5 && (
                <div className="space-y-6 animate-fade-in relative z-10">
                    <h3 className="text-lg font-bold text-white">Personal Style</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">How would you describe your DJ style and what kind of experience do you want to create on the dance floor?</label>
                        <p className="text-xs text-slate-400 mb-3">Describe your sound, your energy, and what makes your DJ sets unique.</p>
                        <textarea rows={5} value={formData.djStyle} onChange={(e) => setFormData({ ...formData, djStyle: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="e.g. High energy, seamless transitions, focused on taking the crowd on an emotional journey..." />
                    </div>
                </div>
            )}

            {/* Step 6: Goals */}
            {step === 6 && (
                <div className="space-y-6 animate-fade-in relative z-10">
                    <h3 className="text-lg font-bold text-white">Future Aspirations</h3>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">What are your goals as a DJ?</label>
                        <p className="text-xs text-slate-400 mb-3">Tell us what you aspire to achieve as a DJ or producer.</p>
                        <textarea rows={4} value={formData.goals} onChange={(e) => setFormData({ ...formData, goals: e.target.value })} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none" placeholder="e.g. To play international festivals and launch my own record label..." />
                    </div>
                </div>
            )}

            {/* Step 7: Review & Edit */}
            {step === 7 && (
                <div className="space-y-8 animate-fade-in relative z-10">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-bold text-white">Short Biography</label>
                            <span className="text-xs text-slate-500">For Socials & EPK Header</span>
                        </div>
                        <textarea rows={4} value={shortBio} onChange={(e) => setShortBio(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-white focus:border-purple-500 outline-none leading-relaxed" />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-bold text-white">Long Biography</label>
                            <span className="text-xs text-slate-500">For Press Kits & Outreach</span>
                        </div>
                        <textarea rows={8} value={longBio} onChange={(e) => setLongBio(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-white focus:border-purple-500 outline-none leading-relaxed" />
                    </div>

                    <div className="bg-slate-900/50 p-4 border border-purple-500/20 rounded-xl space-y-3">
                        <label className="block text-sm pl-1 font-bold text-purple-300">Not quite right? AI Regeneration</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none text-sm"
                                placeholder="E.g. Make it more energetic, remove the part about..."
                            />
                            <button
                                onClick={() => handleGenerate(true)}
                                disabled={isGenerating || !feedback}
                                className="inline-flex items-center justify-center rounded-lg bg-slate-800 text-white px-4 py-2 text-sm font-bold shadow-sm hover:bg-slate-700 disabled:opacity-50 transition-colors"
                            >
                                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center relative z-10">
                {step < 7 && (
                    <button
                        onClick={() => setStep(step - 1)}
                        disabled={step === 1}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors disabled:opacity-30"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </button>
                )}

                {step === 7 && (
                    <button
                        onClick={() => setStep(1)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Retry Form
                    </button>
                )}

                <div className="ml-auto">
                    {step < 6 && (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="inline-flex items-center justify-center rounded-xl bg-slate-100 text-[#020617] px-6 py-2.5 text-sm font-bold shadow-sm hover:bg-white transition-colors"
                        >
                            Next <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    )}
                    {step === 6 && (
                        <button
                            onClick={() => handleGenerate(false)}
                            disabled={isGenerating}
                            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-purple-500 transition-all hover-glow disabled:opacity-70"
                        >
                            {isGenerating ? (
                                <>Generating... <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
                            ) : (
                                <>Generate Biography <Sparkles className="w-4 h-4 ml-2" /></>
                            )}
                        </button>
                    )}
                    {step === 7 && (
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-purple-500 transition-all hover-glow w-full sm:w-auto"
                        >
                            {isSaving ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                            ) : (
                                <><Check className="w-4 h-4 mr-2" /> Save to Profile</>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
