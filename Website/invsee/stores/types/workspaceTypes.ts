import type { Item as ItemType, Mod as ModType } from "@prisma/client";

interface WorkspaceActions {
  setItemWorkspaceState: (
    key: "workspaceName" | "itemName" | "itemTag" | "itemImage" | "gallery" | "itemDescription" | "materialValue" | "wikiElements" | "modTag" | "step",
    value: any
  ) => void;
  setpage: (data: number) => void;
  setErrorExplaination: (message: string, description: string) => void;
  setErrorState: (data: boolean) => void;
}

interface WorksapceErorr {
  error: boolean;
  description: string;
  message: string;
}

interface ItemWorkspaceProps {
  workspaceErorr: WorksapceErorr;
  workspaceName: string;
  itemName: string;
  itemTag: string;
  itemImage: any;
  gallery: string[];
  itemDescription: string;
  materialValue: number;
  wikiElements: WikiElement[];
  modTag: string;
  step: 1 | 2 | 3;
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

interface ModWorkspace {}

interface Workspaces {
  itemWorksapce: ItemWorkspaceProps;
  page: string;
}

interface Workspace {
  workspace: ItemWorkspaceProps;
  name?: string;
  type: WorkspaceType;
  page: 1 | 2 | 3;
}

export type { WorkspaceActions, Workspace, Workspaces };
