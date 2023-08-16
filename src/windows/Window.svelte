<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import { cubicInOut } from "svelte/easing";
    import type { TransitionConfig } from "svelte/transition";
    import { CircleIcon, MaximizeIcon, MinimizeIcon, XIcon } from "svelte-feather-icons";
    import type { Constructor } from "type-fest";

    import { closeWindow, getFocusZIndex, setProps } from ".";

    export let title: string;
    export let id: string;
    export let icon: Constructor<SvelteComponent> | null = null;

    export let backgroundColor = "var(--bg-1)";

    export let width: number;
    export let height: number;
    export let minWidth: number | null = width;
    export let minHeight: number | null = height;

    export let maximized = false;
    export let maximizable = true;
    export let closable = true;

    function close() {
        closeWindow(id);
    }
    function toggleMaximized() {
        maximized = !maximized;
        setProps(id, { maximized });
    }

    // Dragging
    let dragAnchor: [number, number] | null = null;
    let x = Math.floor((window.innerWidth - width) / 2);
    let y = Math.floor((window.innerHeight - height) / 2);
    function onDragStart(event: MouseEvent) {
        dragAnchor = [event.x - x, event.y - y];
    }
    function onDrag(event: MouseEvent) {
        if (!dragAnchor || (!event.x && !event.y)) return;
        const [anchorX, anchorY] = dragAnchor;
        x = event.x - anchorX;
        y = event.y - anchorY;
        window.getSelection?.()?.empty?.();
    }
    function onDragEnd(event: MouseEvent) {
        if (dragAnchor) {
            const [anchorX, anchorY] = dragAnchor;
            x = event.x - anchorX;
            y = event.y - anchorY;
        }
        dragAnchor = null;
    }

    // Focusing
    let z = 0;
    function onFocus() {
        z = getFocusZIndex();
    }
    onFocus();

    // Resizing
    function resize(node: HTMLElement) {
        const observer = new ResizeObserver(entries => {
            if (maximized) return;
            ({ width, height } = entries[0].contentRect);
        });
        observer.observe(node);
        return {
            destroy() {
                observer.disconnect();
            }
        };
    }

    // Inline styles
    let style: string;
    $: {
        const styleProps: Record<string, string> = {
            "background-color": backgroundColor
        };
        if (!maximized) {
            styleProps.width = `${width}px`;
            styleProps.height = `${height}px`;
            styleProps.left = `${x}px`;
            styleProps.top = `${y}px`;
            styleProps["z-index"] = `${z}`;
        }
        if (minHeight) styleProps["min-height"] = `${minHeight}px`;
        if (minWidth) styleProps["min-width"] = `${minWidth}px`;
        style = Object.entries(styleProps)
            .map(([key, value]) => `${key}:${value}`)
            .join(";");
    }

    function transition(node: Element): TransitionConfig {
        if (maximized) return { duration: 0 };
        return {
            duration: 200,
            easing: cubicInOut,
            css: t => `transform: scale(${t / 2 + 0.5}); opacity: ${t}`
        };
    }
</script>

<svelte:window on:mousemove={onDrag} on:mouseup={onDragEnd} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="frame" class:maximized use:resize on:mousedown={onFocus} {style} in:transition out:transition>
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="titlebar" role="application" on:mousedown={onDragStart}>
        <div class="icon">
            {#if icon}
                <svelte:component this={icon} />
            {:else}
                <CircleIcon size="1x" strokeWidth={3} />
            {/if}
        </div>
        <div class="title body sm">{title}</div>
        <div class="spacer"></div>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="buttons" on:mousedown={event => event.stopPropagation()}>
            {#if maximizable}
                {#if maximized}
                    <button on:click={toggleMaximized} title="Restore">
                        <MinimizeIcon size="1.1x" strokeWidth={3} />
                    </button>
                {:else}
                    <button on:click={toggleMaximized} title="Maximize">
                        <MaximizeIcon size="1.1x" strokeWidth={3} />
                    </button>
                {/if}
            {/if}
            {#if closable}
                <button on:click={close} title="Close" class="close"><XIcon size="1.5x" /></button>
            {/if}
        </div>
        <div class="pwa-draggable"></div>
    </div>
    <div class="content">
        <slot />
    </div>
</div>

<style>
    .frame {
        display: flex;
        flex-direction: column;
        position: absolute;
        resize: both;
        overflow: hidden;
        outline: 1px solid #3c3836;
    }
    .frame:not(.maximized) {
        border-radius: 0.5rem;
        box-shadow:
            0px 2px 10.6px 0px rgba(0, 0, 0, 0.37),
            0px 16px 32px 0px rgba(0, 0, 0, 0.37);
    }
    .frame.maximized {
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        resize: none;
    }
    .frame::-webkit-resizer {
        display: none;
    }

    .titlebar {
        display: flex;
        align-items: center;
        background: #1e2021;
        color: #d4be98;
        cursor: default;
        height: 2rem;
        user-select: none;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        margin: 0 1rem;
    }

    .spacer {
        flex: 1;
    }
    .buttons {
        display: flex;
        transition: opacity 0.2s ease-in-out;
        height: 100%;
    }
    .frame.maximized .buttons {
        opacity: 0;
    }
    .buttons button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 2.5rem;
    }
    .buttons button:hover {
        background-color: #3c3836;
    }
    .buttons button.close:hover {
        background-color: #ea6962;
        color: #1e2021;
    }
    .titlebar:hover .buttons {
        opacity: 1;
    }

    .content {
        flex: 1;
    }

    .pwa-draggable {
        display: none;
    }

    /* only bother applying these if we're in PWA mode */
    @media (display-mode: window-controls-overlay) {
        .frame.maximized .titlebar,
        .frame.maximized .pwa-draggable {
            height: env(titlebar-area-height, 2rem);
            left: env(titlebar-area-x, 0);
            top: env(titlebar-area-y, 0);
        }

        .frame.maximized .titlebar {
            width: env(titlebar-area-width, 100vw);
        }

        .frame.maximized .pwa-draggable {
            display: block;
            position: absolute;
            /* 2.5rem is the width of the buttons, and there's 2, so subtract 2 buttons' worth */
            width: calc(env(titlebar-area-width, 100vw) - (2.5rem * 2));
            -webkit-app-region: drag;
        }

        .buttons {
            -webkit-app-region: no-drag;
        }
    }
</style>
