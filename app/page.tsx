import Hero from "@/components/hero/hero";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-[calc(100vh-96px)] place-content-center">
            <Hero />
        </main>
    );
}
