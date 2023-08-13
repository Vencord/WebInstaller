/*
 * SPDX-License-Identifier: GPL-3.0
 * Vinstaller, a cross platform gui/cli app for installing Vencord
 * Copyright (c) 2023 Vendicated, Justice Almanzar, and Vencord contributors
 */

import "./app.css";

import App from "./App.svelte";

const app = new App({
    target: document.getElementById("app")!
});

export default app;
