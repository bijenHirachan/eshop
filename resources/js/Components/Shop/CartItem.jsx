import React from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import noimage from "../../images/noimage.jpg";
import { Link, router } from "@inertiajs/react";

const CartItem = ({ item }) => {
    const handleIncrease = () => {
        router.post(
            `/cart/${item.id}/increase`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleDecrease = () => {
        if (item.quantity > 1) {
            router.post(
                `/cart/${item.id}/decrease`,
                {},
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        } else {
            alert("Cannot decrease more than 1");
        }
    };

    const handleRemoveItem = () => {
        router.delete(`/cart/${item.id}/remove`, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <div className="grid grid-cols-12 items-center relative bg-white rounded-lg p-4 mb-2">
            <Link href={`/products/${item?.slug}`} className="col-span-2">
                {item?.image_url ? (
                    <img
                        className="h-32 w-32 object-contain object-center"
                        src={`/storage/${item.image_url}`}
                        alt={item.title}
                    />
                ) : (
                    <img
                        className="h-32 w-32 object-contain object-center"
                        src={noimage}
                    />
                )}
            </Link>

            <div className="col-span-6 px-4">
                <h2 className="text-gray-500 font-semibold">{item.title}</h2>
                <p className="text-gray-400 text-sm">{item.excerpt}</p>
            </div>

            <div className="col-span-4  flex justify-evenly items-center gap-1">
                <button
                    onClick={handleDecrease}
                    className="h-8 w-8 flex justify-center items-center"
                >
                    <AiOutlineMinusSquare size={22} className="text-gray-600" />
                </button>
                <h3 className="h-8 w-8 flex justify-center items-center text-gray-600 font-semibold">
                    {item.quantity}
                </h3>
                <button
                    onClick={handleIncrease}
                    className="h-8 w-8 flex justify-center items-center"
                >
                    <AiOutlinePlusSquare size={22} className="text-gray-600" />
                </button>
                <button
                    onClick={handleRemoveItem}
                    className="text-gray-500 text-sm underline"
                >
                    Remove
                </button>
                <div className="text-lg text-gray-500 absolute top-2 right-2 font-bold">
                    € {((item.price / 100) * item.quantity).toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default CartItem;
