import { Configuration } from '../configuration'
import * as Models from './ProxyModels';
import { ProxyBase } from './ProxyBase'

export class IdentityProxy extends ProxyBase {
    public async login(username: string, password: string): Promise<Models.UserModel> {
        const address = Configuration.serverConfig.identityServer.concat('/Auth');
        const response = await fetch(address, this.getRequestInit('POST', {
            username: username,
            password: password
        }));
        if (response.ok) {
            const json = await response.json();
            return json as Models.UserModel;
        }
        else {
            throw new Models.ProxyException("Wrong username or password.");
        }
    }

    public async verifySession(): Promise<Models.UserModel> {
        const address = Configuration.serverConfig.identityServer.concat('/Auth');
        const response = await fetch(address, this.getRequestInit('GET', null));
        if (response.ok) {
            const json = await response.json();
            return json as Models.UserModel;
        }
        else {
            throw new Models.ProxyException("Invalid session.");
        }
    }
}