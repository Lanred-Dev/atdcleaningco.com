import { setContext, getContext } from "svelte";

interface HorizontalSnappingListContext {
    nextItem: () => void;
    previousItem: () => void;
    registerItem: (item: HTMLElement) => number;
    pauseAutoScroll: () => void;
    resumeAutoScroll: () => void;
    currentItemIndex: number;
    itemCount: number;
}

const horizontalSnappingListContextKey: symbol = Symbol("horizontalSnappingListContextKey");

export function setHorizontalSnappingListContext(context: HorizontalSnappingListContext) {
    return setContext(horizontalSnappingListContextKey, context);
}

export function getHorizontalSnappingListContext() {
    return getContext<ReturnType<typeof setHorizontalSnappingListContext>>(
        horizontalSnappingListContextKey
    );
}
