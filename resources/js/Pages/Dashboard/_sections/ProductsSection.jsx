import { ClockIcon, DollarIcon, EditIcon, MarketIcon, PlusIcon, SearchIcon, TrashIcon, WarnIcon } from '@/Components/Cyber/Icons';
import { STATUS_BADGE, computeStats, getStatus, money } from '@/lib/products';
import { useEffect, useMemo, useState } from 'react';
import { DeleteModal, ProductModal } from './ProductModals';
import StatCard from './StatCard';

const PAGE_SIZE = 8;

export default function ProductsSection({ products, loading, error, onCreate, onUpdate, onDelete }) {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState({ open: false, product: null }); // product=null -> create
    const [toDelete, setToDelete] = useState(null);

    const stats = computeStats(products);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return products.filter(
            (p) =>
                (p.product.toLowerCase().includes(q) || (p.sku || '').toLowerCase().includes(q)) &&
                (filter === 'all' || getStatus(p.quantity) === filter),
        );
    }, [products, query, filter]);

    const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    useEffect(() => { setPage(1); }, [query, filter]);
    useEffect(() => { if (page > pages) setPage(pages); }, [pages, page]);
    const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <>
            {/* ============ STAT CARDS ============ */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard icon={MarketIcon} tone="mint" label="Total Products" value={stats.total} />
                <StatCard icon={DollarIcon} tone="sun" label="Inventory Value" value={money(stats.inventoryValue)} />
                <StatCard icon={ClockIcon} tone="mint" label="In Stock" value={stats.inStock} />
                <StatCard icon={WarnIcon} tone="red" label="Low Stock" value={stats.needsAttention} />
            </div>

            {/* ============ TABLE CARD ============ */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-xs">
                        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500">
                            <SearchIcon size={16} />
                        </span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by name or SKU..."
                            className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-9 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-[#52FFB8]/60 focus:ring-2 focus:ring-[#52FFB8]/20"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-neutral-300 outline-none transition focus:border-[#52FFB8]/60"
                        >
                            <option value="all" className="bg-neutral-900">All Status</option>
                            <option value="In Stock" className="bg-neutral-900">In Stock</option>
                            <option value="Low Stock" className="bg-neutral-900">Low Stock</option>
                            <option value="Out of Stock" className="bg-neutral-900">Out of Stock</option>
                        </select>
                        <button
                            onClick={() => setModal({ open: true, product: null })}
                            className="flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#52FFB8] to-[#FFF385] px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg shadow-[#52FFB8]/20 transition hover:opacity-90"
                        >
                            <PlusIcon size={16} /> Add Product
                        </button>
                    </div>
                </div>

                {error && <p className="mt-4 rounded-xl bg-red-400/10 px-4 py-2.5 text-sm text-red-400">{error}</p>}

                <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/5 text-xs uppercase tracking-wide text-neutral-500">
                                <th className="pb-3 pr-4 font-medium">Item Name</th>
                                <th className="pb-3 pr-4 font-medium">SKU ID</th>
                                <th className="pb-3 pr-4 font-medium">Price</th>
                                <th className="pb-3 pr-4 font-medium">Quantity</th>
                                <th className="pb-3 pr-4 font-medium">Status</th>
                                <th className="pb-3 pr-4 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {visible.map((p) => {
                                const status = getStatus(p.quantity);
                                return (
                                    <tr key={p.id} className="transition hover:bg-white/[0.03]">
                                        <td className="py-3.5 pr-4 font-medium text-white">{p.product}</td>
                                        <td className="py-3.5 pr-4 text-neutral-400">{p.sku}</td>
                                        <td className="py-3.5 pr-4 text-neutral-300">{money(p.price)}</td>
                                        <td className="py-3.5 pr-4 text-neutral-300">{p.quantity}</td>
                                        <td className="py-3.5 pr-4">
                                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[status]}`}>{status}</span>
                                        </td>
                                        <td className="py-3.5 pr-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => setModal({ open: true, product: p })}
                                                    className="rounded-lg p-2 text-neutral-400 transition hover:bg-[#52FFB8]/10 hover:text-[#52FFB8]"
                                                    aria-label={`Edit ${p.product}`}
                                                >
                                                    <EditIcon size={16} />
                                                </button>
                                                <button
                                                    onClick={() => setToDelete(p)}
                                                    className="rounded-lg p-2 text-neutral-400 transition hover:bg-red-400/10 hover:text-red-400"
                                                    aria-label={`Delete ${p.product}`}
                                                >
                                                    <TrashIcon size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {!loading && filtered.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-neutral-500">
                                <SearchIcon size={24} />
                            </div>
                            <p className="mt-4 text-sm font-medium text-neutral-300">No products found</p>
                            <p className="mt-1 text-xs text-neutral-500">Try adjusting your search or filters.</p>
                        </div>
                    )}
                    {loading && <p className="py-16 text-center text-sm text-neutral-500">Loading products…</p>}
                </div>

                <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-5 sm:flex-row">
                    <p className="text-xs text-neutral-500">Showing {visible.length} of {filtered.length} products</p>
                    <div className="flex gap-2">
                        <button
                            disabled={page <= 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-neutral-400 transition hover:text-white disabled:opacity-40"
                        >
                            Previous
                        </button>
                        <span className="rounded-full bg-gradient-to-r from-[#52FFB8] to-[#FFF385] px-3 py-1.5 text-xs font-semibold text-neutral-900">
                            {page} / {pages}
                        </span>
                        <button
                            disabled={page >= pages}
                            onClick={() => setPage((p) => p + 1)}
                            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-neutral-400 transition hover:text-white disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <ProductModal
                key={modal.product?.id ?? 'new'}
                show={modal.open}
                product={modal.product}
                onClose={() => setModal((m) => ({ ...m, open: false }))}
                onSave={(payload) => (modal.product ? onUpdate(modal.product.id, payload) : onCreate(payload))}
            />
            <DeleteModal
                product={toDelete}
                onClose={() => setToDelete(null)}
                onConfirm={async () => { await onDelete(toDelete); setToDelete(null); }}
            />
        </>
    );
}
