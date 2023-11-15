import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                text: "#000000",
                background: "#FFFFFF",
                bg_secondary: "#E9E9E9",
                gray: "#00000060",
                primary: "#684BFF",
                // secondary: "#c7c3da",
                // accent: "#595181",
            },
        },
    },
    plugins: [],
};
export default config;
