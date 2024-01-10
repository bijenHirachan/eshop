import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { MdOutlineArrowBackIos } from "react-icons/md";

const UsersDetails = ({ auth, user }) => {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
    });

    const submitHandler = (e) => {
        e.preventDefault();

        put(`/admin/users/${user.id}`);
    };

    const deleteHandler = () => {
        router.delete(`/admin/users/${user.id}`);
    };
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={user.name} />
            <Modal
                show={showModal}
                closeable={true}
                onClose={() => setShowModal(false)}
            >
                <div className="p-6">
                    <p className="text-sm text-gray-600">
                        Are you sure you want to delete {user.name} ?
                    </p>
                    <div className="mt-4 flex gap-1">
                        <button
                            onClick={() => setShowModal(false)}
                            type="button"
                            className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={deleteHandler}
                            type="button"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="py-4 h-full">
                <div className="p-6 text-gray-900">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold text-gray-600">
                            User
                        </h2>

                        <Link
                            href="/admin/users"
                            className="flex hover:underline gap-2 items-center text-gray-600"
                        >
                            <MdOutlineArrowBackIos size={12} />
                            <span className="text-sm">Back to Users</span>
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
                                            Name
                                        </label>
                                        <div className="mt-1">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    autoComplete="name"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {errors?.name && (
                                                <span className="text-red-500 text-xs">
                                                    {errors?.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="price"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Email
                                        </label>
                                        <div className="mt-1">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    autoComplete="email"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            {errors?.email && (
                                                <span className="text-red-500 text-xs">
                                                    {errors?.email}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="is_admin"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Role
                                        </label>
                                        <div className="mt-1">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <select
                                                    value={data.is_admin}
                                                    onChange={(e) =>
                                                        setData(
                                                            "is_admin",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                >
                                                    <option value="1">
                                                        Admin
                                                    </option>
                                                    <option value="0">
                                                        User
                                                    </option>
                                                </select>
                                            </div>
                                            {errors?.is_admin && (
                                                <span className="text-red-500 text-xs">
                                                    {errors?.is_admin}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-2">
                            <button
                                onClick={() => setShowModal(true)}
                                type="button"
                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Delete
                            </button>
                            <button
                                disabled={processing}
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UsersDetails;
