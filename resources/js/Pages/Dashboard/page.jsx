import DashboardLayout from '@/Layouts/DashboardLayout';
import useProducts from '@/hooks/useProducts';
import { Head, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import OverviewSection from './_sections/OverviewSection';
import ProductsSection from './_sections/ProductsSection';
import Toast from './_sections/Toast';

const TITLES = {
    overview: { title: 'System Overview', subtitle: "Welcome back, here's what's happening today." },
    products: { title: 'Product Management', subtitle: 'Create, update, and manage your marketplace listings.' },
};

/**
 * One page, two tabs (/dashboard and /products). The product list lives HERE and is passed to
 * both tabs, so adding / editing / deleting a product instantly updates the Overview numbers.
 */
export default function Dashboard({ tab = 'overview' }) {
    const { products, loading, error, create, update, remove } = useProducts();
    const [toast, setToast] = useState(null);
    const timer = useRef();

    useEffect(() => () => clearTimeout(timer.current), []);

    const notify = (message, type = 'success') => {
        setToast({ message, type });
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setToast(null), 3000);
    };

    const handleCreate = async (payload) => { await create(payload); notify('Product added successfully'); };
    const handleUpdate = async (id, payload) => { await update(id, payload); notify('Product updated successfully'); };
    const handleDelete = async (product) => {
        try {
            await remove(product.id);
            notify('Product deleted successfully', 'danger');
        } catch {
            notify('Could not delete product', 'danger');
        }
    };

    const current = TITLES[tab] ?? TITLES.overview;

    return (
        <DashboardLayout
            tab={tab}
            title={current.title}
            subtitle={current.subtitle}
            productCount={products.length}
            showSearch={tab === 'overview'}
        >
            <Head title={tab === 'products' ? 'Products' : 'Dashboard'} />

            {tab === 'products' ? (
                <ProductsSection
                    products={products}
                    loading={loading}
                    error={error}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            ) : (
                <OverviewSection
                    products={products}
                    loading={loading}
                    onViewAll={() => router.get(route('products'), {}, { preserveState: true, preserveScroll: true })}
                />
            )}

            <Toast toast={toast} />
        </DashboardLayout>
    );
}
