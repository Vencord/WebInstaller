<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import { sendMessage } from "../../webSocket";
    import { Op } from "../../webSocket/types";
    import { openWindow } from "../../windows";
    import FailureModal from "./FailureModal.svelte";
    import SuccessModal from "./SuccessModal.svelte";

    export let path: string;
    export let onAction: ((action: Op) => void) | null = null;
    export let isOpenAsar: boolean = false;

    let busy = false;

    function getOpPastTense(op: Op) {
        if (op === Op.Patch) return "installed";
        if (op === Op.Repair) return "repaired";
        if (op === Op.Unpatch) return "uninstalled";
        if (op === Op.InstallOpenAsar) return "installed OpenAsar";
        if (op === Op.UninstallOpenAsar) return "uninstalled OpenAsar";
        return "did something?";
    }

    async function doAction(op: Op) {
        busy = true;
        await sendMessage(op, path)
            .then(() => {
                openWindow(
                    SuccessModal,
                    {
                        verb: getOpPastTense(op)
                    },
                    {
                        title: "Success",
                        width: 400,
                        height: 475,
                        maximizable: false
                    }
                );
            })
            .catch(error => {
                const message = typeof error === "string" ? error : null;
                if (!message) console.error(error);
                openWindow(
                    FailureModal,
                    {
                        message
                    },
                    {
                        title: "MASSIVE FAILURE !!!",
                        width: 450,
                        height: 200,
                        maximizable: false
                    }
                );
            })
            .finally(() => {
                busy = false;
                onAction?.(op);
            });
    }
</script>

<section>
    <button disabled={busy} class="label md install" on:click={() => doAction(Op.Patch)}>Install</button>
    <button disabled={busy} class="label md repair" on:click={() => doAction(Op.Repair)}>Repair</button>
    <button disabled={busy} class="label md uninstall" on:click={() => doAction(Op.Unpatch)}>Uninstall</button>
    {#if isOpenAsar}
        <button disabled={busy} class="label md openasar" on:click={() => doAction(Op.UninstallOpenAsar)}>
            Uninstall OpenAsar
        </button>
    {:else}
        <button disabled={busy} class="label md openasar" on:click={() => doAction(Op.InstallOpenAsar)}>
            Install OpenAsar
        </button>
    {/if}
</section>

<style>
    section {
        display: flex;
        gap: 1rem;
        width: 100%;
    }
    button {
        flex: 1;
        text-align: center;
        box-sizing: border-box;
        padding: 0.75rem 1rem;
        border-radius: 0.75rem;
        background-color: var(--fg-1);
        color: var(--bg-current-word);
        cursor: pointer;
    }
    button:disabled {
        opacity: 0.7;
        cursor: default;
    }

    .install {
        background-color: var(--accent-green);
    }
    .repair {
        background-color: var(--accent-blue);
    }
    .uninstall {
        background-color: var(--accent-red);
    }
    .openasar {
        background-color: var(--bg-3);
        border: 1px solid var(--fg-0);
        color: var(--fg-1);
    }
</style>
