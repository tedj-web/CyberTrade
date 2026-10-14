// Small stroke-icon set used across the Cyber Trade pages.
const Svg = ({ size = 18, strokeWidth = 1.8, children, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        {...props}
    >
        {children}
    </svg>
);

const R = { strokeLinecap: 'round', strokeLinejoin: 'round' };

export const GridIcon = (p) => (
    <Svg {...p}>
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </Svg>
);
export const MarketIcon = (p) => (
    <Svg {...p}><path d="M4 4h16v4H4zM4 10h10v10H4zM16 10h4v10h-4z" {...R} /></Svg>
);
export const BagIcon = (p) => (
    <Svg {...p}><path d="M6 2l1.5 4h9L18 2M4 6h16l-1.5 13a2 2 0 01-2 1.8H7.5a2 2 0 01-2-1.8L4 6z" {...R} /></Svg>
);
export const ChartIcon = (p) => (
    <Svg {...p}><path d="M3 3v18h18M7 14l4-4 4 4 5-6" {...R} /></Svg>
);
export const WalletIcon = (p) => (
    <Svg {...p}><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M2 10h20M6 15h4" strokeLinecap="round" /></Svg>
);
export const CogIcon = (p) => (
    <Svg {...p}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" {...R} />
    </Svg>
);
export const HelpIcon = (p) => (
    <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 115.8 1c0 2-3 2-3 4" strokeLinecap="round" /><circle cx="12" cy="17" r=".3" fill="currentColor" /></Svg>
);
export const LogoutIcon = (p) => (
    <Svg {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" {...R} /></Svg>
);
export const CloseIcon = (p) => (
    <Svg {...p}><path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" /></Svg>
);
export const MenuIcon = (p) => (
    <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></Svg>
);
export const BellIcon = (p) => (
    <Svg {...p}><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" {...R} /><path d="M13.7 21a2 2 0 01-3.4 0" /></Svg>
);
export const SearchIcon = (p) => (
    <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" strokeLinecap="round" /></Svg>
);
export const DollarIcon = (p) => (
    <Svg {...p} strokeWidth={2}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" {...R} /></Svg>
);
export const ClockIcon = (p) => (
    <Svg {...p} strokeWidth={2}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" {...R} /></Svg>
);
export const WarnIcon = (p) => (
    <Svg {...p} strokeWidth={2}><path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" {...R} /></Svg>
);
export const UserIcon = (p) => (
    <Svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" {...R} /></Svg>
);
export const CheckIcon = (p) => (
    <Svg {...p} strokeWidth={2}><path d="M20 6L9 17l-5-5" {...R} /></Svg>
);
export const ShieldIcon = (p) => (
    <Svg {...p} strokeWidth={2}><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" {...R} /></Svg>
);
export const BoltIcon = (p) => (
    <Svg {...p} strokeWidth={2}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" {...R} /></Svg>
);
export const PlusIcon = (p) => (
    <Svg {...p} strokeWidth={2.2}><path d="M12 5v14M5 12h14" strokeLinecap="round" /></Svg>
);
export const EditIcon = (p) => (
    <Svg {...p}><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" {...R} /></Svg>
);
export const TrashIcon = (p) => (
    <Svg {...p}><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" {...R} /></Svg>
);
export const MailIcon = (p) => (
    <Svg {...p}><path d="M3 6l9 7 9-7M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" {...R} /></Svg>
);
export const LockIcon = (p) => (
    <Svg {...p}><rect x="4" y="10" width="16" height="10" rx="2" {...R} /><path d="M8 10V7a4 4 0 118 0v3" {...R} /></Svg>
);
export const EyeIcon = (p) => (
    <Svg {...p}><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" {...R} /><circle cx="12" cy="12" r="3" /></Svg>
);
export const EyeOffIcon = (p) => (
    <Svg {...p}><path d="M3 3l18 18M10.6 10.6a3 3 0 004.2 4.2M9.4 5.3A10.9 10.9 0 0112 5c7 0 11 7 11 7a13.2 13.2 0 01-3.1 3.6M6.5 6.6C3.7 8.3 2 11 2 11s3 7 10 7a10.5 10.5 0 004.4-1" {...R} /></Svg>
);

export const GoogleIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
        <path fill="#FFF385" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.4c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.2-2 3.6-5 3.6-8.7z" />
        <path fill="#52FFB8" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.3 21.3 7.3 24 12 24z" />
        <path fill="#9CA3AF" d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4C.5 8.3 0 10.1 0 12s.5 3.7 1.4 5.4l4-3.1z" />
        <path fill="#E5E7EB" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.1 0 12 0 7.3 0 3.3 2.7 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
    </svg>
);
export const GithubIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5a3.9 3.9 0 011-2.7 3.6 3.6 0 01.1-2.6s.9-.3 2.9 1a10 10 0 015.3 0c2-1.3 2.9-1 2.9-1 .5 1.2.2 2.1.1 2.6a3.9 3.9 0 011 2.7c0 3.9-2.4 4.8-4.6 5 .3.3.6.9.6 1.9v2.8c0 .3.2.6.7.5A10 10 0 0012 2z" />
    </svg>
);
export const TwitterIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.6 11.6 0 013 4.9a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 01-1.9.1 4.1 4.1 0 003.8 2.8A8.2 8.2 0 012 18.6a11.6 11.6 0 006.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" />
    </svg>
);
export const LinkedinIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.9 8.4H3.6V20H6.9zM5.3 3.6a1.9 1.9 0 100 3.9 1.9 1.9 0 000-3.9zM20.4 20h-3.3v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.6-2.3 3.1V20H9.6V8.4h3.1v1.6h.1a3.5 3.5 0 013.1-1.7c3.3 0 4 2.2 4 5z" />
    </svg>
);
