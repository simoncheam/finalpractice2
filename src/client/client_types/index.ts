
export interface MySQL_Default_Response {
    insertId: number;
    affectedRows: number;
}

export interface Users {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    _created?: string
}

export interface Books {
    id?: number;
    categoryid?: number;
    title?: string;
    author?: string;
    price?: number;
    _created?: string;

}

export interface Categories {
    id?: number;
    name: string;
}