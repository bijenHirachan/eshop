import React from "react";
import blankimage from "../../images/blankimage.png";
import { Link, router } from "@inertiajs/react";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

const Product = ({ product, shoppingCart }) => {
    const handleAddToCart = () => {
        router.post(
            `/cart/${product.slug}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const checkInCart = () => {
        if (shoppingCart?.items?.find((item) => item.id === product.id)) {
            return true;
        }
        return false;
    };

    const handleRemoveFromCart = () => {
        router.delete(`/cart/${product.id}/remove`);
    };

    return (
        <div className="relative col-span-12 sm:col-span-6 md:col-span-4  bg-white p-2 rounded-lg">
            <Link
                href={`/products/${product.slug}`}
                className="h-4/6 w-full justify-center items-center flex"
            >
                {product.image_url ? (
                    <img
                        className="h-64 object-contain object-center w-28"
                        src={`/storage/${product.image_url}`}
                        alt={product.title}
                    />
                ) : (
                    <img
                        className="h-64 object-contain object-center w-28"
                        src={blankimage}
                    />
                )}
            </Link>
            <h2 className="text-md text-center font-semibold text-gray-600 leading-5">
                {product.title}
            </h2>

            <div className="absolute bottom-2 text-gray-500 text-md">
                € {(product.price / 100).toFixed(2)}
            </div>

            {checkInCart() ? (
                <button
                    onClick={handleRemoveFromCart}
                    className="absolute transition-all duration-75 flex hover:border-gray-500 items-center gap-2 rounded-br-lg border border-gray-400 px-2 py-1 bottom-2 right-2 text-gray-500"
                >
                    <MdRemoveShoppingCart
                        size={18}
                        className="hover:text-gray-600"
                    />
                    <span className="text-xs hover:text-gray-700">
                        Remove from cart
                    </span>
                </button>
            ) : (
                <button
                    onClick={handleAddToCart}
                    className="absolute transition-all duration-75 flex hover:border-gray-500 items-center gap-2 rounded-br-lg border border-gray-400 px-2 py-1 bottom-2 right-2 text-gray-500"
                >
                    <MdAddShoppingCart
                        size={18}
                        className="hover:text-gray-600"
                    />
                    <span className="text-xs hover:text-gray-700">
                        Add to cart
                    </span>
                </button>
            )}
        </div>
    );
};

export default Product;
