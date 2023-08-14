<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    let points = 0;
    let shigging = false;

    function shig() {
        points++;
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
    <button class="shig label lg" on:click={shig}>SHIIIIIIG</button>
    <div class="points overline lg">{points} shiggies</div>
    <img
        class="shiggy"
        src="https://media.discordapp.net/stickers/1039992459209490513.png?passthrough={shigging}"
        alt="shiggy"
    />
</main>

<style>
    main {
        padding: 1em;
    }
    .shiggy {
        width: 8em;
        height: 8em;
        cursor: pointer;
    }
    .shig {
        background: var(--bg-3);
        padding: 0.5em 1em;
        border-radius: 0.75em;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;
        text-align: center;
    }
    .shig:hover {
        background: var(--bg-5);
    }
</style>
