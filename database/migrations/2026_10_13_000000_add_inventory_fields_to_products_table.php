<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Adds the inventory fields used by the Cyber Trade dashboard.
     * `product` stays as the item name so the existing API keeps working.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('sku')->nullable()->unique()->after('product');
            $table->unsignedInteger('quantity')->default(0)->after('price');
            $table->string('category')->default('Software & Licenses')->after('quantity');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropUnique(['sku']);
            $table->dropColumn(['sku', 'quantity', 'category']);
        });
    }
};
