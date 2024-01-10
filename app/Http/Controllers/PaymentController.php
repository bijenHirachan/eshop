<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function __invoke(Request $request)
    {
        if($request->type === "checkout.session.completed"){
            Order::create([
                'customer_id' => $request->data['object']['customer'],
                'payment_intent_id' => $request->data['object']['payment_intent'],
                'paid' =>  $request->data['object']['payment_status'] === "paid" ? 1 : 0
            ]);
        }

    }
}
