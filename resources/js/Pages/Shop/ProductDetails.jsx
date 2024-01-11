import ShopLayout from "@/Layouts/ShopLayout";
import React from "react";
import blankimage from "../../images/blankimage.png";
import Product from "@/Components/Shop/Product";
import { Head, router } from "@inertiajs/react";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

const ProductDetails = ({ auth, product, similarProducts, cart }) => {
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
        if (cart?.items?.find((item) => item.id === product.id)) {
            return true;
        }
        return false;
    };

    const handleRemoveFromCart = () => {
        router.delete(`/cart/${product.id}/remove`);
    };

    return (
        <ShopLayout user={auth.user} cart={cart}>
            <Head title={product.title} />
            <div className="w-full grid grid-cols-12 my-16 rounded-lg bg-white">
                <div className="col-span-12 md:col-span-6 h-96 p-8 flex items-center justify-center">
                    {product.image_url ? (
                        <img
                            className="w-auto h-40 object-contain object-center"
                            src={`/storage/${product.image_url}`}
                            alt={product.title}
                        />
                    ) : (
                        <img
                            className="w-auto h-40 object-contain object-center"
                            src={blankimage}
                        />
                    )}
                </div>
                <div className="col-span-12 md:col-span-6 p-8">
                    <h3 className="text-gray-500 text-lg font-semibold mb-2">
                        {product.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-5">
                        {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-16">
                        <p className=" text-gray-500 text-xl">
                            € {(product.price / 100).toFixed(2)}
                        </p>

                        {checkInCart() ? (
                            <button
                                onClick={handleRemoveFromCart}
                                className="transition-all duration-75 flex hover:border-gray-500 items-center gap-2 rounded border border-gray-400 px-2 py-1 bottom-2 right-2 text-gray-500"
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
                                className="transition-all duration-75 flex hover:border-gray-500 items-center gap-2 rounded border border-gray-400 px-2 py-1 bottom-2 right-2 text-gray-500"
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
                </div>
            </div>

            {similarProducts.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-purple-600 text-lg font-semibold mb-2">
                        Similar Products
                    </h2>
                    <div className="w-full grid grid-cols-12 gap-4">
                        {similarProducts.map((pro) => (
                            <Product
                                key={pro.id}
                                product={pro}
                                shoppingCart={cart}
                            />
                        ))}
                    </div>
                </div>
            )}
        </ShopLayout>
    );
};

export default ProductDetails;
