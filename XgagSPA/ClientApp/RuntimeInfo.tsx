import * as Models from './Proxies/ProxyModels'

export class RuntimeInfo {
    public static currentUser: Models.UserModel;

    public static setCurrentUser(user: Models.UserModel): void {
        this.currentUser = user;
    }
}