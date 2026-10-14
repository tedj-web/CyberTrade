<?php

namespace Tests\Feature;

use App\Models\Products;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductsOwnershipTest extends TestCase
{
    use RefreshDatabase;

    private array $payload = ['product' => 'Apple', 'sku' => 'APL-1', 'price' => 1.5, 'quantity' => 10, 'category' => 'Software & Licenses'];

    public function test_guests_cannot_use_the_products_api(): void
    {
        $this->getJson('/api/products')->assertUnauthorized();
        $this->postJson('/api/products', $this->payload)->assertUnauthorized();
    }

    public function test_each_account_only_sees_its_own_products(): void
    {
        [$a, $b] = [User::factory()->create(), User::factory()->create()];

        $this->actingAs($a)->postJson('/api/products', $this->payload)->assertCreated();

        $this->actingAs($b)->getJson('/api/products')->assertOk()->assertJsonCount(0);
        $this->actingAs($a)->getJson('/api/products')->assertOk()->assertJsonCount(1);
    }

    public function test_cannot_edit_or_delete_another_accounts_product(): void
    {
        [$a, $b] = [User::factory()->create(), User::factory()->create()];
        $product = $a->products()->create($this->payload);

        $this->actingAs($b)->putJson("/api/products/{$product->id}", $this->payload)->assertNotFound();
        $this->actingAs($b)->deleteJson("/api/products/{$product->id}")->assertNotFound();
        $this->assertDatabaseHas('products', ['id' => $product->id]);
    }

    public function test_same_sku_allowed_for_different_accounts_but_not_within_one(): void
    {
        [$a, $b] = [User::factory()->create(), User::factory()->create()];

        $this->actingAs($a)->postJson('/api/products', $this->payload)->assertCreated();
        $this->actingAs($b)->postJson('/api/products', $this->payload)->assertCreated();
        $this->actingAs($a)->postJson('/api/products', $this->payload)->assertUnprocessable();
    }
}
