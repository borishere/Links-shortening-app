export type TauthContext = {
    logIn: Function,
    logOut: Function,
    userToken: string | null,
    userId: string | null
};

export type Tlink = {
    initial: string,
    short: string,
    _id: string,
    owner?: string
};

export type TDetailsPageParams = {
    id: string
}
