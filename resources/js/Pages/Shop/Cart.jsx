import CartItem from "@/Components/Shop/CartItem";
import ShopLayout from "@/Layouts/ShopLayout";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import emptycart from "../../images/emptycart.png";
import { BsCaretRight } from "react-icons/bs";

const Cart = ({ auth, cart }) => {
    const removeAllItems = () => {
        router.delete(`/cart/items`);
    };

    const totalItems = () => {
        return cart.items.reduce((total, item) => total + item.quantity, 0);
    };

    const totalPrice = () => {
        let price = 0;

        cart.items.forEach((item) => {
            price += item.price * item.quantity;
        });

        return price;
    };

    return (
        <ShopLayout user={auth.user} cart={cart}>
            <Head title="Cart" />
            {cart?.items?.length > 0 ? (
                <div className="grid grid-cols-12 gap-4 my-8">
                    <div className="col-span-12 lg:col-span-8 rounded-lg">
                        <div className=" mb-2 flex justify-between">
                            <h4 className="text-purple-600 font-semibold">
                                Items in your cart
                            </h4>
                            <button
                                className="text-purple-500 text-sm underline hover:text-gray-600 transition-all delay-75"
                                onClick={removeAllItems}
                            >
                                Remove all items
                            </button>
                        </div>

                        {cart.items.map((item, index) => (
                            <CartItem key={index} item={item} />
                        ))}
                    </div>

                    <div className="col-span-12 h-fit  lg:col-span-4 shadow-lg rounded-lg p-4 bg-white lg:mt-8">
                        <p className="text-gray-500">
                            <span className="font-semibold">
                                Subtotal ({totalItems()} items):
                            </span>
                            {"  "}
                            <span className="text-lg font-bold">
                                € {(totalPrice() / 100).toFixed(2)}
                            </span>
                        </p>
                        <Link
                            href="/checkout"
                            method="post"
                            as="button"
                            className="flex justify-center gap-2 rounded-lg font-semibold  mt-4 items-center border-2 border-gray-500 hover:border-gray-600 hover:text-gray-700 px-2 py-1 w-full text-gray-600 text-sm"
                        >
                            <span>Proceed to checkout</span>
                            <BsCaretRight size={24} strokeWidth={0.2} />
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="w-full h-5/6 flex flex-col gap-4 items-center justify-center">
                    <img
                        src={emptycart}
                        className="h-56 w-auto object-contain object-center"
                    />
                    <p className="text-gray-600 font-semibold text-2xl">
                        No cart items
                    </p>
                </div>
            )}
        </ShopLayout>
    );
};

export default Cart;
