import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Loads products from /api/products and exposes create / update / remove.
 * The dashboard calls this ONCE and hands the same `products` array to both the
 * Overview and the Products screens, so adding a product updates the overview instantly.
 */
export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const refresh = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
            setError('');
        } catch (e) {
            setError('Could not load products.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const create = async (payload) => {
        const { data } = await axios.post('/api/products', payload);
        setProducts((prev) => [data, ...prev]);
        return data;
    };

    const update = async (id, payload) => {
        const { data } = await axios.put(`/api/products/${id}`, payload);
        setProducts((prev) => prev.map((p) => (p.id === id ? data : p)));
        return data;
    };

    const remove = async (id) => {
        await axios.delete(`/api/products/${id}`);
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return { products, loading, error, refresh, create, update, remove };
}
