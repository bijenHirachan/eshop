import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import noimage from "../../images/noimage.jpg";
import Modal from "@/Components/Modal";
import Select from "react-select";
import { AiOutlineDelete } from "react-icons/ai";

const ProductsShow = ({ auth, product, categories, allCategories }) => {
    const [showModal, setShowModal] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState(null);

    const options = allCategories.map((cat) => {
        return { value: cat.id, label: cat.name };
    });

    const deleteHandler = () => {
        router.delete(`/admin/products/${product.slug}`);
    };

    const addCategories = (e) => {
        e.preventDefault();

        const categories = selectedCategories.map((cat) => cat.value);

        router.post(
            `/admin/categories/${product.slug}/product`,
            {
                categories,
            },
            {
                onSuccess: () => setSelectedCategories(null),
            }
        );
    };

    const removeCategory = (id) => {
        router.delete(`/admin/categories/${product.slug}/product/${id}`);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Modal
                show={showModal}
                closeable={true}
                onClose={() => setShowModal((prev) => !prev)}
            >
                <div className="p-4 text-gray-600 text-sm">
                    <div>
                        Are you sure you want to delete{" "}
                        <span className="font-semibold">{product.title}</span> ?
                    </div>
                    <div className="flex mt-4 gap-1">
                        <button
                            onClick={() => setShowModal(false)}
                            className="border border-gray-400 hover:border-gray-500 font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={deleteHandler}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
            <Head title={product.title} />
            <div className="py-4 h-full">
                <div className="p-6 flex justify-between">
                    <h2 className="text-lg font-semibold text-gray-600">
                        {product.title}
                    </h2>

                    <Link
                        href="/admin/products"
                        className="flex hover:underline gap-2 items-center text-gray-600"
                    >
                        <MdOutlineArrowBackIos size={12} />
                        <span className="text-sm">Back to Products</span>
                    </Link>
                </div>
                <div className="p-6 text-gray-900 flex flex-col items-center justify-center">
                    <div className="flex w-full justify-center my-16">
                        {product.image_url ? (
                            <img
                                className="h-32 w-auto object-contain object-center"
                                src={`/storage/${product.image_url}`}
                                alt={product.title}
                            />
                        ) : (
                            <img
                                className="h-32 w-auto object-contain object-center"
                                src={noimage}
                            />
                        )}
                    </div>
                    {categories.length > 0 && (
                        <div className="mb-4">
                            <p className="text-center text-gray-500 font-semibold mb-1">
                                Categories
                            </p>

                            <div className="flex gap-2 flex-wrap">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="border flex gap-1 items-center border-gray-400 text-gray-500 px-1 rounded"
                                    >
                                        <span>{category.name}</span>{" "}
                                        <AiOutlineDelete
                                            onClick={() =>
                                                removeCategory(category.id)
                                            }
                                            className="text-red-400 transition-all delay-75 cursor-pointer hover:text-red-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <p className="my-2">{product.excerpt}</p>
                    <p className="my-2">{product.description}</p>

                    <p className="my-2">${(product.price / 100).toFixed(2)}</p>
                    <p className="my-2">Quantity {product.quantity}</p>

                    <form
                        onSubmit={addCategories}
                        className="flex flex-col text-gray-500 text-sm my-2 w-64"
                    >
                        <label htmlFor="">Add categories</label>
                        <Select
                            value={selectedCategories}
                            onChange={setSelectedCategories}
                            isMulti
                            className="w-full"
                            options={options}
                        />
                        <button className="mt-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            Add
                        </button>
                    </form>
                    <div className="flex gap-2 my-2">
                        <Link
                            href={`/admin/products/${product.slug}/edit`}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ProductsShow;
