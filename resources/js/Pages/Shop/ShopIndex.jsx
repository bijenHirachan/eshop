import React from "react";
import ShopLayout from "@/Layouts/ShopLayout";
import { Head, Link, router } from "@inertiajs/react";
import FeaturedProducts from "@/Components/Shop/FeaturedProducts";
import { BsCaretRight } from "react-icons/bs";

const ShopIndex = ({ auth, featuredProducts, cart }) => {
    return (
        <ShopLayout user={auth.user} cart={cart}>
            <Head title="My Shop" />

            <FeaturedProducts featuredProducts={featuredProducts} />

            <div className="my-16">
                <Link
                    href="/products"
                    className="flex rounded-lg w-fit items-center border-2 border-purple-500 hover:border-purple-600 hover:text-purple-700 px-4 py-2 text-purple-600 text-lg"
                >
                    <span>Start shopping now!</span>
                    <BsCaretRight size={24} strokeWidth={0.2} />
                </Link>
            </div>
        </ShopLayout>
    );
};

export default ShopIndex;
