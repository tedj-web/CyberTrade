<?php

namespace Database\Seeders;

use App\Models\Products;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Sample marketplace listings (same data as the original products.html).
     */
    public function run(): void
    {
        $items = [
            ['Quantum Node License', 'CT-QN-1001', 249.00, 128, 'Software & Licenses'],
            ['Neural Trade Bot Pro', 'CT-NTB-2045', 599.00, 34, 'Software & Licenses'],
            ['Secure Vault Module', 'CT-SVM-3312', 89.50, 512, 'Security Add-ons'],
            ['API Access Pack (10K calls)', 'CT-API-4420', 39.99, 0, 'Software & Licenses'],
            ['Market Analytics Suite', 'CT-MAS-5510', 349.00, 76, 'Analytics Tools'],
            ['Hardware Signing Key', 'CT-HSK-6630', 129.00, 8, 'Hardware & Devices'],
            ['Enterprise Node Cluster', 'CT-ENC-7741', 1499.00, 12, 'Hardware & Devices'],
            ['Risk Shield Add-on', 'CT-RSA-8852', 59.00, 340, 'Security Add-ons'],
        ];

        $user = User::first();
        if (! $user) {
            return; // create an account first; products belong to a user
        }

        foreach ($items as [$product, $sku, $price, $quantity, $category]) {
            Products::updateOrCreate(
                ['user_id' => $user->id, 'sku' => $sku],
                compact('product', 'price', 'quantity', 'category'),
            );
        }
    }
}
