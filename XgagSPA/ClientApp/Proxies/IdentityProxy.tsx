import { Configuration } from '../configuration'
import * as Models from './ProxyModels';

export class IdentityProxy {
    public async login(username: string, password: string): Promise<Models.UserModel> {
        const requestInit = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            }),
        } as RequestInit;
        const address = Configuration.serverConfig.identityServer.concat('/Auth');
        const response = await fetch(address, requestInit);
        if (response.ok) {
            const json = await response.json();
            return json as Models.UserModel;
        }
        else {
            throw new Models.ProxyException("Wrong username or password.");
        }
    }

    //public async verifyToken(token: string): Promise<Models.UserModel> {

    //}
}