import React from "react";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="relative mx-auto w-[100%] flex-row place-content-center p-5 text-center">
            <div className="flex flex-col">
                <div className="text-xl">Made with 💖</div>
                <div className="text-sm">
                    Copyright &copy; 2023 | All Rights Reserved
                </div>
            </div>
            <div className="absolute right-24 top-[26px] items-center text-4xl ">
                <div className="flex items-center">
                    <FaGithub />
                </div>
            </div>
        </div>
    );
};

export default Footer;
