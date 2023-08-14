/*
 * Vencord WebInstaller, a web frontend for the Vencord Installer
 * Copyright (c) 2023 Vendicated, Justice Almanzar, and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { writable } from "svelte/store";

const shiggyPointsKey = "shiggyPoints";

function getStoredPoints() {
    try {
        return BigInt(localStorage.getItem(shiggyPointsKey) ?? "0");
    } catch {
        return 0n;
    }
}

export const pointStore = writable(getStoredPoints());
export const addPoints = (amount: number | bigint) => {
    const incr = typeof amount === "bigint" ? amount : BigInt(amount);
    pointStore.update(points => points + incr);
    shiggy();
};

export const shiggingStore = writable(false);
let shiggyTimeout: number | null = null;
export const shiggy = () => {
    if (shiggyTimeout) clearTimeout(shiggyTimeout);
    shiggingStore.set(true);
    shiggyTimeout = setTimeout(() => {
        shiggyTimeout = null;
        shiggingStore.set(false);
    }, 200);
};

pointStore.subscribe(points => {
    localStorage.setItem(shiggyPointsKey, points.toString());
});
