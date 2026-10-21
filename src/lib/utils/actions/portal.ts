/**
 * A Svelte action that moves an element to a different part of the DOM.
 */
export default function portal(node: HTMLElement, params: { target?: HTMLElement } = {}) {
    const target = params.target || document.body;
    target.appendChild(node);

    return {
        destroy() {
            node.remove();
        },
    };
}
