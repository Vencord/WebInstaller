<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import PatchSelect from "../input/PatchSelect.svelte";
    import Actions from "./Actions.svelte";

    const userDataDir = "%APPDATA%\\Vencord";

    let selectedPatch = "canary";
    const patchOptions = [
        {
            value: "canary",
            label: "%APPDATA%\\Local\\DiscordCanary",
            tag: "canary"
        },
        {
            patched: true,
            value: "stable",
            label: "%APPDATA%\\Local\\Discord",
            tag: "stable"
        }
    ];

    const currentVersion = "v1.2.6";
    const latestVersion = "v1.2.7";
</script>

<section>
    <div>
        <p>
            Files will be downloaded to <code class="overline sm">{userDataDir}</code>
        </p>
        <p>
            To customize this location, set the environment variable <code class="overline sm"
                >VENCORD_USER_DATA_DIR</code
            > and restart me
        </p>
        <hr />
        <div class="installer">
            <div class="version">
                <p class="overline sm current">Current</p>
                <code>{currentVersion}</code>
            </div>
            <div class="version">
                <p class="overline sm latest">latest</p>
                <code>{latestVersion}</code>
            </div>
        </div>
        <hr />
        <PatchSelect options={patchOptions} bind:selected={selectedPatch} />
    </div>

    <Actions />
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .installer {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
    }
    .version {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.1rem;
    }
    .current {
        color: var(--accent-purple);
    }
    .latest {
        color: var(--accent-green);
    }
</style>
