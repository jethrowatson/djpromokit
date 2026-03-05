'use client';

import { useState } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ImageUploadProps {
    type: 'avatar' | 'press_shot';
    bucket: 'avatars' | 'press_shots';
    currentImageUrl?: string | null;
    onUploadComplete: (url: string) => void;
    onDelete?: () => void;
}

export default function ImageUpload({ type, bucket, currentImageUrl, onUploadComplete, onDelete }: ImageUploadProps) {
    const supabase = createClient();
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [localPreview, setLocalPreview] = useState<string | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        if (!file.type.startsWith('image/')) {
            setError('File must be an image');
            return;
        }

        setError('');
        setIsUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

            setLocalPreview(data.publicUrl);
            await onUploadComplete(data.publicUrl);
        } catch (err: any) {
            console.error('Error uploading image:', err);
            setError(err.message || 'Error uploading image');
        } finally {
            setIsUploading(false);
        }
    };

    const displayUrl = localPreview || currentImageUrl;

    if (displayUrl) {
        return (
            <div className={`relative group ${type === 'avatar' ? 'w-24 h-24 rounded-full' : 'aspect-[4/3] rounded-xl'} overflow-hidden bg-slate-800 border border-slate-700`}>
                <img src={displayUrl} alt={type} className="w-full h-full object-cover" />

                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    {onDelete && (
                        <button
                            onClick={() => {
                                setLocalPreview(null);
                                if (onDelete) onDelete();
                            }}
                            type="button"
                            className="bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            />

            {type === 'avatar' ? (
                <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center relative overflow-hidden group hover:border-purple-500 transition-colors">
                    {isUploading ? (
                        <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                    ) : (
                        <div className="text-slate-500 group-hover:text-purple-400 transition-colors flex flex-col items-center">
                            <UploadCloud className="w-6 h-6" />
                        </div>
                    )}
                </div>
            ) : (
                <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-purple-500 transition-colors flex flex-col items-center justify-center group overflow-hidden relative">
                    {isUploading ? (
                        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                    ) : (
                        <>
                            <div className="w-10 h-10 rounded-full bg-slate-800 group-hover:bg-purple-600 transition-colors flex items-center justify-center mb-2">
                                <span className="text-xl text-white font-light">+</span>
                            </div>
                            <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Add Photo</span>
                        </>
                    )}
                </div>
            )}

            {error && <p className="text-xs text-red-500 mt-2 absolute -bottom-6 w-max">{error}</p>}
        </div>
    );
}
