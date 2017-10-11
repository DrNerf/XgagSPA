import * as Models from './Proxies/ProxyModels'

export class RuntimeInfo {
    public static currentUserChanged: Function[];
    public static currentUser: Models.UserModel;

    public static setCurrentUser(user: Models.UserModel): void {
        this.currentUser = user;
        if (this.currentUserChanged.length > 0) {
            for (var i = 0; i < this.currentUserChanged.length; i++) {
                this.currentUserChanged[i]();
            }
        }
    }

    public static writeSessionTokenToLocalStorage(token: string): void {
        localStorage.setItem("session-token", token);
    }

    public static readSessionTokenFromLocalStorage(): string | null {
        return localStorage.getItem("session-token");
    }
}