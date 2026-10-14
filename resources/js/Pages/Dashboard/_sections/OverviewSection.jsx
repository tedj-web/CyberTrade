import { BagIcon, CheckIcon, DollarIcon, MarketIcon, ShieldIcon, UserIcon, WarnIcon } from '@/Components/Cyber/Icons';
import { STATUS_BADGE, computeStats, getStatus, money } from '@/lib/products';
import StatCard, { Trend } from './StatCard';

const BAR_HEIGHTS = [35, 55, 40, 70, 50, 85, 60];
const HIGHLIGHT = [3, 5];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CAT_COLORS = ['#52FFB8', '#FFF385', '#6B7280', '#E5E7EB'];
const CAT_DOTS = ['bg-[#52FFB8]', 'bg-[#FFF385]', 'bg-neutral-500', 'bg-neutral-200'];

function timeAgo(iso) {
    if (!iso) return 'just now';
    const s = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
    if (s < 60) return 'just now';
    if (s < 3600) return `${Math.floor(s / 60)} minutes ago`;
    if (s < 86400) return `${Math.floor(s / 3600)} hours ago`;
    return `${Math.floor(s / 86400)} days ago`;
}

const ACTIVITY_TONES = {
    mint: 'bg-[#52FFB8]/10 text-[#52FFB8]',
    sun: 'bg-[#FFF385]/10 text-[#FFF385]',
    red: 'bg-red-400/10 text-red-400',
    gray: 'bg-white/10 text-neutral-300',
};

/** The Overview reads from the SAME products array as the Marketplace tab. */
export default function OverviewSection({ products, loading, onViewAll }) {
    const stats = computeStats(products);
    const recent = products.slice(0, 5);

    // Donut: one arc per category, sized by share of listings.
    let offset = 0;
    const arcs = stats.byCategory.map((c, i) => {
        const pct = stats.total ? (c.count / stats.total) * 100 : 0;
        const arc = { ...c, pct, color: CAT_COLORS[i], offset };
        offset += pct;
        return arc;
    });

    // Activity feed: live events from products first, then demo events.
    const activity = [];
    if (stats.needsAttention > 0) {
        activity.push({
            tone: 'red', icon: WarnIcon, time: 'Needs attention',
            text: <><span className="font-semibold text-white">{stats.needsAttention} listing{stats.needsAttention > 1 ? 's' : ''}</span> low or out of stock</>,
        });
    }
    products.slice(0, 3).forEach((p) =>
        activity.push({
            tone: 'sun', icon: MarketIcon, time: timeAgo(p.created_at),
            text: <>New SKU <span className="font-semibold text-white">{p.sku}</span> listed</>,
        }),
    );
    activity.push(
        { tone: 'mint', icon: CheckIcon, time: '2 minutes ago', text: <><span className="font-semibold text-white">Order #48213</span> was completed</> },
        { tone: 'gray', icon: UserIcon, time: '1 hour ago', text: <><span className="font-semibold text-white">142 new users</span> registered today</> },
        { tone: 'mint', icon: ShieldIcon, time: '5 hours ago', text: <>Security scan completed — <span className="font-semibold text-white">no issues found</span></> },
    );

    return (
        <>
            {/* ============ METRIC CARDS ============ */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard icon={DollarIcon} tone="mint" label="Total Revenue" value="$482,910.00" sub="vs. $429,600 last month" badge={<Trend>12.4%</Trend>} />
                <StatCard
                    icon={MarketIcon}
                    tone="sun"
                    label="Active Listings"
                    value={loading ? '…' : stats.total.toLocaleString()}
                    sub={loading ? 'Loading…' : `${money(stats.inventoryValue)} inventory value · ${stats.needsAttention} need attention`}
                    badge={<span className="rounded-full bg-[#52FFB8]/10 px-2.5 py-1 text-xs font-semibold text-[#52FFB8]">Live</span>}
                />
                <StatCard icon={BagIcon} tone="mint" label="Total Orders" value="18,204" sub="312 pending fulfillment" badge={<Trend up={false}>2.3%</Trend>} />
                <StatCard icon={UserIcon} tone="sun" label="Active Users" value="18,402" sub="4,120 new this month" badge={<Trend>19.6%</Trend>} />
            </div>

            {/* ============ CHARTS ============ */}
            <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 xl:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <p className="text-sm text-neutral-400">Trading Volume</p>
                            <p className="mt-1 text-2xl font-bold text-white">$1,284,902.00</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="rounded-full bg-gradient-to-r from-[#52FFB8] to-[#FFF385] px-3 py-1.5 text-xs font-semibold text-neutral-900">7D</button>
                            <button className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white">30D</button>
                            <button className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-neutral-400 hover:text-white">1Y</button>
                        </div>
                    </div>
                    <div className="mt-8 flex h-56 items-end justify-between gap-2 sm:gap-3">
                        {BAR_HEIGHTS.map((h, i) => (
                            <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className={`w-full rounded-t-lg ${HIGHLIGHT.includes(i) ? 'bg-gradient-to-t from-[#52FFB8] to-[#FFF385]' : 'bg-white/10'}`}
                            />
                        ))}
                    </div>
                    <div className="mt-3 flex justify-between text-[11px] text-neutral-600">
                        {DAYS.map((d) => <span key={d}>{d}</span>)}
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                    <p className="text-sm text-neutral-400">Listings by Category</p>
                    <div className="mt-6 flex items-center justify-center">
                        <div className="relative h-36 w-36">
                            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1f1f1f" strokeWidth="3.5" />
                                {arcs.filter((a) => a.pct > 0).map((a) => (
                                    <circle
                                        key={a.name}
                                        cx="18" cy="18" r="15.9" fill="none"
                                        stroke={a.color} strokeWidth="3.5"
                                        strokeDasharray={`${a.pct} ${100 - a.pct}`}
                                        strokeDashoffset={-a.offset}
                                    />
                                ))}
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-xl font-bold text-white">{stats.total.toLocaleString()}</span>
                                <span className="text-[11px] text-neutral-500">Total SKUs</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        {arcs.map((a, i) => (
                            <div key={a.name} className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-neutral-400">
                                    <span className={`h-2 w-2 rounded-full ${CAT_DOTS[i]}`} />
                                    {a.name}
                                </span>
                                <span className="font-semibold text-white">{Math.round(a.pct)}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ============ RECENT LISTINGS + ACTIVITY ============ */}
            <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 xl:col-span-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-white">Recent Listings</h3>
                        <button onClick={onViewAll} className="text-xs font-medium text-[#52FFB8] transition hover:text-[#FFF385]">
                            View all →
                        </button>
                    </div>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[560px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/5 text-xs uppercase tracking-wide text-neutral-500">
                                    <th className="pb-3 font-medium">Item</th>
                                    <th className="pb-3 font-medium">SKU</th>
                                    <th className="pb-3 font-medium">Price</th>
                                    <th className="pb-3 font-medium">Qty</th>
                                    <th className="pb-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recent.map((p) => {
                                    const status = getStatus(p.quantity);
                                    return (
                                        <tr key={p.id}>
                                            <td className="py-3.5 font-medium text-white">{p.product}</td>
                                            <td className="py-3.5 text-neutral-400">{p.sku}</td>
                                            <td className="py-3.5 text-neutral-300">{money(p.price)}</td>
                                            <td className="py-3.5 text-neutral-300">{p.quantity}</td>
                                            <td className="py-3.5">
                                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[status]}`}>{status}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {!loading && recent.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-10 text-center text-sm text-neutral-500">
                                            No listings yet — add your first product in Marketplace.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                    <h3 className="text-base font-semibold text-white">System Activity</h3>
                    <div className="mt-5 space-y-5">
                        {activity.slice(0, 6).map((a, i) => (
                            <div key={i} className="flex gap-3">
                                <span className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${ACTIVITY_TONES[a.tone]}`}>
                                    <a.icon size={14} strokeWidth={2} />
                                </span>
                                <div>
                                    <p className="text-sm text-neutral-300">{a.text}</p>
                                    <p className="mt-0.5 text-xs text-neutral-500">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
