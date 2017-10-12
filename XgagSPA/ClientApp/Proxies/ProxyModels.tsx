export interface UserModel {
    id: string,
    email: string,
    username: string,
    profilePictureUrl: string,
    apiSessionToken: string
}

export interface PostModel {
    postId: number,
    title: string,
    dateCreatedTicks: number,
    imageUrl: string,
    youTubeLink: string,
    isNsfw: boolean,
    isYoutubePost: boolean,
    score: number
}

export class ProxyException {
    public requestStatusCode: number;
    public errorMessage: string;

    constructor(error: string) {
        this.errorMessage = error;
    }
}