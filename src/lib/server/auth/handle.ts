import type { Handle } from "@sveltejs/kit/hooks";
import { validateSessionToken } from "./session";
import { getUserById } from "./users";

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get("session");

    if (token) {
        const session = validateSessionToken(token, event.cookies);

        if (session) {
            event.locals.session = session;
            event.locals.user = getUserById(session.user);
        }
    }

    return resolve(event);
};
