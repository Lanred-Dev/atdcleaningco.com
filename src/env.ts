import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
    DATABASE_URL: { description: "The database connection string." },
    ORIGIN: {
        description: "The app origin (base URL), e.g. `http://localhost:5173`.",
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
    ADMIN_EMAIL: {
        description: "The email address of the initial admin user for the server.",
    },
    ADMIN_PASSWORD: {
        description: "The password for the initial admin user for the server.",
    },
    ADMIN_NAME: {
        description: "The name of the initial admin user for the server.",
    },
    SHA256_ENCRYPTION_TOKEN: {
        description: "The token used to verify authenticity for session token."
    }
});
