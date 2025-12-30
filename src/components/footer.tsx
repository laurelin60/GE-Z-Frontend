export function Footer() {
    return (
        <div className="mx-auto flex flex-col items-center justify-between p-4 text-center">
            <div className="flex flex-col">
                <div className="text-lg sm:text-xl">Made with 💖</div>
                <div className="text-xs sm:text-sm">
                    Copyright &copy; {new Date().getFullYear()} | All Rights
                    Reserved
                </div>
            </div>
        </div>
    );
}
