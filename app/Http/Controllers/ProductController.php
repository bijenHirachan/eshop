<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Product::class, 'product');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $category = Category::find($request->category);


        return Inertia::render('Products/ProductsIndex', [
            'products' => $category ? $category->products()
                ->where('title', 'LIKE', '%'.$request->search.'%')
                ->orderBy('title', 'ASC')
                ->paginate(8)
                ->withQueryString() 
            : Product::where('title', 'LIKE', '%'.$request->search.'%')
                ->orderBy('title', 'ASC')
                ->paginate(8)
                ->withQueryString(),
            'searchString' => $request->search ?? '',
            'categories' => Category::orderBy('name')->get(),
            'selectedCategory' => $request->category
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Products/ProductsCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        if($request->image_url){
            $fileName = pathinfo($request->image_url->getClientOriginalName())['filename'];
            $path = $request->image_url->storeAs('product_images', $fileName . time() .".". $request->image_url->getClientOriginalExtension(), 'public');
        }

        $product = Product::create([
            'title' => $request->title,
            'slug' => str()->slug($request->title),
            'excerpt' => $request->excerpt,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'image_url' => $path ?? NULL
        ]);

        return to_route('products.show', $product->slug);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('Products/ProductsShow',[
            'product' => $product,
            'categories' => $product->categories,
            'allCategories' => Category::all()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/ProductsEdit', [
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        if($request->image_url){
            $fileName = pathinfo($request->image_url->getClientOriginalName())['filename'];
            $path = $request->image_url->storeAs('product_images', $fileName . time() .".". $request->image_url->getClientOriginalExtension(), 'public');
        }
        $product->update([
            'title' => $request->title,
            'slug' => str()->slug($request->title),
            'excerpt' => $request->excerpt,
            'description' => $request->description,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'image_url' => $path ?? $product->image_url
        ]);

        return to_route('products.show', $product->slug);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return to_route('products.index');
    }

    public function updateFeaturedProduct(Product $product)
    {
        if(!Gate::allows('update-featured')) abort(403);

        $product->update([
            'featured_product' => !$product->featured_product 
        ]);
    }
}
