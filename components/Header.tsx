import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
    return (
        <>
            <nav className="wrapper flex-between inset-x-0 z-30 h-24">
                <div className="text-4xl font-bold text-primary sm:text-5xl">
                    <Link href="/">GE-Z</Link>
                </div>

                {/* <div className="flex h-12 w-12 place-content-center items-center rounded-full border-2 border-primary border-opacity-40 text-2xl shadow-xl md:h-16 md:w-16 md:text-3xl">
                    <FaUser />
                </div> */}
            </nav>
        </>
    );
};

export default Header;
