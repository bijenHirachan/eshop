<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Checkout\Session;
use Stripe\Stripe;

class ShopController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function index(Request $request)
    {
        return Inertia::render('Shop/ShopIndex',[
            'featuredProducts' => Product::where('featured_product', 1)->get()
        ]);
    }

    public function products(Request $request)
    {
        $category = Category::find($request->category);

        return Inertia::render('Shop/Products', [
            'products' => $category ? $category->products()->where('title', 'LIKE', "%{$request->search}%")->get() : Product::where('title', 'LIKE', "%{$request->search}%")->get(),
            'categories' => Category::all(),
            'selectedCategory' => $request->category,
            'searchString' => $request->search
        ]);
    }

    public function cart()
    {
        return Inertia::render('Shop/Cart');
    }

    public function show(Product $product)
    {
        $products = collect();

        foreach($product->categories->map(fn ($cat) => $cat->products) as $pro){
            foreach($pro as $p){
                if($product->id !== $p->id && !$products->pluck('id')->contains($p->id)) {
                    $products->push($p);
                }
            }
        }

        return Inertia::render('Shop/ProductDetails', [
            'product' => $product,
            'similarProducts' => $products
        ]);
    }

    public function addToCart(Product $product)
    {
        if(!collect(session('cart-items'))->pluck('id')->contains($product->id)){
            session()->push('cart-items', [
                        "id" => $product->id,
                        "title" => $product->title,
                        "quantity" => 1,
                        "slug" => $product->slug,
                        "image_url" => $product->image_url,
                        "price" => $product->price,
                        "excerpt" => $product->excerpt
            ]);
        }
       
    }

    public function removeFromCart(int $id)
    {
        $items = [];

        foreach(session('cart-items') as $item)
        {
            if($item['id'] !== $id){
                array_push($items, $item);
            }
        }

        session([
            "cart-items" => $items
        ]);
        
    }

    public function removeAllItemsFromCart()
    {
        session()->forget('cart-items');
    }

    public function increaseQuantity(int $id)
    {
        $items = [];

        foreach(session('cart-items') as $item){
            if($item['id'] === $id){
                $item['quantity'] = $item['quantity'] + 1;
            }

            array_push($items, $item);
        }
        
        session([
            "cart-items" => $items
        ]);
    }

    public function decreaseQuantity(int $id)
    {
        $items = [];

        foreach(session('cart-items') as $item){
            if($item['id'] === $id && $item['quantity'] > 1){
                $item['quantity'] = $item['quantity'] - 1;
            }

            array_push($items, $item);
        }
        
        session([
            "cart-items" => $items
        ]);
    }

    public function checkout()
    {
        $lineItems = [];

        foreach(session('cart-items') as $item){
            array_push($lineItems, [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $item['title'],
                    ],
                    'unit_amount' => $item['price']
                ],
                'quantity' => $item['quantity']
            ]);
        }

        $session = Session::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            // 'invoice_creation' => ['enabled' => true],
            'success_url' => route('payment.success'),
            'cancel_url' => route('payment.cancel'),
            'customer' => auth()->user()->customer_id
        ]);

        return Inertia::location($session->url);

        // return redirect()->away($session->url);
    }

    public function success()
    {
        $this->removeAllItemsFromCart();
        return Inertia::render('Shop/Success');
    }

    public function cancel()
    {
        return Inertia::render('Shop/Cancel');
    }
}
