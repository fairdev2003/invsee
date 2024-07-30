import { Mod } from "@prisma/client";

interface WorkspaceActions {
  setItemWorkspaceState: (
    key:
      | "workspaceName"
      | "itemName"
      | "itemTag"
      | "itemImage"
      | "gallery"
      | "itemDescription"
      | "materialValue"
      | "wikiElements"
      | "modTag"
      | "itemType"
      | "step"
      | "mod"
      | "stackSize"
      | "itemTags",
    value: any | Mod
  ) => void;
  setpage: (data: number | string) => void;
  setErrorExplaination: (message: string, description: string) => void;
  setErrorState: (data: boolean) => void;
  addNewWikiElement: (wikiElement: WikiElement) => void;
  editWikiElement: (index: number, wikiElement: WikiElement | any) => void;
  deleteWikiElement: (index: number) => void;
}

interface WorksapceErorr {
  error: boolean;
  description: string;
  message: string;
}

interface ItemTag {
  id: number;
  tagName: string;
}

interface ItemWorkspaceProps {
  workspaceErorr: WorksapceErorr;
  workspaceName: string;
  itemName: string;
  itemTag: string;
  itemImage: any;
  gallery: string[];
  itemDescription: string;
  materialValue: string;
  wikiElements: WikiElement[];
  modTag?: string;
  itemType: string 
  step: 1 | 2 | 3;
  stackSize: string;
  mod: Mod;
  itemTags: ItemTag[];
}

enum WorkspaceType {
  Item = "Item",
  Mod = "Mod",
  Wiki = "Wiki",
}

export interface WikiElement {
  title?: string;
  content: string;
  image: string;
  links?: string[];
  id: number;
}

interface Workspaces {
  itemWorkspace: ItemWorkspaceProps;
  page: string;
}

interface Workspace {
  workspace: ItemWorkspaceProps;
  name?: string;
  type: WorkspaceType;
  page: 1 | 2 | 3;
}

export type { WorkspaceActions, Workspace, Workspaces };
