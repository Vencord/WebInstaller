<!--
  Vencord WebInstaller, a web frontend for the Vencord Installer
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<section>
    <button class="label md install">Install</button>
    <button class="label md repair">Repair</button>
    <button class="label md uninstall">Uninstall</button>
    <button class="label md openasar">Install OpenAsar</button>
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
