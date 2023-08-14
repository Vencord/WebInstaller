<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import Main from "./components/installer/Main.svelte";
    import { readyStore } from "./webSocket";

    $: ready = $readyStore;
</script>

<main>
    <h1>Vencord Installer</h1>

    {#if ready}
        <Main />
    {:else}
        <p>no connection</p>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    h1 {
        color: var(--accent-purple);
    }
</style>
