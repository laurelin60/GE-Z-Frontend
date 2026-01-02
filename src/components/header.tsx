import Link from "next/link";

export function Header() {
    return (
        <header className="bg-background box-border h-fit px-16 py-4 leading-none shadow-sm">
            <Link href="/">
                <div className="text-mono text-primary text-4xl font-bold">
                    GE-Z
                </div>
            </Link>
        </header>
    );
}
