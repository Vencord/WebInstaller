<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import { readyStore } from "../../webSocket";
    import { openWindow } from "../../windows";
    import Heading from "../text/Heading.svelte";
    import BraveModal from "./BraveModal.svelte";
    import Main from "./Main.svelte";
    import NoConnection from "./NoConnection.svelte";

    $: ready = $readyStore;

    function onLoad() {
        // @ts-ignore - brave is not defined in types
        if (navigator?.brave !== undefined) {
            // brave shields are enabled
            openWindow(
                BraveModal,
                {},
                {
                    title: "Brave skill issue",
                    width: 400,
                    height: 215,
                    maximizable: false
                }
            );
        }
    }
</script>

<main>
    <Heading tag="h2" --color="var(--accent-purple)">Vencord Installer</Heading>

    {#if ready}
        <Main />
    {:else}
        <NoConnection />
    {/if}
</main>

<svelte:window on:load={onLoad} />

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
</style>
