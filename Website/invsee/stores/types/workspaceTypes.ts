import type { Item as ItemType, Mod as ModType } from "@prisma/client";

interface WorkspaceActions {
    setWorkspace: (data: any) => void;
    setWorkspaces: (data: any) => void;
    addWorkspace: (data: any) => void;
}

interface ItemWorkspaceProps {
    itemName: string;
    itemTag: string;
    itemImage: string;
    gallery: string[];
    itemDescription: string;
    materialValue: number;
    wikiElements: WikiElement[];
    modTag: string;
}

enum WorkspaceType {
    Item = "Item",
    Mod = "Mod",
    Wiki = "Wiki",
}

interface WikiElement {
    title: string;
    content: string;
    image: string;
    links?: string[];
}

interface ModWorkspace {

}


interface Workspaces {
    workspaces: Workspace[];
    workspace: Workspace;
    workspaceIsSelected: boolean;
}

interface Workspace {
    workspace: ItemWorkspaceProps;
    name?: string;
    type: WorkspaceType;
    page: 1 | 2 | 3
}

export type { WorkspaceActions, Workspace, Workspaces }



