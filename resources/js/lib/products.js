export const CATEGORIES = [
    'Software & Licenses',
    'Hardware & Devices',
    'Security Add-ons',
    'Analytics Tools',
];

export const LOW_STOCK_LIMIT = 20;

export function getStatus(qty) {
    const n = Number(qty);
    if (n === 0) return 'Out of Stock';
    if (n <= LOW_STOCK_LIMIT) return 'Low Stock';
    return 'In Stock';
}

export const STATUS_BADGE = {
    'In Stock': 'bg-[#52FFB8]/10 text-[#52FFB8]',
    'Low Stock': 'bg-[#FFF385]/10 text-[#FFF385]',
    'Out of Stock': 'bg-red-400/10 text-red-400',
};

export const money = (n) =>
    '$' +
    Number(n || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

/** Single source of truth for every number on the dashboard overview. */
export function computeStats(products) {
    const inventoryValue = products.reduce((s, p) => s + Number(p.price) * Number(p.quantity), 0);
    const inStock = products.filter((p) => getStatus(p.quantity) === 'In Stock').length;
    const needsAttention = products.length - inStock; // low + out of stock

    const byCategory = CATEGORIES.map((name) => ({
        name,
        count: products.filter((p) => p.category === name).length,
    }));

    return { total: products.length, inventoryValue, inStock, needsAttention, byCategory };
}
