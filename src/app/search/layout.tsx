import { SearchContextProvider } from "@/contexts/search-context/search-context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <SearchContextProvider>{children}</SearchContextProvider>;
}
