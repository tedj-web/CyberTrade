import { useState } from 'react';
import { EyeIcon, EyeOffIcon, GithubIcon, GoogleIcon } from './Icons';

export const inputClass =
    'w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-[#52FFB8]/60 focus:ring-2 focus:ring-[#52FFB8]/20';

export function AuthBadge({ children }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-[#52FFB8]" />
            {children}
        </span>
    );
}

export function SocialButtons() {
    const cls =
        'flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-neutral-200 transition hover:bg-white/10';
    return (
        <div className="grid grid-cols-2 gap-3">
            <button type="button" className={cls}><GoogleIcon /> Google</button>
            <button type="button" className={cls}><GithubIcon /> GitHub</button>
        </div>
    );
}

export function Divider({ children }) {
    return (
        <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">{children}</span>
            <div className="h-px flex-1 bg-white/10" />
        </div>
    );
}

/** Pill input with a leading icon and an optional show/hide toggle for passwords. */
export function IconField({ id, label, icon: Icon, error, toggle = false, labelRight, type = 'text', ...props }) {
    const [visible, setVisible] = useState(false);
    const actualType = toggle ? (visible ? 'text' : 'password') : type;

    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor={id} className="block text-sm font-medium text-neutral-300">{label}</label>
                {labelRight}
            </div>
            <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-500">
                    <Icon />
                </span>
                <input id={id} type={actualType} className={inputClass + (toggle ? ' pr-11' : '')} {...props} />
                {toggle && (
                    <button
                        type="button"
                        onClick={() => setVisible((v) => !v)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-neutral-500 transition hover:text-neutral-300"
                        aria-label="Toggle password visibility"
                    >
                        {visible ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                )}
            </div>
            {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        </div>
    );
}

export function CheckBox({ checked, onChange, required, children }) {
    return (
        <label className="flex cursor-pointer items-start gap-2.5">
            <input type="checkbox" className="peer sr-only" checked={checked} onChange={onChange} required={required} />
            <span
                className={`mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded border transition peer-focus-visible:ring-2 peer-focus-visible:ring-[#52FFB8]/40 ${
                    checked ? 'border-[#52FFB8] bg-[#52FFB8]' : 'border-white/20 bg-white/5'
                }`}
            >
                {checked && (
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="3">
                        <path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </span>
            <span className="text-sm text-neutral-400">{children}</span>
        </label>
    );
}

export function TrustRow() {
    return (
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-neutral-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Protected by bank-grade encryption and SOC 2 Type II compliance
        </div>
    );
}

export const submitClass =
    'w-full rounded-full bg-gradient-to-r from-[#52FFB8] to-[#FFF385] px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-[#52FFB8]/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60';
