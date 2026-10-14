export default function StatCard({ icon: Icon, tone = 'mint', label, value, sub, badge }) {
    const tones = {
        mint: 'bg-[#52FFB8]/10 text-[#52FFB8]',
        sun: 'bg-[#FFF385]/10 text-[#FFF385]',
        red: 'bg-red-400/10 text-red-400',
    };
    return (
        <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5">
            <div className="flex items-center justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}>
                    <Icon />
                </span>
                {badge}
            </div>
            <p className="mt-4 text-sm text-neutral-400">{label}</p>
            <p className="mt-1 text-2xl font-bold text-white">{value}</p>
            {sub && <p className="mt-1 text-xs text-neutral-500">{sub}</p>}
        </div>
    );
}

export function Trend({ up = true, children }) {
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${up ? 'bg-[#52FFB8]/10 text-[#52FFB8]' : 'bg-red-400/10 text-red-400'}`}>
            {up ? '▲' : '▼'} {children}
        </span>
    );
}
