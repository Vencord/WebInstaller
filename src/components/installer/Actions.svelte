<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    import { sendMessage } from "../../webSocket";
    import { Op } from "../../webSocket/types";
    import { openWindow } from "../../windows";
    import Button from "../Button.svelte";
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
    <Button disabled={busy} --accent="var(--accent-green)" on:click={() => doAction(Op.Patch)}>Install</Button>
    <Button disabled={busy} --accent="var(--accent-blue)" on:click={() => doAction(Op.Repair)}>Repair</Button>
    <Button disabled={busy} --accent="var(--accent-red)" on:click={() => doAction(Op.Unpatch)}>Uninstall</Button>
    {#if isOpenAsar}
        <Button disabled={busy} class="openasar" on:click={() => doAction(Op.UninstallOpenAsar)}>
            Uninstall OpenAsar
        </Button>
    {:else}
        <Button disabled={busy} class="openasar" on:click={() => doAction(Op.InstallOpenAsar)}>Install OpenAsar</Button>
    {/if}
</section>

<style>
    section {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1rem;
        width: 100%;
    }

    section :global(.openasar) {
        background-color: var(--bg-3);
        border: 1px solid var(--fg-0);
        color: var(--fg-1);
    }
</style>
