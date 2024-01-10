<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'payment_intent_id',
        'paid'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id', 'customer_id');
    }
}
