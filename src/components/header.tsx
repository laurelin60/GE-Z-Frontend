import Link from "next/link";

export function Header() {
    return (
        <nav className="wrapper flex-between inset-x-0 z-30 h-24">
            <div className="text-4xl font-bold text-primary sm:text-5xl">
                <Link href="/">GE-Z</Link>
            </div>
        </nav>
    );
}
