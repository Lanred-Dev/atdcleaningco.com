import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
    DATABASE_URL: { description: "The database connection string." },
    ORIGIN: {
        description: "The app origin (base URL), e.g. `http://localhost:5173`.",
    },
    BETTER_AUTH_SECRET: {
        description:
            "Secret used to sign tokens. For production use 32 characters generated with high entropy. See [Better Auth installation](https://www.better-auth.com/docs/installation).",
    },
    RESEND_API_KEY: {
        description: "The API key for Resend, used for sending emails.",
    },
    MAPBOX_ACCESS_TOKEN: {
        public: true,
        description: "The public access token for Mapbox, used for map rendering.",
    },
    INQUIRIES_EMAIL_SENDER: {
        description: "The email address used as the sender for contact inquiries.",
    },
});
