import { createContext } from "svelte";

interface HeaderContext {
    height: number;
}

export const [getHeaderContext, setHeaderContext] = createContext<HeaderContext>();
