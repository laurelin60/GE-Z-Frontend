"use client";

import Image from "next/image";

export default function Error({ error }: { error?: string }) {
    return (
        <div className="mx-2 my-16 flex flex-col gap-2 text-center text-xl">
            <div className="flex justify-center">
                <Image
                    src="/error.png"
                    alt="error"
                    width={500}
                    height={0}
                    className="pointer-events-none flex h-fit w-[500px] justify-center"
                />
            </div>
            <div className="flex justify-center">An error occurred...</div>
            <p className="text-muted-foreground text-base">{error}</p>
        </div>
    );
}
