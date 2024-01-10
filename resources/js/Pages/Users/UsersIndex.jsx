import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const UsersIndex = ({ auth, users }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />

            <div className="py-12 bg-purple-100 h-full">
                <div className="p-6 text-gray-900">
                    <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.data?.length > 0 ? (
                                users?.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/admin/users/${user.id}`}
                                            >
                                                {user.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.is_admin ? "Admin" : "User"}
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
                        {users.links.map((link, index) => (
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

export default UsersIndex;
