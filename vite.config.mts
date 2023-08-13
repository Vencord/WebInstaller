/*
 * SPDX-License-Identifier: GPL-3.0
 * Vinstaller, a cross platform gui/cli app for installing Vencord
 * Copyright (c) 2023 Vendicated, Justice Almanzar, and Vencord contributors
 */

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        svelte()
    ],
    publicDir: "static",
    build: {
        outDir: "dist",
        emptyOutDir: true,
        sourcemap: true,
        minify: true
    }
});
