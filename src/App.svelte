<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import VencordIcon from "./components/icons/VencordIcon.svelte";
    import Installer from "./components/installer/Installer.svelte";
    import { openWindow, windowStore } from "./windows";
    import Window from "./windows/Window.svelte";

    $: windows = Object.values($windowStore);

    openWindow(
        Installer,
        {},
        {
            title: "Vencord Installer",
            id: "installer",
            icon: VencordIcon,
            width: 1000,
            height: 720,
            minWidth: 1000,
            minHeight: 720,
            maximized: true,
            showActions: false
        }
    );
</script>

{#each windows as window (window.props.id)}
    <Window {...window.props}>
        <svelte:component this={window.content} {...window.contentProps} />
    </Window>
{/each}
