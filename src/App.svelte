<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import { windowStore } from "./windows";
    import Launcher from "./windows/Launcher.svelte";
    import { launchers } from "./windows/launchers";
    import Window from "./windows/Window.svelte";

    $: windows = Object.values($windowStore);

    const autolaunch = +(localStorage.getItem("autolaunch") || "0") || 0;
    (launchers[autolaunch] ?? launchers[0]).onClick();
</script>

<div class="launchers">
    {#each launchers as launcher}
        <Launcher {launcher} />
    {/each}
</div>

{#each windows as window (window.props.id)}
    <Window {...window.props}>
        <svelte:component this={window.content} {...window.contentProps} />
    </Window>
{/each}

<style>
    .launchers {
        padding: 1em;
    }
</style>
