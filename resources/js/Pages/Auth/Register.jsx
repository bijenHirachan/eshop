import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <main className="h-screen px-8 flex flex-col justify-center items-center w-full overflow-x-hidden overflow-y-auto bg-purple-200">
            <Head title="Register" />

            <form
                onSubmit={submit}
                className="w-full sm:w-1/2 md:w-2/5 xl:w-1/5"
            >
                <div>
                    <label
                        className="text-gray-600 text-sm font-semibold"
                        htmlFor="name"
                    >
                        Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        className="w-full rounded-lg border-none focus:outline-none focus:ring-0"
                        autoComplete="name"
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <span className="text-xs text-red-500">{errors.name}</span>
                </div>

                <div className="mt-2">
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
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <span className="text-xs text-red-500">
                        {errors.password}
                    </span>
                </div>

                <div className="mt-2">
                    <label
                        className="text-gray-600 text-sm font-semibold"
                        htmlFor="password_confirmation"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="w-full rounded-lg border-none focus:outline-none focus:ring-0"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                    <span className="text-xs text-red-500">
                        {errors.password_confirmation}
                    </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <button
                        className="bg-purple-600 hover:bg-purple-900 transition-all delay-75 px-4 py-2 rounded-lg text-purple-50"
                        disabled={processing}
                    >
                        Register
                    </button>
                </div>
            </form>
        </main>

        // <GuestLayout>
        //     <Head title="Register" />

        //     <form onSubmit={submit}>
        //         <div>
        //             <InputLabel htmlFor="name" value="Name" />

        //             <TextInput
        //                 id="name"
        //                 name="name"
        //                 value={data.name}
        //                 className="mt-1 block w-full"
        //                 autoComplete="name"
        //                 isFocused={true}
        //                 onChange={(e) => setData('name', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.name} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="email" value="Email" />

        //             <TextInput
        //                 id="email"
        //                 type="email"
        //                 name="email"
        //                 value={data.email}
        //                 className="mt-1 block w-full"
        //                 autoComplete="username"
        //                 onChange={(e) => setData('email', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.email} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="password" value="Password" />

        //             <TextInput
        //                 id="password"
        //                 type="password"
        //                 name="password"
        //                 value={data.password}
        //                 className="mt-1 block w-full"
        //                 autoComplete="new-password"
        //                 onChange={(e) => setData('password', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.password} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

        //             <TextInput
        //                 id="password_confirmation"
        //                 type="password"
        //                 name="password_confirmation"
        //                 value={data.password_confirmation}
        //                 className="mt-1 block w-full"
        //                 autoComplete="new-password"
        //                 onChange={(e) => setData('password_confirmation', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.password_confirmation} className="mt-2" />
        //         </div>

        //         <div className="flex items-center justify-end mt-4">
        //             <Link
        //                 href={route('login')}
        //                 className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //             >
        //                 Already registered?
        //             </Link>

        //             <PrimaryButton className="ms-4" disabled={processing}>
        //                 Register
        //             </PrimaryButton>
        //         </div>
        //     </form>
        // </GuestLayout>
    );
}
