import React, { useEffect, useState } from "react";
import ShopLayout from "@/Layouts/ShopLayout";
import { Head, router } from "@inertiajs/react";
import Product from "@/Components/Shop/Product";

const Products = ({
    auth,
    products,
    cart,
    categories,
    selectedCategory,
    searchString,
}) => {
    const [search, setSearch] = useState(searchString ?? "");
    const [category, setCategory] = useState(selectedCategory ?? "");

    const searchNow = () => {
        router.get(
            "/products",
            {
                search,
                category,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    useEffect(() => {
        const searchHandler = setTimeout(() => searchNow(), 500);

        return () => {
            clearTimeout(searchHandler);
        };
    }, [search, category]);

    return (
        <ShopLayout user={auth.user} cart={cart}>
            <Head title="My Shop" />

            <div className="mt-8">
                {/* <div className="col-span-12 h-10  rounded-lg flex justify-center items-center">
                    <p className="text-purple-400 text-2xl font-semibold">
                        Our Products
                    </p>
                </div> */}

                <div className="mt-4 flex justify-between">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="border border-purple-400 rounded-lg focus:ring-0"
                        placeholder="Search..."
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-purple-400 rounded-lg focus:ring-0"
                    >
                        <option value="">All</option>
                        {categories.length > 0 &&
                            categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                    </select>
                </div>
                {products.length > 0 ? (
                    <div className="grid grid-cols-12 gap-4 py-8">
                        {products.map((product) => (
                            <Product
                                key={product.id}
                                product={product}
                                shoppingCart={cart}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="col-span-12 h-64 sm:col-span-6 md:col-span-4  p-2 flex justify-center items-center">
                        <p className="text-lg text-purple-500">
                            No products found
                        </p>
                    </div>
                )}
            </div>
        </ShopLayout>
    );
};

export default Products;
