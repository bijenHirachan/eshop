import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <main className="h-screen px-8 flex flex-col justify-center items-center w-full overflow-x-hidden overflow-y-auto bg-purple-200">
            <Head title="Forgot Password" />

            <div className="w-full sm:w-1/2 md:w-2/5  mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="w-full sm:w-1/2 md:w-2/5 ">
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="w-full rounded-lg border-none focus:outline-none focus:ring-0"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <span className="text-xs text-red-500">{errors.email}</span>

                <div className="flex items-center justify-end mt-4">
                    <button
                        className="bg-purple-600 hover:bg-purple-900 transition-all delay-75 px-4 py-2 rounded-lg text-purple-50"
                        disabled={processing}
                    >
                        Email Password Reset Link
                    </button>
                </div>
            </form>
        </main>

        // <GuestLayout>
        //     <Head title="Forgot Password" />

        //     <div className="mb-4 text-sm text-gray-600">
        //         Forgot your password? No problem. Just let us know your email address and we will email you a password
        //         reset link that will allow you to choose a new one.
        //     </div>

        //     {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

        //     <form onSubmit={submit}>
        //         <TextInput
        //             id="email"
        //             type="email"
        //             name="email"
        //             value={data.email}
        //             className="mt-1 block w-full"
        //             isFocused={true}
        //             onChange={(e) => setData('email', e.target.value)}
        //         />

        //         <InputError message={errors.email} className="mt-2" />

        //         <div className="flex items-center justify-end mt-4">
        //             <PrimaryButton className="ms-4" disabled={processing}>
        //                 Email Password Reset Link
        //             </PrimaryButton>
        //         </div>
        //     </form>
        // </GuestLayout>
    );
}
