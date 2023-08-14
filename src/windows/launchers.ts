/*
 * Vencord WebInstaller, a web frontend for the Vencord Installer
 * Copyright (c) 2023 Vendicated, Justice Almanzar, and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import type { SvelteComponent } from "svelte";
import type { Constructor } from "type-fest";

import ShiggyIcon from "../components/icons/ShiggyIcon.svelte";
import VencordIcon from "../components/icons/VencordIcon.svelte";
import Installer from "../components/installer/Installer.svelte";
import ShiggyGame from "../components/shiggy/ShiggyGame.svelte";
import { openWindow } from ".";

export type Launcher = {
    name: string;
    icon: Constructor<SvelteComponent>;
    onClick: () => void;
};

export const launchers: Launcher[] = [
    {
        name: "Vencord Installer",
        icon: VencordIcon,
        onClick: () => {
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
                    maximized: true
                }
            );
        }
    },
    {
        name: "Shiggy Clicker",
        icon: ShiggyIcon,
        onClick: () => {
            openWindow(
                ShiggyGame,
                {},
                {
                    title: "Shiggy Clicker",
                    icon: ShiggyIcon,
                    width: 1000,
                    height: 720,
                    minWidth: 1000,
                    minHeight: 720
                }
            );
        }
    }
];
