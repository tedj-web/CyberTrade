import { CheckIcon, TrashIcon } from '@/Components/Cyber/Icons';

export default function Toast({ toast }) {
    if (!toast) return null;
    const danger = toast.type === 'danger';
    return (
        <div role="status" className="fixed bottom-6 right-6 z-[80] flex items-center gap-3 rounded-2xl border border-white/10 bg-neutral-900 px-5 py-3.5 shadow-2xl shadow-black/60">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full ${danger ? 'bg-red-400/10 text-red-400' : 'bg-[#52FFB8]/10 text-[#52FFB8]'}`}>
                {danger ? <TrashIcon size={14} strokeWidth={2} /> : <CheckIcon size={14} />}
            </span>
            <p className="text-sm font-medium text-white">{toast.message}</p>
        </div>
    );
}
