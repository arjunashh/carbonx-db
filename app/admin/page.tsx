import prisma from "@/lib/db";
import { Terminal, Users, Database, Download, Lock } from "lucide-react";
import ExportButton from "@/components/ExportButton";

export const dynamic = "force-dynamic";

export default async function AdminPage({
    searchParams,
}: {
    searchParams: { pw?: string };
}) {
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "carbonx2026";
    const isAuthenticated = searchParams.pw === ADMIN_PASSWORD;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-dark-pure flex items-center justify-center p-4">
                <div className="glass p-8 rounded-3xl w-full max-w-md text-center">
                    <Lock className="w-12 h-12 text-carbon-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold neon-text mb-6 uppercase tracking-widest">Access Restricted</h1>
                    <form className="space-y-4">
                        <input
                            name="pw"
                            type="password"
                            placeholder="Enter Access Protocol"
                            className="input-field text-center font-mono"
                        />
                        <button className="neon-button w-full">INITIALIZE ACCESS</button>
                    </form>
                    <p className="mt-4 text-[10px] text-white/20 font-mono uppercase">Unauthorized access is logged.</p>
                </div>
            </div>
        );
    }

    const participants = await prisma.participant.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-dark-pure text-white p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-black neon-text flex items-center gap-3">
                            <Database className="text-carbon-400" />
                            CARBONX_DASHBOARD
                        </h1>
                        <p className="text-white/40 font-mono text-xs mt-1">/ROOT/RECORDS/PARTICIPANTS.LOG</p>
                    </div>
                    <div className="flex gap-8 items-center">
                        <div className="text-right">
                            <p className="text-2xl font-bold">{participants.length}</p>
                            <p className="text-xs font-mono text-white/40 uppercase">Total Users</p>
                        </div>
                        <ExportButton data={participants} />
                    </div>
                </header>

                <div className="glass rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10 text-xs font-mono text-white/60 uppercase tracking-widest">
                                    <th className="px-6 py-4">Participant</th>
                                    <th className="px-6 py-4">College</th>
                                    <th className="px-6 py-4">Track Info</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Misc</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {participants.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center text-white/20 italic">
                                            Zero records found in local database.
                                        </td>
                                    </tr>
                                )}
                                {participants.map((p) => (
                                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold">{p.name}</div>
                                            <div className="text-xs text-white/50">{p.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">{p.college}</div>
                                            <div className="text-[10px] text-white/40">{p.course} ({p.year})</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="inline-block px-2 py-0.5 rounded bg-carbon-400/10 text-carbon-400 text-[10px] font-bold border border-carbon-400/20 uppercase mb-1">
                                                {p.experience}
                                            </div>
                                            {p.teamName && (
                                                <div className="text-xs text-white/60 font-mono">Team: {p.teamName}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">{p.email}</div>
                                            <div className="text-sm text-white/60">{p.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs text-white/70">Food: {p.food}</div>
                                            <div className="text-xs text-white/70">Size: {p.shirtSize}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
