type config = {
    prefix: string;
    token: string;
    randomAPIKey?: string;
};
type command = {
    run: Function;
    help: {
        show: boolean;
        name: string;
        usage: string;
        category: string;
        description: string;
    };
};
type dsachar = {
    prefix: string;
    avatar: string;
    displayname: string;
};
type nil = undefined | null | void;