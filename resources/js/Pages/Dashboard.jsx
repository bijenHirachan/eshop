import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    auth,
    products,
    categories,
    users,
    orders,
}) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="p-12 bg-purple-100 h-full flex items-center w-full justify-center">
                <div className="p-6 bg-white rounded-lg grid grid-cols-12 gap-2 w-full">
                    <div className="col-span-3 border border-purple-600 rounded-lg h-24 flex flex-col items-center justify-center gap-1">
                        <h3 className="font-bold text-purple-600">Products</h3>
                        <p className="text-3xl text-purple-500">{products}</p>
                    </div>
                    <div className="col-span-3 border border-purple-600 rounded-lg h-24 flex flex-col items-center justify-center gap-1">
                        <h3 className="font-bold text-purple-600">
                            Categories
                        </h3>
                        <p className="text-3xl text-purple-500">{categories}</p>
                    </div>
                    <div className="col-span-3 border border-purple-600 rounded-lg h-24 flex flex-col items-center justify-center gap-1">
                        <h3 className="font-bold text-purple-600">Users</h3>
                        <p className="text-3xl text-purple-500">{users}</p>
                    </div>
                    <div className="col-span-3 border border-purple-600 rounded-lg h-24 flex flex-col items-center justify-center gap-1">
                        <h3 className="font-bold text-purple-600">Orders</h3>
                        <p className="text-3xl text-purple-500">{orders}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
