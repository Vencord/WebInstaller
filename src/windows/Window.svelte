<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import { SvelteComponent } from "svelte";
    import { CircleIcon, MaximizeIcon, MinimizeIcon, XIcon } from "svelte-feather-icons";
    import type { Constructor } from "type-fest";

    import { closeWindow } from ".";

    export let title: string;
    export let id: string;
    export let icon: Constructor<SvelteComponent> | null = null;

    export let backgroundColor = "var(--bg-1)";

    export let width: number;
    export let height: number;
    export let minWidth: number | null = null;
    export let minHeight: number | null = null;

    export let showActions = true;
    export let maximized = false;
    export let minimized = false;
    export let maximizable = true;
    export let minimizable = true;
    export let closable = true;

    function close() {
        closeWindow(id);
    }
    function maximize() {
        maximized = !maximized;
    }
    function minimize() {
        minimized = !minimized;
    }

    // Dragging
    let dragAnchor: [number, number] | null = null;
    let x = Math.floor((window.innerWidth - width) / 2);
    let y = Math.floor((window.innerHeight - height) / 2);
    function onDragStart(event: MouseEvent) {
        dragAnchor = [event.screenX - x, event.screenY - y];
    }
    function onDrag(event: MouseEvent) {
        if (!dragAnchor || (!event.screenX && !event.screenY)) return;
        const [anchorX, anchorY] = dragAnchor;
        x = event.screenX - anchorX;
        y = event.screenY - anchorY;
    }
    function onDragEnd(event: MouseEvent) {
        if (dragAnchor) {
            const [anchorX, anchorY] = dragAnchor;
            x = event.screenX - anchorX;
            y = event.screenY - anchorY;
        }
        dragAnchor = null;
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
        }
        if (minHeight) styleProps["min-height"] = `${minHeight}px`;
        if (minWidth) styleProps["min-width"] = `${minWidth}px`;
        style = Object.entries(styleProps)
            .map(([key, value]) => `${key}:${value}`)
            .join(";");
    }
</script>

<svelte:window on:mousemove={onDrag} on:mouseup={onDragEnd} />

<div class="frame" class:maximized {style}>
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
        <div class="buttons" class:show={showActions} on:mousedown={event => event.stopPropagation()}>
            {#if minimizable}
                <button on:click={minimize} title="Minimize"><MinimizeIcon size="1.1x" strokeWidth={3} /></button>
            {/if}
            {#if maximizable}
                <button on:click={maximize} title="Maximize"><MaximizeIcon size="1.1x" strokeWidth={3} /></button>
            {/if}
            {#if closable}
                <button on:click={close} title="Close" class="close"><XIcon size="1.5x" /></button>
            {/if}
        </div>
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
        /* FIXME: resizing resets after dragged */
        resize: both;
        overflow: hidden;
        outline: 1px solid var(--bg-3);
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
        background: var(--bg-0);
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
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        height: 100%;
    }
    .buttons.show {
        opacity: 1;
    }
    .buttons button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 2.5rem;
    }
    .buttons button:hover {
        background-color: var(--bg-3);
    }
    .buttons button.close:hover {
        background-color: var(--bg-accent-red);
        color: var(--bg-0);
    }
    .titlebar:hover .buttons {
        opacity: 1;
    }

    .content {
        flex: 1;
    }
</style>