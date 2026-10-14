import Logo from '@/Components/Cyber/Logo';
import {
    BagIcon, BellIcon, ChartIcon, CloseIcon, CogIcon, GridIcon, HelpIcon,
    LogoutIcon, MarketIcon, MenuIcon, SearchIcon, WalletIcon,
} from '@/Components/Cyber/Icons';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const base = 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition';
const idle = `${base} text-neutral-400 hover:bg-white/5 hover:text-white`;
const active = `${base} bg-gradient-to-r from-[#52FFB8]/15 to-[#FFF385]/10 font-semibold text-white`;

function NavItem({ href, isActive, icon: Icon, children, badge, onClick, tab = false }) {
    const inner = (
        <>
            <Icon stroke={isActive ? '#52FFB8' : 'currentColor'} strokeWidth={isActive ? 2 : 1.8} />
            {children}
            {isActive && !badge && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#52FFB8]" />}
            {badge}
        </>
    );
    const cls = isActive ? active : idle;
    // Overview <-> Marketplace are tabs of the same Inertia page: keep React state so data is shared.
    if (tab) {
        return (
            <Link href={href} preserveState preserveScroll onClick={onClick} className={`mt-1 ${cls}`}>
                {inner}
            </Link>
        );
    }
    return <a href={href} className={cls}>{inner}</a>;
}

export default function DashboardLayout({ tab, title, subtitle, productCount = 0, showSearch = false, children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    const initials = (user?.name || 'U').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();

    const Avatar = ({ className }) => (
        <span className={`flex items-center justify-center rounded-full bg-gradient-to-br from-[#52FFB8] to-[#FFF385] font-bold text-neutral-900 ${className}`}>
            {initials}
        </span>
    );

    return (
        <div className="ct-scroll flex min-h-screen bg-[#0D0D0D] text-white antialiased">
            {/* ============ SIDEBAR ============ */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[#0A0A0A] transition-transform duration-300 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-full flex-col overflow-y-auto px-4 py-6">
                    <div className="flex items-center justify-between px-2">
                        <Logo href={route('dashboard')} />
                        <button onClick={close} className="rounded-lg p-1.5 text-neutral-400 hover:bg-white/5 lg:hidden" aria-label="Close sidebar">
                            <CloseIcon size={20} />
                        </button>
                    </div>

                    <nav className="mt-10 flex-1 space-y-1">
                        <p className="px-3 text-[11px] font-semibold uppercase tracking-widest text-neutral-600">Main</p>

                        <NavItem tab href={route('dashboard')} isActive={tab === 'overview'} icon={GridIcon} onClick={close}>
                            Overview
                        </NavItem>
                        <NavItem
                            tab
                            href={route('products')}
                            isActive={tab === 'products'}
                            icon={MarketIcon}
                            onClick={close}
                            badge={
                                <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-neutral-300">
                                    {productCount}
                                </span>
                            }
                        >
                            Marketplace
                        </NavItem>
                        <NavItem href="#" icon={BagIcon} badge={<span className="ml-auto rounded-full bg-[#FFF385]/15 px-2 py-0.5 text-[10px] font-semibold text-[#FFF385]">12</span>}>
                            Orders
                        </NavItem>
                        <NavItem href="#" icon={ChartIcon}>Analytics</NavItem>
                        <NavItem href="#" icon={WalletIcon}>Wallet</NavItem>

                        <p className="mt-6 px-3 pb-1 text-[11px] font-semibold uppercase tracking-widest text-neutral-600">Account</p>
                        <NavItem href={route('profile.edit')} icon={CogIcon}>Settings</NavItem>
                        <NavItem href="#" icon={HelpIcon}>Help &amp; Support</NavItem>
                    </nav>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-[#52FFB8]/10 to-[#FFF385]/5 p-4">
                        <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
                        <p className="mt-1 text-xs text-neutral-400">Unlock advanced analytics and unlimited listings.</p>
                        <button className="mt-3 w-full rounded-full bg-gradient-to-r from-[#52FFB8] to-[#FFF385] px-4 py-2 text-xs font-semibold text-neutral-900 transition hover:opacity-90">
                            Upgrade Now
                        </button>
                    </div>

                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3">
                        <Avatar className="h-9 w-9 text-xs" />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
                            <p className="truncate text-xs text-neutral-500">{user?.email}</p>
                        </div>
                        <Link href={route('logout')} method="post" as="button" className="text-neutral-500 transition hover:text-white" aria-label="Log out">
                            <LogoutIcon />
                        </Link>
                    </div>
                </div>
            </aside>

            {open && <div onClick={close} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" />}

            {/* ============ MAIN ============ */}
            <div className="relative min-w-0 flex-1 overflow-x-hidden">
                <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-[#52FFB8] opacity-10 blur-[140px]" />

                <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/5 bg-[#0D0D0D]/80 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setOpen(true)} className="rounded-lg p-2 text-neutral-300 hover:bg-white/5 lg:hidden" aria-label="Open sidebar">
                            <MenuIcon size={22} />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">{title}</h1>
                            <p className="hidden text-xs text-neutral-500 sm:block">{subtitle}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {showSearch && (
                            <div className="relative hidden sm:block">
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
                                    <SearchIcon size={16} />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search orders, SKUs..."
                                    className="w-56 rounded-full border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-[#52FFB8]/60 focus:ring-2 focus:ring-[#52FFB8]/20 lg:w-72"
                                />
                            </div>
                        )}
                        <button className="relative rounded-full border border-white/10 bg-white/5 p-2.5 text-neutral-300 transition hover:bg-white/10" aria-label="Notifications">
                            <BellIcon />
                            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#52FFB8] ring-2 ring-[#0D0D0D]" />
                        </button>
                        <Avatar className="h-9 w-9 text-xs ring-2 ring-white/10" />
                    </div>
                </header>

                <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
            </div>
        </div>
    );
}
