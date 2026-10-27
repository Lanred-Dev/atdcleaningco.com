import { createContext } from "svelte";

interface ViewportContext {
    isNavigating: boolean;
}

export const [getViewportContext, setViewportContext] = createContext<ViewportContext>();
