import ShopLayout from "@/Layouts/ShopLayout";
import { Link, router } from "@inertiajs/react";
import React, { useEffect } from "react";

const Success = ({ auth, cart }) => {
    return (
        <ShopLayout user={auth.user} cart={cart}>
            <div className="flex flex-col h-5/6 items-center justify-center gap-2">
                <p className="text-lg text-gray-600">
                    Your payment was successful.
                </p>
                <Link
                    href="/products"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-all delay-75 underline "
                >
                    Get back to shopping
                </Link>
            </div>
        </ShopLayout>
    );
};

export default Success;
