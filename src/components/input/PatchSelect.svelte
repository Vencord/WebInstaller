<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script lang="ts">
    type Option = {
        value: string;
        label: string;
        patched?: boolean;
        tag?: string;
    };

    export let options: Option[];
    export let selected = options[0].value;

    const id = Math.floor(Math.random() * 100);
</script>

<div role="radiogroup" class="container" aria-labelledby="label-patch" id={`group-${id}`}>
    <div class="legend" id="label-patch">
        <h6>Please select an install to patch</h6>
    </div>
    {#each options as { value, label, patched, tag }}
        <div class="row" class:selected={selected === value}>
            <div class="radio-wrap">
                <input type="radio" id={value} bind:group={selected} {value} />
                <span class="radio"><div class="check" /></span>
            </div>
            {#if patched}
                <code class="overline sm patched">PATCHED</code>
            {/if}
            <label for={value}>{label}</label>
            {#if tag}
                <code class="overline sm" class:stable={tag === "stable"} class:canary={tag === "canary"}>{tag}</code>
            {/if}
        </div>
    {/each}
</div>

<style>
    .container {
        display: flex;
        gap: 0.75rem;
        flex-direction: column;
    }

    .row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--grey-0);
    }
    .selected {
        color: var(--fg-1);
    }

    .radio-wrap {
        position: relative;
    }
    .radio {
        position: absolute;
        inset: 0;
        background-color: var(--bg-0);
        border-radius: 50%;
        pointer-events: none;
        box-sizing: border-box;
        border: 1px solid var(--bg-3);
        padding: 3px;
        display: flex;
    }
    .radio .check {
        background: var(--accent-purple);
        opacity: 0;
        height: 100%;
        width: 100%;
        border-radius: 50%;
    }

    input[type="radio"]:checked ~ .radio .check {
        opacity: 1;
    }
    h6 {
        color: var(--accent-orange);
        margin-bottom: 0.5rem;
    }
    input[type="radio"] {
        display: block;
        margin: 0;
        width: 1.25rem;
        height: 1.25rem;
        opacity: 0;
    }

    code {
        font-family: var(--font);
    }
    .patched {
        color: var(--accent-green);
    }
    .stable {
        color: var(--accent-blue);
    }
    .canary {
        color: var(--accent-yellow);
    }
</style>
