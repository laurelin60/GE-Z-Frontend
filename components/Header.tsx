import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
    return (
        <>
            <nav className="wrapper flex-between sticky inset-x-0 top-0 z-30 h-24 backdrop-blur-lg">
                <div className="text-4xl font-bold text-primary sm:text-5xl">
                    <a href="https://ge-z.vercel.app/">GE-Z</a>
                </div>

                {/* <div className="flex h-12 w-12 place-content-center items-center rounded-full border-2 border-primary border-opacity-40 text-2xl shadow-xl md:h-16 md:w-16 md:text-3xl">
                    <FaUser />
                </div> */}
            </nav>
        </>
    );
};

export default Header;
