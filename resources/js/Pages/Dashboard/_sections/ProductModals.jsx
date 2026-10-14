import { CloseIcon, WarnIcon } from '@/Components/Cyber/Icons';
import { CATEGORIES } from '@/lib/products';
import { useEffect, useState } from 'react';

const fieldClass =
    'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-[#52FFB8]/60 focus:ring-2 focus:ring-[#52FFB8]/20';

function Overlay({ show, onClose, z, children }) {
    useEffect(() => {
        if (!show) return;
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [show, onClose]);

    if (!show) return null;
    return (
        <div className={`fixed inset-0 ${z} flex items-center justify-center p-4`}>
            <div onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            {children}
        </div>
    );
}

const EMPTY = { product: '', sku: '', price: '', quantity: '', category: CATEGORIES[0] };

/** Create (product=null) or edit modal. Server-side validation errors are shown under each field. */
export function ProductModal({ show, product, onClose, onSave }) {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!show) return;
        setErrors({});
        setForm(
            product
                ? {
                      product: product.product,
                      sku: product.sku ?? '',
                      price: product.price,
                      quantity: product.quantity,
                      category: product.category,
                  }
                : EMPTY,
        );
    }, [show, product]);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});
        try {
            await onSave({
                product: form.product.trim(),
                sku: form.sku.trim(),
                price: parseFloat(form.price),
                quantity: parseInt(form.quantity, 10),
                category: form.category,
            });
            onClose();
        } catch (err) {
            const fieldErrors = err.response?.data?.errors;
            if (fieldErrors) {
                setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([k, v]) => [k, v[0]])));
            } else {
                setErrors({ form: 'Something went wrong. Please try again.' });
            }
        } finally {
            setSaving(false);
        }
    };

    const Err = ({ name }) => (errors[name] ? <p className="mt-1.5 text-xs text-red-400">{errors[name]}</p> : null);
    const label = 'mb-1.5 block text-sm font-medium text-neutral-300';

    return (
        <Overlay show={show} onClose={onClose} z="z-[60]">
            <div role="dialog" aria-modal="true" className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-2xl shadow-black/60 sm:p-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-neutral-400 transition hover:bg-white/5 hover:text-white" aria-label="Close">
                        <CloseIcon size={20} />
                    </button>
                </div>

                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="itemName" className={label}>Item Name</label>
                        <input id="itemName" required value={form.product} onChange={set('product')} placeholder="e.g. Quantum Node License" className={fieldClass} />
                        <Err name="product" />
                    </div>
                    <div>
                        <label htmlFor="skuId" className={label}>SKU ID</label>
                        <input id="skuId" required value={form.sku} onChange={set('sku')} placeholder="e.g. CT-QN-1001" className={fieldClass} />
                        <Err name="sku" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className={label}>Price ($)</label>
                            <input id="price" type="number" step="0.01" min="0" required value={form.price} onChange={set('price')} placeholder="0.00" className={fieldClass} />
                            <Err name="price" />
                        </div>
                        <div>
                            <label htmlFor="quantity" className={label}>Quantity</label>
                            <input id="quantity" type="number" min="0" step="1" required value={form.quantity} onChange={set('quantity')} placeholder="0" className={fieldClass} />
                            <Err name="quantity" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="category" className={label}>Category</label>
                        <select id="category" value={form.category} onChange={set('category')} className={fieldClass}>
                            {CATEGORIES.map((c) => (
                                <option key={c} value={c} className="bg-neutral-900">{c}</option>
                            ))}
                        </select>
                        <Err name="category" />
                    </div>

                    {errors.form && <p className="rounded-xl bg-red-400/10 px-4 py-2.5 text-sm text-red-400">{errors.form}</p>}

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-neutral-200 transition hover:bg-white/10">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving} className="flex-1 rounded-full bg-gradient-to-r from-[#52FFB8] to-[#FFF385] px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg shadow-[#52FFB8]/20 transition hover:opacity-90 disabled:opacity-60">
                            {saving ? 'Saving…' : product ? 'Update Product' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </Overlay>
    );
}

export function DeleteModal({ product, onClose, onConfirm }) {
    const [busy, setBusy] = useState(false);
    const confirm = async () => {
        setBusy(true);
        try { await onConfirm(); } finally { setBusy(false); }
    };

    return (
        <Overlay show={!!product} onClose={onClose} z="z-[70]">
            <div role="alertdialog" aria-modal="true" className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-neutral-900 p-6 text-center shadow-2xl shadow-black/60">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-400/10 text-red-400">
                    <WarnIcon size={22} />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">Delete this product?</h3>
                <p className="mt-2 text-sm text-neutral-400">
                    "{product?.product}" will be permanently removed. This action cannot be undone.
                </p>
                <div className="mt-6 flex gap-3">
                    <button onClick={onClose} className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-neutral-200 transition hover:bg-white/10">
                        Cancel
                    </button>
                    <button onClick={confirm} disabled={busy} className="flex-1 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60">
                        {busy ? 'Deleting…' : 'Delete'}
                    </button>
                </div>
            </div>
        </Overlay>
    );
}
