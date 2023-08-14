<!--
  Vencord Web Installer, a cross-platform gui/cli for injecting Vencord
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import Main from "./components/installer/Main.svelte";
</script>

<main>
    <h2>Vencord Installer</h2>
    <Main />
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
    h2 {
        color: var(--accent-purple);
    }
</style>
