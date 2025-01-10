// Workspace is undone work which can be posted into database
// TODO: Being able to save workspace into database without saving content of generic type
// TODO: Being able to save more than one workspace for the each generic type
// TODO:

import {ItemType, UserType} from "@/types";

type RoleState = "Admin" | "Editor" | "ModCreator" | undefined
type WorkspaceState = "creating" | "editing"

type WorkspaceStoreActionsProps = {

}

type WorkspaceStoreProps = {
    admin?: Workspace<"Admin">
    editor?: Workspace<"Editor">
    moderator?: Workspace<"ModCreator">
}

type Workspace<T extends RoleState = undefined> = T extends "Admin" ? {
    name: string
    databaseMerged: boolean
    updatedAt: string
    items: ItemTemplate[] // TODO
    mods: string[] // TODO
    modPack: string[] // TODO
    users: string[] // TODO
} : T extends "Editor" ? {
    name: string
    itemWorkspace: "test"
} : T extends "ModCreator" ? {
    name: string
    modWorkspace: "test"
} : {
    name: string
    normalWorkspace: "test"
}

type BaseWorkspace = {
    workspaceAuthorId: string
    workspaceId: string
    workspaceName: string
    workspaceDescription: string
    workspaceState: WorkspaceState
    workspaceCreatedAt: string // timestamp
}

type UserTemplate = UserType & BaseWorkspace
type ItemTemplate = ItemType & BaseWorkspace
