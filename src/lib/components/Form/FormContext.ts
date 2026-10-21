import { setContext, getContext } from "svelte";

interface FormContext {
    isSubmitting: boolean;
}

const formContextKey: symbol = Symbol("formContextKey");

export function setFormContext(context: FormContext) {
    return setContext(formContextKey, context);
}

export function getFormContext() {
    return getContext<ReturnType<typeof setFormContext>>(formContextKey);
}
