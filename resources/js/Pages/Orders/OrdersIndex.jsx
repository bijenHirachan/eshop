import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const OrdersIndex = ({ auth, orders }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Orders" />

            <div className="py-12 bg-purple-100 h-full">
                <div className="p-6 text-gray-900">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Customer
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Payment Intent
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.data?.length > 0 ? (
                                orders?.data.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/admin/users/${order.user.id}`}
                                            >
                                                {order.user.name}
                                            </Link>
                                        </td>

                                        <td className="px-6 py-4">
                                            {order.payment_intent_id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.paid ? "Paid" : "Not Paid"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="px-6 py-4 text-center"
                                    >
                                        No orders available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrdersIndex;
