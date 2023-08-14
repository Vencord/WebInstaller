/*
 * Vencord WebInstaller, a web frontend for the Vencord Installer
 * Copyright (c) 2023 Vendicated, Justice Almanzar, and Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

export const enum Op {
    Error = "ERROR",
    Ok = "OK",
    ListInstalls = "LIST_INSTALLS",
    ChooseCustomInstall = "CHOOSE_CUSTOM_INSTALL",
    Patch = "PATCH",
    Unpatch = "UNPATCH",
    Repair = "REPAIR",
    InstallOpenAsar = "INSTALL_OPENASAR",
    UninstallOpenAsar = "UNINSTALL_OPENASAR"
}

export interface Payload {
    nonce: string;
    op: Op;
    data?: any;
}

export interface DiscordInstall {
    path: string;
    branch: string;
    isPatched: boolean;
    isOpenAsar: boolean;
}

export interface ErrorPayload {
    nonce: string;
    op: Op.Error;
    message: string;
}
