<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function __invoke(Request $request)
    {
        if($request->type === "payment_intent.created"){
            Order::create([
                "customer_id" => $request->data['object']['customer'],
                "payment_intent_id" => $request->data['object']['id'],
            ]);
        }

        if($request->type === "charge.succeeded" ){
            $order = Order::where('payment_intent_id', $request->data['object']['payment_intent'])->first();
            
            if($order){
                $order->update([
                    "paid" => $request->data['object']['paid'],
                ]);
            }
      
        }
    }
}
