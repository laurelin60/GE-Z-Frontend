import Link from "next/link";

export function Header() {
    return (
        <header className="h-18 box-border bg-background px-32 py-4 leading-none shadow">
            <Link href="/">
                <div className="text-4xl font-bold text-primary">GE-Z</div>
            </Link>
        </header>
    );
}
