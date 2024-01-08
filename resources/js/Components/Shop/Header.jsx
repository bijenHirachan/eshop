import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineEventNote, MdOutlineShoppingBag } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { CiLogin, CiLogout } from "react-icons/ci";
import logo from "../../images/shopper.png";

const Header = ({ user, items }) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className="relative  w-full flex shadow-3xl justify-between items-center bg-purple-400 text-purple-50 px-4 sm:px-16 xl:px-48 py-6">
            <div
                className={`${
                    openMenu ? "opacity-1" : "opacity-0"
                } transition-opacity duration-700 delay-75 w-32 z-20 absolute bg-white  rounded-xl shadow-md top-[84px] right-4 sm:right-16 xl:right-48`}
            >
                {openMenu && (
                    <div className="flex gap-1 flex-col items-end px-4 py-2 ">
                        {user?.is_admin == 1 && (
                            <Link
                                href="/dashboard"
                                className="transition-all flex items-center gap-2 hover:text-purple-600 hover:underline tracking-wide  delay-75 text-gray-600 text-sm font-semibold"
                            >
                                Dashboard <RiDashboardLine size={14} />
                            </Link>
                        )}

                        <Link
                            href="/products"
                            className={`${
                                route().current("shop-products")
                                    ? "text-purple-500 cursor-default"
                                    : "hover:text-purple-600 hover:underline"
                            } transition-all flex items-center gap-2  tracking-wide leading-5 text-gray-600 delay-75 text-sm font-semibold`}
                        >
                            Products <MdOutlineShoppingBag size={14} />
                        </Link>

                        {user ? (
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="transition-all flex items-center gap-2 hover:text-purple-600 hover:underline tracking-wide  delay-75 text-gray-600 text-sm font-semibold"
                            >
                                Logout <CiLogout size={14} strokeWidth={1} />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="transition-all flex items-center gap-2 hover:text-purple-600 hover:underline tracking-wide  delay-75 text-gray-600 text-sm font-semibold"
                                >
                                    Login <CiLogin size={14} strokeWidth={1} />
                                </Link>
                                <Link
                                    href="/register"
                                    className="transition-all flex items-center gap-2 hover:text-purple-600 hover:underline tracking-wide  delay-75 text-gray-600 text-sm font-semibold"
                                >
                                    Sign Up <MdOutlineEventNote size={14} />
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>

            <Link href="/">
                <img src={logo} className="h-24" />
            </Link>

            <div className="flex gap-4 items-center">
                {user && (
                    <h2 className="text-sm text-white font-semibold  mr-5">
                        Hi, {user?.name}
                    </h2>
                )}
                <Link
                    href="/cart"
                    className={`${
                        route().current("shop-cart")
                            ? "text-purple-600 cursor-default"
                            : "hover:text-purple-600"
                    } transition-all delay-75 relative`}
                >
                    {items > 0 && (
                        <span className="bg-red-500 z-20 absolute  bottom-[-20px] right-[-8px] text-white hover:text-white  font-semibold rounded-full h-4 w-4 text-[9px] flex items-center justify-center">
                            {items}
                        </span>
                    )}

                    <AiOutlineShoppingCart
                        size={22}
                        strokeWidth={2}
                        className="z-30 absolute top-[-11px] right-0"
                    />
                </Link>
                {!openMenu ? (
                    <RxHamburgerMenu
                        onClick={() => setOpenMenu(true)}
                        size={22}
                        strokeWidth={0.2}
                        className="cursor-pointer hover:text-purple-600 transition-all delay-75"
                    />
                ) : (
                    <IoClose
                        onClick={() => setOpenMenu(false)}
                        size={22}
                        strokeWidth={2}
                        className="cursor-pointer hover:text-purple-600 transition-all delay-75"
                    />
                )}
            </div>
        </div>
    );
};

export default Header;
