import { createContext } from "svelte";

interface UserContext {
    id: string;
    name: string;
}

export const [getUserContext, setUserContext] = createContext<UserContext>();
