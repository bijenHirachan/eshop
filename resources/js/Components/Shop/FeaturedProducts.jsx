import { Link } from "@inertiajs/react";
import React from "react";

const FeaturedProducts = ({ featuredProducts }) => {
    return (
        <div className="mt-16">
            <div className="grid grid-cols-12 gap-4">
                <Link
                    href={`/products/${featuredProducts[0]?.slug}`}
                    className="relative  col-span-12 bg-white p-8 rounded-lg grid grid-cols-12"
                >
                    <div className="col-span-12 sm:col-span-6 h-72 flex justify-center items-center">
                        <img
                            className="h-full w-auto object-contain object-center"
                            src={`/storage/${featuredProducts[0]?.image_url}`}
                            alt=""
                        />
                    </div>
                    <div className="col-span-12 sm:col-span-6 flex justify-center items-center ">
                        <h2 className="text-gray-500 text-2xl font-semibold flex flex-col items-center justify-center mb-4">
                            <p className="text-purple-500">Hurry Up!</p>
                            <p className="">Get your products now.</p>
                        </h2>
                        <span className="absolute bottom-2 right-2 z-20 bg-red-500 text-red-50 px-2 py-1 rounded">
                            € {(featuredProducts[0]?.price / 100).toFixed(2)}
                        </span>
                    </div>
                </Link>

                <Link
                    href={`/products/${featuredProducts[1]?.slug}`}
                    className="relative col-span-12 sm:col-span-6 h-72 rounded-lg p-8 flex justify-center items-center bg-white"
                >
                    <img
                        className="h-full w-auto object-contain object-center"
                        src={`/storage/${featuredProducts[1]?.image_url}`}
                        alt=""
                    />
                    <span className="absolute bottom-2 right-2 z-20 bg-red-500 text-red-50 px-2 py-1 rounded">
                        $ {(featuredProducts[1]?.price / 100).toFixed(2)}
                    </span>
                </Link>

                <Link
                    href={`/products/${featuredProducts[2]?.slug}`}
                    className="relative col-span-12 sm:col-span-6 h-72 rounded-lg p-8 flex justify-center items-center bg-white"
                >
                    <img
                        className="h-full w-auto object-contain object-center"
                        src={`/storage/${featuredProducts[2]?.image_url}`}
                        alt=""
                    />
                    <span className="absolute bottom-2 right-2 z-20 bg-red-500 text-red-50 px-2 py-1 rounded">
                        $ {(featuredProducts[2]?.price / 100).toFixed(2)}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedProducts;
