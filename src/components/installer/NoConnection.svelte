<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import { reconnect } from "../../webSocket";
    import Button from "../Button.svelte";
    import LinkButton from "../LinkButton.svelte";
    import Heading from "../text/Heading.svelte";

    const p = (navigator as { platform: string }).platform.toLowerCase();

    const Platforms = [
        {
            name: "Windows",
            url: "https://meow.vendicated.dev/vencordd.exe",
            predicate: p.startsWith("win")
        },
        {
            name: "macOS",
            url: "",
            predicate: p.startsWith("mac")
        },
        {
            name: "Linux",
            url: "",
            predicate: p.startsWith("linux")
        }
    ];

    const platform = Platforms.find(p => p.predicate);
</script>

<section>
    <Heading tag="h6">Welcome to the Vencord installer!</Heading>

    {#if platform}
        <p>To get started, download and run the install helper</p>
        <p>Then, click "Connect"</p>
        <div>
            <LinkButton href={platform.url}>Download for {platform.name}</LinkButton>
            <Button on:click={reconnect}>Connect</Button>
        </div>
    {:else}
        <p>It doesn't seem like you're on a supported platform.</p>
    {/if}
</section>
