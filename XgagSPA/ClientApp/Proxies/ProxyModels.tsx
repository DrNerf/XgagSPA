export interface UserModel {
    id: string,
    email: string,
    username: string,
    profilePictureUrl: string,
    apiSessionToken: string
}

export class ProxyException {
    public requestStatusCode: number;
    public errorMessage: string;

    constructor(error: string) {
        this.errorMessage = error;
    }
}