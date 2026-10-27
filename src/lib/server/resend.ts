import { Resend } from "resend";
import { RESEND_API_KEY } from "$app/env/private";
import { Renderer } from "@better-svelte-email/server";
import layoutStyles from "../../routes/layout.css?raw";

export const { render: emailRenderer } = new Renderer({ customCSS: layoutStyles });
export const resend = new Resend(RESEND_API_KEY);
