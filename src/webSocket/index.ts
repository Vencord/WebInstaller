/*
 * Vencord WebInstaller, a web frontend for the Vencord Installer
 * Copyright (c) 2023 Vendicated, Justice Almanzar, and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { writable } from "svelte/store";

import type { ErrorPayload, Payload } from "./types";
import { Op } from "./types";

let nonceCounter = 0;

export const messageStream = writable<Payload>();
export const readyStore = writable(false);

const WS_URL = "ws://localhost:18281/launch";
let ws: WebSocket;

createWS();

function createWS() {
    ws = new WebSocket(WS_URL);

    ws.addEventListener("message", e => {
        console.log("[WS] Receive", e.data);
        messageStream.set(JSON.parse(e.data));
    });

    ws.addEventListener("open", () => {
        console.log("[WS] Opened");
        readyStore.set(true);
    });
    ws.addEventListener("error", () => console.log("[WS] Error"));
    ws.addEventListener("close", () => {
        console.log("[WS] Closed");
        readyStore.set(false);
    });
}

export function sendMessage<T = any>(op: Op, data?: any) {
    const nonce = String(nonceCounter++);

    return new Promise<T>((resolve, reject) => {
        const unsubscribe = messageStream.subscribe(msg => {
            if (msg?.nonce === nonce) {
                unsubscribe();

                if (msg.op === Op.Error) reject((msg as ErrorPayload).message);
                else resolve(msg.data as T);
            }
        });

        ws.send(JSON.stringify({ nonce, op, data }));
    });
}

export function reconnect() {
    ws.close();
    createWS();
}
