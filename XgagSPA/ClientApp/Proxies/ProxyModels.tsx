export interface UserModel {
    id: string,
    email: string,
    username: string,
    profilePictureUrl: string
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

export interface ContributorModel {
    user: UserModel,
    postsCount: number
}

export interface PostsStatsModel {
    topContributors: ContributorModel[],
    topPosts: PostModel
}

export class ProxyException {
    public requestStatusCode: number;
    public errorMessage: string;

    constructor(error: string) {
        this.errorMessage = error;
    }
}