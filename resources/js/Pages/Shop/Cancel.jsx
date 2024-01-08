import ShopLayout from "@/Layouts/ShopLayout";
import { Link } from "@inertiajs/react";
import React from "react";

const Cancel = ({ auth, cart }) => {
    return (
        <ShopLayout user={auth.user} cart={cart}>
            <div className="flex flex-col h-5/6 items-center justify-center gap-2">
                <p className="text-lg text-gray-600">
                    Your payment got cancelled.
                </p>
                <Link
                    href="/cart"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-all delay-75 underline "
                >
                    Back to cart
                </Link>
            </div>
        </ShopLayout>
    );
};

export default Cancel;
