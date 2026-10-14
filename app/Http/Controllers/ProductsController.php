<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Http\Requests\StoreProductsRequest;
use App\Http\Requests\UpdateProductsRequest;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //only the signed-in user's products
        $products = $request->user()->products()->latest()->get();
        //return products as JSON
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //      
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductsRequest $request)
    {
        //validate the request
        $validated = $request->validated();
        //create a new product
        $product = $request->user()->products()->create($validated);
        //return the created product as JSON
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Products $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductsRequest $request, Products $product)
    {
        $this->authorizeOwner($request, $product);
        //validate the request
        $validated = $request->validated();
        //update the product
        $product->update($validated);
        //return the updated product as JSON
        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Products $product)
    {
        $this->authorizeOwner($request, $product);
        //delete the product
        $product->delete();
        //return a success message as JSON
        return response()->json(null, 204);
    }

    /**
     * Another account's product behaves as if it does not exist.
     */
    private function authorizeOwner(Request $request, Products $product): void
    {
        abort_unless($product->user_id === $request->user()->id, 404);
    }
}
