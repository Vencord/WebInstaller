<!--
  Vencord Web Installer, a cross-platform gui/cli for injecting Vencord
  Copyright (c) 2023 Vendicated, Justice Almanzar and Vencord contributors
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<div class="buttons">
    <button class="btn label md install">Install</button>
    <button class="btn label md update">Update</button>
    <button class="btn label md uninstall">Uninstall</button>
    <button class="btn label md openasar">Install OpenAsar</button>
</div>

<style>
    .buttons {
        display: flex;
        gap: 1rem;
        width: 100%;
    }
    .buttons .btn {
        flex: 1;
    }
    .btn {
        text-align: center;
        box-sizing: border-box;
        padding: 0.75rem 1rem;
        border-radius: 0.75rem;
        background-color: var(--fg-1);
        color: var(--bg-current-word);
        cursor: pointer;
    }
    .btn.install {
        background-color: var(--accent-green);
    }
    .btn.update {
        background-color: var(--accent-blue);
    }
    .btn.uninstall {
        background-color: var(--accent-red);
    }
    .btn.openasar {
        background-color: var(--bg-3);
        border: 1px solid var(--fg-0);
        color: var(--fg-1);
    }
</style>
