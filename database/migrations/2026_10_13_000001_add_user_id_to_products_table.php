<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Products now belong to the account that created them.
     * SKUs only need to be unique per account, not across the whole table.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropUnique(['sku']);
            $table->foreignId('user_id')->nullable()->after('id')->constrained()->cascadeOnDelete();
            $table->unique(['user_id', 'sku']);
        });

        // Keep any pre-existing rows: hand them to the first account.
        $firstUser = DB::table('users')->min('id');
        if ($firstUser) {
            DB::table('products')->whereNull('user_id')->update(['user_id' => $firstUser]);
        }
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'sku']);
            $table->dropConstrainedForeignId('user_id');
            $table->unique('sku');
        });
    }
};
