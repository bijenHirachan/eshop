import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const CategoriesIndex = ({ auth, categories, searchString, errors }) => {
    const [search, setSearch] = useState(searchString);
    const [name, setName] = useState("");

    const [currentCategory, setCurrentCategory] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            `/admin/categories`,
            { search },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleCreate = (e) => {
        e.preventDefault();
        router.post(
            "/admin/categories",
            { name },
            {
                preserveState: true,
                replace: true,
                onSuccess: () => setName(""),
            }
        );
    };

    const handleDelete = () => {
        if (currentCategory?.id) {
            router.delete(`/admin/categories/${currentCategory?.id}`, {
                preserveState: true,
                replace: true,
                onSuccess: () => {
                    setCurrentCategory(null);
                    setShowModal(false);
                },
            });
        }
    };

    const deleteHandeler = (cat) => {
        setCurrentCategory(cat);
        setShowModal(true);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Categories" />

            <Modal
                show={showModal}
                closeable
                onClose={() => {
                    setCurrentCategory(null);
                    setShowModal(false);
                }}
            >
                <div className="p-4">
                    <p>
                        Are you sure you want to delete{" "}
                        <span>{currentCategory?.name}</span> ?
                    </p>
                    <div className="flex mt-4 gap-1">
                        <button
                            onClick={() => {
                                setCurrentCategory(null);
                                setShowModal(false);
                            }}
                            className="border border-gray-400 hover:border-gray-500 font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>

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

                        <form className="flex relative" onSubmit={handleCreate}>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                placeholder="Category Name..."
                                className="block rounded-l bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-r shadow">
                                Add
                            </button>

                            {errors?.name && (
                                <span className="absolute bottom-[-15px] text-xs text-red-500">
                                    {errors?.name}
                                </span>
                            )}
                        </form>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.data?.length > 0 ? (
                                categories?.data.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4">
                                            {category.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <AiOutlineDelete
                                                onClick={() =>
                                                    deleteHandeler(category)
                                                }
                                                className="text-red-500 cursor-pointer transition-all delay-75 hover:text-red-700"
                                                size={20}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="px-6 py-4 text-center"
                                    >
                                        No categories available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="flex justify-between py-4">
                        {categories.links.map((link, index) => (
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
                                    <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                        <Link
                                            href={link.url}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        ></Link>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CategoriesIndex;
