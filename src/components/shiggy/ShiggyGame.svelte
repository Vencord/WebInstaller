<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import { addPoints, pointStore } from "./shiggy";

    $: points = $pointStore;

    let shigging = false;

    function shig() {
        addPoints(1);
        shigging = true;
        queueUnshiggy(200);
    }

    let shiggyTimeout: number | null = null;
    function queueUnshiggy(timeoutMs: number) {
        if (shiggyTimeout) clearTimeout(shiggyTimeout);
        shiggyTimeout = setTimeout(() => {
            shiggyTimeout = null;
            shigging = false;
        }, timeoutMs);
    }
</script>

<main>
    <p class="points overline lg">{points} shiggies</p>
    <button on:click={shig}>
        <img
            class="shiggy"
            src="https://media.discordapp.net/stickers/1039992459209490513.png?passthrough={shigging}"
            alt="shiggy"
        />
    </button>
    <div class="spacer" />
    {#if points >= 100}
        <button class="shop">Open shop?</button>
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
    }
    .spacer {
        flex: 1;
    }
    .shiggy {
        width: 8em;
        height: 8em;
        cursor: pointer;
        user-select: none;
    }

    .shop {
        color: var(--accent-green);
        text-decoration: underline;
        cursor: pointer;
    }
</style>
