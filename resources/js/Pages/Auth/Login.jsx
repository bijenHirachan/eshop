import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import ShopLayout from "@/Layouts/ShopLayout";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <main className="h-screen px-8 flex flex-col justify-center items-center w-full overflow-x-hidden overflow-y-auto bg-purple-200">
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="w-full sm:w-1/2 md:w-2/5 xl:w-1/5"
            >
                <div>
                    <label
                        className="text-gray-600 text-sm font-semibold"
                        htmlFor="email"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full rounded-lg border-none focus:outline-none focus:ring-0"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <span className="text-xs text-red-500">{errors.email}</span>
                </div>

                <div className="mt-2">
                    <label
                        className="text-gray-600 text-sm font-semibold"
                        htmlFor="password"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full rounded-lg border-none focus:outline-none focus:ring-0"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <span className="text-xs text-red-500">
                        {errors.password}
                    </span>
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="remember"
                            className="border-none outline-none focus:ring-0 text-purple-500"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-between mt-4">
                    {/* {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )} */}
                    <Link
                        href={route("register")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Not registered yet?
                    </Link>
                    <button
                        className="bg-purple-600 hover:bg-purple-900 transition-all delay-75 px-4 py-2 rounded-lg text-purple-50"
                        disabled={processing}
                    >
                        Log in
                    </button>
                </div>
            </form>
        </main>
    );

    // return (
    //     <GuestLayout>
    //         <Head title="Log in" />

    //         {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

    //         <form onSubmit={submit}>
    //             <div>
    //                 <InputLabel htmlFor="email" value="Email" />

    //                 <TextInput
    //                     id="email"
    //                     type="email"
    //                     name="email"
    //                     value={data.email}
    //                     className="mt-1 block w-full"
    //                     autoComplete="username"
    //                     isFocused={true}
    //                     onChange={(e) => setData('email', e.target.value)}
    //                 />

    //                 <InputError message={errors.email} className="mt-2" />
    //             </div>

    //             <div className="mt-4">
    //                 <InputLabel htmlFor="password" value="Password" />

    //                 <TextInput
    //                     id="password"
    //                     type="password"
    //                     name="password"
    //                     value={data.password}
    //                     className="mt-1 block w-full"
    //                     autoComplete="current-password"
    //                     onChange={(e) => setData('password', e.target.value)}
    //                 />

    //                 <InputError message={errors.password} className="mt-2" />
    //             </div>

    //             <div className="block mt-4">
    //                 <label className="flex items-center">
    //                     <Checkbox
    //                         name="remember"
    //                         checked={data.remember}
    //                         onChange={(e) => setData('remember', e.target.checked)}
    //                     />
    //                     <span className="ms-2 text-sm text-gray-600">Remember me</span>
    //                 </label>
    //             </div>

    //             <div className="flex items-center justify-end mt-4">
    //                 {canResetPassword && (
    //                     <Link
    //                         href={route('password.request')}
    //                         className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //                     >
    //                         Forgot your password?
    //                     </Link>
    //                 )}

    //                 <PrimaryButton className="ms-4" disabled={processing}>
    //                     Log in
    //                 </PrimaryButton>
    //             </div>
    //         </form>
    //     </GuestLayout>
    // );
}
