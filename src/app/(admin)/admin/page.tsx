import Link from "next/link";
import { Users, CreditCard, Search, ToggleRight, Trash2, DownloadCloud } from "lucide-react";

export default function AdminPanel() {
    const users = [
        { id: 1, name: "DJ Marcus", email: "marcus@example.com", status: "Published", joined: "Oct 24, 2024" },
        { id: 2, name: "Sarah B", email: "sarah@example.com", status: "Draft", joined: "Oct 25, 2024" },
        { id: 3, name: "Elena Dub", email: "elena@example.com", status: "Published", joined: "Oct 26, 2024" },
        { id: 4, name: "The Twins", email: "twins@example.com", status: "Draft", joined: "Oct 27, 2024" },
    ];

    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-12">
            <div className="max-w-7xl mx-auto animate-fade-in">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white mb-1">Admin Dashboard</h1>
                        <p className="text-slate-400">Manage users, profiles, and payments.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-colors text-sm border border-white/5">
                            <DownloadCloud className="w-4 h-4" /> Export GDPR Data
                        </button>
                    </div>
                </div>

                {/* Admin Stats */}
                <div className="grid sm:grid-cols-3 gap-6 mb-10">
                    <div className="glass-panel p-6 rounded-2xl border-white/5 flex items-center gap-4 border-l-4 border-l-purple-500">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">Total Users</h3>
                            <p className="text-3xl font-black text-white">1,204</p>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border-white/5 flex items-center gap-4 border-l-4 border-l-cyan-500">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">Published (£5.99)</h3>
                            <p className="text-3xl font-black text-white">482</p>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="glass-panel rounded-3xl border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-lg font-bold text-white">Recent Profiles</h2>
                        <div className="relative w-full sm:w-64">
                            <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search by email..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-900/50">
                                    <th className="p-4 font-semibold text-slate-400 text-sm">DJ Name</th>
                                    <th className="p-4 font-semibold text-slate-400 text-sm">Email</th>
                                    <th className="p-4 font-semibold text-slate-400 text-sm">Status</th>
                                    <th className="p-4 font-semibold text-slate-400 text-sm">Joined</th>
                                    <th className="p-4 font-semibold text-slate-400 text-sm text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map(u => (
                                    <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="p-4 text-white font-medium">{u.name}</td>
                                        <td className="p-4 text-slate-400 text-sm">{u.email}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex px-2 py-1 rounded-md text-xs font-bold ${u.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                                                {u.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-400 text-sm">{u.joined}</td>
                                        <td className="p-4 flex gap-2 justify-end">
                                            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="Toggle Publish Status">
                                                <ToggleRight className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors" title="Remove Abuse">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div >
    );
}
