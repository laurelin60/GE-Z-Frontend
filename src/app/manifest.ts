import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "GE-Z",
        short_name: "GE-Z",
        icons: [
            {
                src: "icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "icons/icon-256x256.png",
                sizes: "256x256",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "icons/icon-384x384.png",
                sizes: "384x384",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "icons/icon-1024x1024.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
        ],
    };
}
