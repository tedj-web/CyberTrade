import Logo from '@/Components/Cyber/Logo';
import {
    BoltIcon, ChartIcon, ClockIcon, CloseIcon, LinkedinIcon, MarketIcon, MenuIcon, ShieldIcon,
    TwitterIcon, GithubIcon,
} from '@/Components/Cyber/Icons';
import { getStatus, money } from '@/lib/products';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const gradBtn = 'rounded-full bg-gradient-to-r from-[#52FFB8] to-[#FFF385] font-semibold text-neutral-900 transition hover:opacity-90';
const navLink = 'text-sm font-medium text-neutral-300 transition hover:text-white';
const gradText = 'bg-gradient-to-r from-[#52FFB8] to-[#FFF385] bg-clip-text text-transparent';
const pill = 'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-neutral-300';

// Shown only if the products API is empty or unreachable.
const SAMPLE = [
    ['Quantum Node License', 'CT-QN-1001', 249, 128],
    ['Neural Trade Bot Pro', 'CT-NTB-2045', 599, 34],
    ['Secure Vault Module', 'CT-SVM-3312', 89.5, 512],
    ['API Access Pack (10K calls)', 'CT-API-4420', 39.99, 999],
    ['Market Analytics Suite', 'CT-MAS-5510', 349, 76],
    ['Hardware Signing Key', 'CT-HSK-6630', 129, 210],
    ['Enterprise Node Cluster', 'CT-ENC-7741', 1499, 12],
    ['Risk Shield Add-on', 'CT-RSA-8852', 59, 340],
].map(([product, sku, price, quantity], id) => ({ id, product, sku, price, quantity }));

const DOT = { 'In Stock': 'bg-[#52FFB8]', 'Low Stock': 'bg-[#FFF385]', 'Out of Stock': 'bg-red-400' };

function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                <Logo />
                <div className="hidden items-center gap-8 md:flex">
                    <a href="#product" className={navLink}>Product</a>
                    <a href="#features" className={navLink}>Features</a>
                    <a href="#pricing" className={navLink}>Pricing</a>
                </div>
                <div className="hidden items-center gap-3 md:flex">
                    <Link href={route('login')} className="rounded-full px-4 py-2 text-sm font-medium text-neutral-200 transition hover:text-white">Login</Link>
                    <Link href={route('register')} className={`${gradBtn} px-5 py-2 text-sm shadow-lg shadow-[#52FFB8]/10`}>Register</Link>
                </div>
                <button onClick={() => setOpen((o) => !o)} className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-300 md:hidden" aria-label="Toggle menu">
                    {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
                </button>
            </nav>

            {open && (
                <div className="space-y-1 border-t border-white/5 bg-[#0D0D0D] px-6 py-4 md:hidden">
                    {[['#product', 'Product'], ['#features', 'Features'], ['#pricing', 'Pricing']].map(([href, label]) => (
                        <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-neutral-300 hover:bg-white/5 hover:text-white">{label}</a>
                    ))}
                    <div className="mt-3 flex gap-3 border-t border-white/5 pt-3">
                        <Link href={route('login')} className="flex-1 rounded-full border border-white/10 px-4 py-2 text-center text-sm font-medium text-neutral-200">Login</Link>
                        <Link href={route('register')} className={`${gradBtn} flex-1 px-4 py-2 text-center text-sm`}>Register</Link>
                    </div>
                </div>
            )}
        </header>
    );
}

function Hero() {
    return (
        <section className="relative overflow-hidden px-6 pb-24 pt-20 lg:px-8">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[#52FFB8] opacity-20 blur-[160px]" />
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-[#FFF385] opacity-10 blur-[140px]" />

            <div className="mx-auto max-w-4xl text-center">
                <span className={pill}><span className="h-1.5 w-1.5 rounded-full bg-[#52FFB8]" /> Now live: real-time global order book</span>
                <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Trade the world's digital assets, <span className={gradText}>faster and safer</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-400 sm:text-lg">
                    Cyber Trade gives individuals and institutions a single, secure marketplace to buy, sell, and track inventory in real time — backed by bank-grade encryption and zero-latency settlement.
                </p>

                {/* "Get Early Access" sends the typed email to the register page */}
                <form action={route('register')} method="get" className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your work email"
                        className="w-full flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-[#52FFB8]/60 focus:ring-2 focus:ring-[#52FFB8]/20"
                    />
                    <button type="submit" className={`${gradBtn} whitespace-nowrap px-6 py-3 text-sm shadow-lg shadow-[#52FFB8]/20`}>Get Early Access</button>
                </form>
                <div className="mt-4 flex justify-center">
                    <a href="#demo" className="text-sm font-medium text-neutral-300 underline underline-offset-4 transition hover:text-white">Watch 2-min demo →</a>
                </div>

                <div className="mt-16">
                    <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">Trusted by teams at</p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70 grayscale">
                        {['NASDAQ PARTNERS', 'ORBIT CAPITAL', 'VERTEX LABS', 'HELIX FINANCE', 'ATLAS SECURITY'].map((n) => (
                            <span key={n} className="text-base font-bold tracking-wide text-neutral-300">{n}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Features() {
    const bars = [40, 65, 45, 80, 55, 90, 60];
    const callouts = [
        { icon: BoltIcon, tone: 'bg-[#52FFB8]/10 text-[#52FFB8]', title: 'Real-time order matching', text: 'Sub-50ms execution across our global liquidity network.' },
        { icon: ShieldIcon, tone: 'bg-[#FFF385]/10 text-[#FFF385]', title: 'Bank-grade security', text: 'End-to-end encryption and SOC 2 Type II compliance.' },
        { icon: ChartIcon, tone: 'bg-[#52FFB8]/10 text-[#52FFB8]', title: 'Transparent analytics', text: 'Full audit trails and exportable reports for every trade.' },
    ];
    return (
        <section id="features" className="relative px-6 py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <div className="order-2 lg:order-1">
                        <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 shadow-2xl shadow-black/40">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-neutral-400">Portfolio Volume</p>
                                    <p className="mt-1 text-2xl font-bold text-white">$1,284,902.00</p>
                                </div>
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#52FFB8]/10 px-3 py-1 text-xs font-semibold text-[#52FFB8]">▲ 24.6%</span>
                            </div>
                            <div className="mt-8 flex h-48 items-end justify-between gap-3">
                                {bars.map((h, i) => (
                                    <div key={i} style={{ height: `${h}%` }} className={`w-full rounded-t-lg ${i === 3 || i === 5 ? 'bg-gradient-to-t from-[#52FFB8] to-[#FFF385]' : 'bg-white/10'}`} />
                                ))}
                            </div>
                            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/5 pt-6 text-center">
                                {[['18.4K', 'Active Traders'], ['99.98%', 'Uptime'], ['<40ms', 'Order Latency']].map(([v, l]) => (
                                    <div key={l}>
                                        <p className="text-lg font-bold text-white">{v}</p>
                                        <p className="text-xs text-neutral-500">{l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <span className={pill}>Platform Intelligence</span>
                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">Insight and control, in one unified dashboard</h2>
                        <p className="mt-4 text-base text-neutral-400">
                            Monitor live inventory, price movements, and settlement status without switching tabs. Cyber Trade consolidates every signal your team needs to move fast with confidence.
                        </p>
                        <div className="mt-8 space-y-5">
                            {callouts.map(({ icon: Icon, tone, title, text }) => (
                                <div key={title} className="flex gap-4">
                                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${tone}`}><Icon size={20} /></div>
                                    <div>
                                        <h3 className="font-semibold text-white">{title}</h3>
                                        <p className="mt-1 text-sm text-neutral-400">{text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Marketplace() {
    const [items, setItems] = useState(SAMPLE);

    // Public listings come from the same table the dashboard manages.
    useEffect(() => {
        axios.get('/api/products')
            .then(({ data }) => { if (Array.isArray(data) && data.length) setItems(data); })
            .catch(() => {});
    }, []);

    const features = [
        { icon: ClockIcon, title: 'Instant Settlement', text: 'Every transaction clears in seconds, not days, with full ledger traceability.' },
        { icon: ShieldIcon, title: 'Verified Listings', text: 'Every public SKU is validated against inventory records before it goes live.' },
        { icon: MarketIcon, title: 'Open Marketplace', text: 'Anyone can browse public inventory — no account required to explore.' },
    ];

    return (
        <section id="product" className="relative px-6 py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <span className={pill}><span className="h-1.5 w-1.5 rounded-full bg-[#52FFB8]" /> Live Marketplace</span>
                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">Global Product Marketplace</h2>
                    <p className="mt-4 text-base text-neutral-400">Browse publicly listed items available to every Cyber Trade user, updated in real time as inventory moves.</p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {items.slice(0, 8).map((p) => {
                        const status = getStatus(p.quantity);
                        return (
                            <article key={p.id} className="group rounded-2xl border border-white/10 bg-neutral-900/60 p-5 transition hover:border-[#52FFB8]/40 hover:bg-neutral-900">
                                <div className="flex items-center justify-between">
                                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium tracking-wide text-neutral-400">SKU: {p.sku}</span>
                                    <span title={status} className={`h-2 w-2 rounded-full ${DOT[status]}`} />
                                </div>
                                <h3 className="mt-4 text-base font-semibold text-white">{p.product}</h3>
                                <div className="mt-4 flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-neutral-500">Price</p>
                                        <p className="text-lg font-bold text-white">{money(p.price)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-neutral-500">Qty</p>
                                        <p className="text-sm font-semibold text-[#52FFB8]">{p.quantity}</p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-10 flex justify-center">
                    <Link href={route('login')} className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                        View All Listings
                    </Link>
                </div>

                <div id="pricing" className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {features.map(({ icon: Icon, title, text }) => (
                        <div key={title} className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#52FFB8] to-[#FFF385] text-[#0D0D0D]">
                                <Icon size={20} strokeWidth={2} />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                            <p className="mt-2 text-sm text-neutral-400">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Footer() {
    const cols = {
        Product: ['Marketplace', 'Analytics', 'API', 'Security'],
        Company: ['About', 'Careers', 'Blog', 'Contact'],
        Resources: ['Documentation', 'Help Center', 'Status', 'Changelog'],
        Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Compliance'],
    };
    const social = [[TwitterIcon, 'Twitter'], [GithubIcon, 'GitHub'], [LinkedinIcon, 'LinkedIn']];
    return (
        <footer className="border-t border-white/5 bg-[#0A0A0A] px-6 py-16 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
                    <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                        <Logo />
                        <p className="mt-4 text-sm text-neutral-500">The secure global marketplace for digital assets and inventory.</p>
                        <div className="mt-5 flex gap-3">
                            {social.map(([Icon, label]) => (
                                <a key={label} href="#" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition hover:border-[#52FFB8]/50 hover:text-[#52FFB8]">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                    {Object.entries(cols).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold text-white">{title}</h4>
                            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
                                {links.map((l) => (
                                    <li key={l}><a href="#" className="transition hover:text-white">{l}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
                    <p className="text-xs text-neutral-500">© 2026 Cyber Trade, Inc. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-neutral-500">
                        <a href="#" className="transition hover:text-white">Privacy</a>
                        <a href="#" className="transition hover:text-white">Terms</a>
                        <a href="#" className="transition hover:text-white">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function Landing() {
    return (
        <div className="min-h-screen scroll-smooth bg-[#0D0D0D] text-white antialiased">
            <Head title="Trade Smarter, Trade Secure" />
            <Navbar />
            <main>
                <Hero />
                <Features />
                <Marketplace />
            </main>
            <Footer />
        </div>
    );
}
