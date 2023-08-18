<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import LinkButton from "../LinkButton.svelte";
    import Heading from "../text/Heading.svelte";
</script>

<section role="dialog">
    <Heading tag="h6" --color="var(--accent-red)">It seems you are using Brave</Heading>
    <p>Brave users need to disable Brave Shields, because it blocks the connection to the installer helper.</p>
    <br />
    <LinkButton
        href="https://support.brave.com/hc/en-us/articles/360022806212-How-do-I-use-Shields-while-using-the-Tor-network-"
        target="_blank"
        rel="noopener noreferrer">How to disable Brave Shields</LinkButton
    >
</section>

<style>
    section {
        padding: 2em;
        text-align: center;
    }
</style>
