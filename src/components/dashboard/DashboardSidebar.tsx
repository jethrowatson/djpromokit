"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AudioWaveform, Copy, Eye, FileText, BarChart3, Settings, Play, Inbox, LogOut, Menu, X } from "lucide-react";
import { usePathname } from 'next/navigation';

interface DashboardSidebarProps {
    username: string;
    logoutAction: () => void;
}

export const DashboardSidebar = ({ username, logoutAction }: DashboardSidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const closeNav = () => setIsOpen(false);

    // Active state helper
    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { name: 'Overview', href: '/dashboard', icon: Play },
        { name: 'Statistics', href: '/dashboard/stats', icon: BarChart3 },
        { name: 'Booking Requests', href: '/dashboard/requests', icon: Inbox },
        { name: 'Edit Profile', href: '/dashboard/edit', icon: FileText },
        { name: 'View Live Profile', href: username ? `/${username}?preview=true` : "#", icon: Eye },
    ];

    const LinkItem = ({ href, icon: Icon, children }: any) => {
        const active = isActive(href);
        return (
            <Link
                href={href}
                onClick={closeNav}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${active
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
                    }`}
            >
                <Icon className="w-5 h-5" />
                {children}
            </Link>
        );
    };

    return (
        <>
            {/* MOBILE TOP BAR (Hidden on MD+) */}
            <div className="md:hidden flex items-center justify-between bg-slate-900 border-b border-white/5 p-4 relative z-50">
                <Link href="/" className="flex items-center gap-2 group" onClick={closeNav}>
                    <AudioWaveform className="w-6 h-6 text-cyan-500 group-hover:text-purple-400 transition-colors" />
                    <span className="font-bold text-lg text-white">DJ Promo Kit</span>
                </Link>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* SIDEBAR NAVIGATION */}
            {/* On mobile: fixed overlay, translating in/out based on state */}
            {/* On desktop: static flex-shrink block */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-white/5 flex flex-col transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 md:flex-shrink-0
                ${isOpen ? 'translate-x-0 pt-16 md:pt-0' : '-translate-x-full'}
            `}>

                {/* Desktop Logo Header */}
                <div className="hidden md:flex p-6 border-b border-white/5 items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <AudioWaveform className="w-8 h-8 text-cyan-500 group-hover:text-purple-400 transition-colors" />
                        <span className="font-bold text-xl text-white">DJ Promo Kit</span>
                    </Link>
                </div>

                <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
                    {navLinks.map((link) => (
                        <LinkItem key={link.name} href={link.href} icon={link.icon}>
                            {link.name}
                        </LinkItem>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-2 bg-slate-900">
                    <LinkItem href="/dashboard/settings" icon={Settings}>
                        Account Settings
                    </LinkItem>
                    <form action={logoutAction}>
                        <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors font-medium text-left">
                            <LogOut className="w-5 h-5" /> Log Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Mobile Overlay Background (dims the page underneath) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={closeNav}
                />
            )}
        </>
    );
};
