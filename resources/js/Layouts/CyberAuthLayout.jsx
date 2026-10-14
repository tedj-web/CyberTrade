import Logo from '@/Components/Cyber/Logo';
import { Link } from '@inertiajs/react';

/** Shared shell for the Login and Sign-up pages (navbar, glow backdrop, footer). */
export default function CyberAuthLayout({ navPrompt, navLabel, navHref, navPrimary = false, children }) {
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white antialiased">
            <header className="border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-md">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                    <Logo />
                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm text-neutral-400 sm:inline">{navPrompt}</span>
                        <Link
                            href={navHref}
                            className={
                                navPrimary
                                    ? 'rounded-full bg-gradient-to-r from-[#52FFB8] to-[#FFF385] px-5 py-2 text-sm font-semibold text-neutral-900 shadow-lg shadow-[#52FFB8]/10 transition hover:opacity-90'
                                    : 'rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-neutral-200 transition hover:bg-white/10'
                            }
                        >
                            {navLabel}
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="relative flex min-h-[calc(100vh-73px-97px)] items-center justify-center overflow-hidden px-6 py-16 lg:px-8">
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[#52FFB8] opacity-20 blur-[160px]" />
                <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[420px] w-[420px] rounded-full bg-[#FFF385] opacity-10 blur-[140px]" />
                <div className="w-full max-w-md">{children}</div>
            </main>

            <footer className="border-t border-white/5 bg-[#0A0A0A] px-6 py-8 lg:px-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-xs text-neutral-500">© 2026 Cyber Trade, Inc. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-neutral-500">
                        <a href="#" className="transition hover:text-white">Privacy</a>
                        <a href="#" className="transition hover:text-white">Terms</a>
                        <a href="#" className="transition hover:text-white">Help Center</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
