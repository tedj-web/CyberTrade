import { Link } from '@inertiajs/react';

export default function Logo({ href = '/', className = '' }) {
    return (
        <Link href={href} className={`flex items-center gap-2 ${className}`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#52FFB8] to-[#FFF385] text-sm font-bold text-neutral-900">
                CT
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">
                Cyber <span className="text-[#52FFB8]">Trade</span>
            </span>
        </Link>
    );
}
