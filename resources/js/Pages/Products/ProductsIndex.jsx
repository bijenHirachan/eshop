import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import noimage from "../../images/noimage.jpg";
import { IoEyeOutline } from "react-icons/io5";

const ProductsIndex = ({
    auth,
    products,
    searchString,
    categories,
    selectedCategory,
}) => {
    const [search, setSearch] = useState(searchString ?? "");
    const [category, setCategory] = useState(selectedCategory ?? "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            `/admin/products`,
            { search, category },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleCategory = (e) => {
        setCategory(e.target.value);
        router.get(
            `/admin/products`,
            { search, category: e.target.value },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleFeaturedProduct = (slug) => {
        router.post(`/admin/products/${slug}/featured`);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Products" />

            <div className="py-12 bg-purple-100 h-full">
                <div className="p-6 text-gray-900">
                    <div className="py-3 flex justify-between">
                        <form className="flex" onSubmit={handleSearch}>
                            <input
                                type="search"
                                name="search"
                                id="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoComplete="search"
                                placeholder="Search..."
                                className="block rounded-l bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-r shadow">
                                Go
                            </button>
                        </form>

                        <select
                            className="block w-64 rounded bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            value={category}
                            onChange={handleCategory}
                        >
                            <option value="">Select</option>
                            {categories.length > 0 &&
                                categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                        </select>

                        <Link
                            href="/admin/products/create"
                            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                        >
                            Add Product
                        </Link>
                    </div>
                    <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Visit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.data?.length > 0 ? (
                                products?.data.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {product.image_url ? (
                                                <img
                                                    className="h-10 w-10 object-contain object-center rounded-lg"
                                                    src={`/storage/${product.image_url}`}
                                                    alt={product.title}
                                                />
                                            ) : (
                                                <img
                                                    className="h-10 w-10 object-contain object-center rounded-lg"
                                                    src={noimage}
                                                />
                                            )}
                                        </th>
                                        <td
                                            className={`px-6 py-4 cursor-pointer ${
                                                product.featured_product
                                                    ? "text-green-500 font-semibold"
                                                    : ""
                                            }`}
                                        >
                                            <button
                                                onClick={() =>
                                                    handleFeaturedProduct(
                                                        product.slug
                                                    )
                                                }
                                            >
                                                {product.title}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            $ {(product.price / 100).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.quantity}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/admin/products/${product.slug}`}
                                            >
                                                <IoEyeOutline
                                                    className="cursor-pointer"
                                                    size={20}
                                                />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-4 text-center"
                                    >
                                        No products available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-between py-4">
                        {products.links.map((link, index) => (
                            <div key={index}>
                                {link.url === null ? (
                                    <button
                                        disabled
                                        className="bg-white text-gray-800 font-semibold py-2 px-4 cursor-not-allowed border border-gray-400 rounded shadow"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    ></button>
                                ) : (
                                    <div className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                        <Link
                                            href={link.url}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        ></Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductsIndex;
