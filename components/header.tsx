import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
    return (
        <>
            <div className="flex h-24 place-content-center items-center justify-between px-8 md:px-24">
                <div className="text-4xl font-bold text-primary">Degree-EZ</div>

                <div className="flex h-12 w-12 place-content-center items-center rounded-full border-2 border-primary border-opacity-40 text-2xl shadow-xl md:h-16 md:w-16 md:text-3xl">
                    <FaUser />
                </div>
            </div>
        </>
    );
};

export default Header;
