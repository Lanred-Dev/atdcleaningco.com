import { setContext, getContext } from "svelte";

interface DialogContext {
    isOpen: boolean;
}

const dialogContextKey: symbol = Symbol("dialogContextKey");

export function setDialogContext(context: DialogContext) {
    return setContext(dialogContextKey, context);
}

export function getDialogContext() {
    return getContext<ReturnType<typeof setDialogContext>>(dialogContextKey);
}
