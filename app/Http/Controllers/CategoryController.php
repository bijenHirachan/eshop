<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Category::class, 'category');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Categories/CategoriesIndex', [
            'categories' => Category::where('name', 'LIKE', '%'.$request->search.'%')
                            ->latest()                
                            ->paginate(10)
                            ->withQueryString(),
            'searchString' => $request->search ?? ""
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        Category::create([
            'name' => $request->name
        ]);
    }

  
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
    }

    public function addCategories(Product $product, Request $request)
    {
        if(!Gate::allows('add-categories')) abort(403);

        $currentCategories = $product->categories->map(function ($cat) {
            return $cat->id;
        });

        $product->categories()->attach(array_diff($request->categories, $currentCategories->toArray()));
    }

    public function removeCategory(Product $product, Category $category)
    {
        if(!Gate::allows('remove-categories')) abort(403);

        $product->categories()->detach($category->id);
    }
}
