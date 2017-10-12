import * as Models from './Proxies/ProxyModels'

export class RuntimeInfo {
    public static currentUser: Models.UserModel;

    public static setCurrentUser(user: Models.UserModel): void {
        this.currentUser = user;
        this.writeSessionTokenToLocalStorage(user.apiSessionToken);
    }

    public static writeSessionTokenToLocalStorage(token: string): void {
        localStorage.setItem("session-token", token);
    }

    public static readSessionTokenFromLocalStorage(): string | null {
        return localStorage.getItem("session-token");
    }
}