<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import { openWindow } from "../../windows";
    import { addPoints, pointStore, shiggingStore } from "./shiggy";
    import Shop from "./Shop.svelte";

    $: points = $pointStore;
    $: shigging = $shiggingStore;

    function shig() {
        addPoints(1);
    }

    function openShop() {
        openWindow(
            Shop,
            {},
            {
                title: "Shiggy Shop",
                width: 400,
                height: 600
            }
        );
    }

    $: shiggyUrl = `https://media.discordapp.net/stickers/1039992459209490513.png?passthrough=${shigging}`;
</script>

<main>
    <p class="points overline lg">{points} shiggies</p>
    <button class="shig" on:click={shig} style="background-image:url({shiggyUrl})" />
    <div class="spacer" />
    {#if points >= 100}
        <button class="shop" on:click={openShop}>Open shop?</button>
    {/if}
</main>

<style>
    main {
        padding: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2em;
        height: 100%;
        box-sizing: border-box;
        user-select: none;
    }
    .spacer {
        flex: 1;
    }
    .shig {
        width: 8em;
        height: 8em;
        cursor: pointer;
        background-size: contain;
    }

    .shop {
        color: var(--accent-green);
        text-decoration: underline;
        cursor: pointer;
    }
</style>
