"use client";

import { Download } from "lucide-react";

export default function ExportButton({ data }: { data: any[] }) {
    const exportCSV = () => {
        const csv = [
            ["ID", "Name", "Email", "Phone", "College", "Team", "Food", "Size"],
            ...data.map(p => [
                p.id,
                p.name,
                p.email,
                `"${p.phone}"`,
                p.college,
                p.teamName || "",
                p.food,
                p.shirtSize
            ])
        ].map(e => e.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "carbonx_participants.csv";
        a.click();
    };

    return (
        <button
            onClick={exportCSV}
            className="px-4 py-2 border border-carbon-400/20 rounded-lg text-carbon-400 hover:bg-carbon-400/10 transition-all font-mono text-xs flex items-center gap-2"
        >
            <Download size={14} />
            EXPORT_CSV
        </button>
    );
}
