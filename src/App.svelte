<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import VencordIcon from "./components/icons/VencordIcon.svelte";
    import { windowStore } from "./windows";
    import Launcher from "./windows/Launcher.svelte";
    import { launchers } from "./windows/launchers";
    import Window from "./windows/Window.svelte";

    $: windows = Object.values($windowStore);

    const autolaunch = +(localStorage.getItem("autolaunch") || "0") || 0;
    (launchers[autolaunch] ?? launchers[0]).onClick();
</script>

<div>
    <div class="pwa-titlebar">
        <div class="icon">
            <VencordIcon />
        </div>
        <div class="title body sm">Vencord Desktop Environment</div>
    </div>
    <div class="launchers">
        {#each launchers as launcher}
            <Launcher {launcher} />
        {/each}
    </div>
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

    .pwa-titlebar {
        display: none;
    }

    @media (display-mode: window-controls-overlay) {
        .pwa-titlebar {
            display: flex;
            align-items: center;
            background: #1e2021;
            cursor: default;

            width: env(titlebar-area-width, 100vw);
            height: env(titlebar-area-height);
            left: env(titlebar-area-x, 0);
            top: env(titlebar-area-y, 0);

            -webkit-app-region: drag;
        }

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.25rem;
            height: 1.25rem;
            margin: 0 1rem;
        }
    }
</style>
