import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";

const ProductsCreate = ({ auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        excerpt: "",
        description: "",
        price: "",
        quantity: "",
        image_url: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();

        // console.log(data);
        post("/admin/products", {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Products" />
            <div className="py-4 h-full">
                <div className="p-6 text-gray-900">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold text-gray-600">
                            Create Product
                        </h2>

                        <Link
                            href="/admin/products"
                            className="flex hover:underline gap-2 items-center text-gray-600"
                        >
                            <MdOutlineArrowBackIos size={12} />
                            <span className="text-sm">Back to Products</span>
                        </Link>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="title"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Title
                                        </label>
                                        <div className="mt-1">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    value={data.title}
                                                    onChange={(e) =>
                                                        setData(
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    autoComplete="title"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {errors?.title && (
                                                <span className="text-red-500 text-xs">
                                                    {errors?.title}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="price"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Price
                                        </label>
                                        <div className="mt-1">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    value={data.price}
                                                    onChange={(e) =>
                                                        setData(
                                                            "price",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    autoComplete="price"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {errors?.price && (
                                                <span className="text-red-500 text-xs">
                                                    {errors?.price}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="quantity"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Quantity
                                        </label>
                                        <div className="mt-1">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    value={data.quantity}
                                                    onChange={(e) =>
                                                        setData(
                                                            "quantity",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    name="quantity"
                                                    id="quantity"
                                                    autoComplete="quantity"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {errors?.quantity && (
                                                <span className="text-red-500 text-xs">
                                                    {errors?.quantity}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="excerpt"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Excerpt
                                        </label>
                                        <div className="mt-1">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    value={data.excerpt}
                                                    onChange={(e) =>
                                                        setData(
                                                            "excerpt",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    name="excerpt"
                                                    id="excerpt"
                                                    autoComplete="excerpt"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {errors?.excerpt && (
                                                <span className="text-red-500 text-xs">
                                                    {errors?.excerpt}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="about"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Description
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                id="description"
                                                name="description"
                                                rows="3"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            ></textarea>
                                        </div>
                                        {errors?.description && (
                                            <span className="text-red-500 text-xs">
                                                {errors?.description}
                                            </span>
                                        )}
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="image"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Image
                                        </label>
                                        <div className="mt-1">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    onChange={(e) =>
                                                        setData(
                                                            "image_url",
                                                            e.target.files[0]
                                                        )
                                                    }
                                                    type="file"
                                                    name="image"
                                                    id="image"
                                                    autoComplete="image"
                                                    className="file:cursor-pointer file:rounded file:border-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                disabled={processing}
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductsCreate;
