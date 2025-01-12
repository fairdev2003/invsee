
export type ItemType = {
    _id: string;
    item_name: string;
    item_tag: string;
    authorId: string;
    stack_size: number;
    modId: string;
    author?: UserType;
    type: string;
    material_value: number
    short_description: string;
    createdAt: string;
    updatedAt: string;

    // pipelines
    mod?: ModType
}

export type ModType = {
    _id: string;
    modName: string;
    tag: string;
    userId: string;
    modDescription: string;
    modLoaders: string[]
    image_src: string;
    updatedAt: string;
    createdAt: string;

    // pipelines
    user?: UserType;
}

export type SearchBarResponse = {
    items: ItemType[]
    mods: ModType[]
    links: string[]
}

export type UserType = {
    _id: string;
    userId: string;
    nick: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    backgroundImage: string;
}

export type GoodServerResponse = {
    code: number;
    message: string;
    token: string;
}

export type ErrorServerResponse = {
    code: number;
    message: string;
    error: string;
}

export type AccessPower = "user" | "secure" | "admin"