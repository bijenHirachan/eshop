import { Link } from "@inertiajs/react";

export default function NavLink({ active = false, children, ...props }) {
    return (
        <Link
            {...props}
            className={
                "inline-flex gap-2 items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? " text-purple-600 font-semibold"
                    : " text-purple-50  hover:text-purple-600")
            }
        >
            {children}
        </Link>
    );
}
