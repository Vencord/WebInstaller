<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import { sendMessage } from "../../webSocket";
    import { type DiscordInstall, Op } from "../../webSocket/types";
    import PatchSelect from "../input/PatchSelect.svelte";
    import Tag from "../text/Tag.svelte";
    import Actions from "./Actions.svelte";

    const userDataDir = "%APPDATA%\\Vencord";

    const branches = ["stable", "canary", "ptb", "development"];
    let installPromise: Promise<DiscordInstall[]>;

    function fetchInstalls() {
        const promise = sendMessage<DiscordInstall[]>(Op.ListInstalls).then(installs => {
            return installs.sort((a, b) => branches.indexOf(a.branch) - branches.indexOf(b.branch));
        });
        if (!installPromise) installPromise = promise;
        else promise.then(installs => (installPromise = Promise.resolve(installs)));
    }
    fetchInstalls();

    let selectedInstall = "";

    const currentVersion = "v1.2.6";
    const latestVersion = "v1.2.7";
</script>

<section>
    <div>
        <p>
            Files will be downloaded to <Tag>{userDataDir}</Tag>
        </p>
        <p>
            To customize this location, set the environment variable <Tag>VENCORD_USER_DATA_DIR</Tag> and restart the daemon
        </p>
        <hr />
        <div class="installer">
            <div class="version">
                <p class="overline sm current">Current</p>
                <Tag>{currentVersion}</Tag>
            </div>
            <div class="version">
                <p class="overline sm latest">latest</p>
                <Tag>{latestVersion}</Tag>
            </div>
        </div>
        <hr />
        {#await installPromise}
            <p>Loading installs...</p>
        {:then installs}
            <PatchSelect options={installs} bind:selected={selectedInstall} />
        {:catch error}
            <p>Failed to load installs: {String(error)}</p>
        {/await}
    </div>

    <Actions path={selectedInstall} onAction={fetchInstalls} />
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
