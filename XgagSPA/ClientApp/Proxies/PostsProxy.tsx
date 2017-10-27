import { ProxyBase } from './ProxyBase'
import * as Models from './ProxyModels'
import { Configuration } from '../configuration'

export class PostsProxy extends ProxyBase {
    public async getPosts(page: number): Promise<Models.PostModel[]> {
        const address = Configuration.serverConfig.postsServer
            .concat('/Posts?page=')
            .concat(page.toString());
        const response = await fetch(address, this.getRequestInit('GET', null));
        if (response.ok) {
            const json = await response.json();
            return json as Models.PostModel[];
        } else {
            throw new Models.ProxyException('Could not retrieve posts.');
        }
    }

    public async getStats(): Promise<Models.PostsStatsModel> {
        const address = Configuration.serverConfig.postsServer
            .concat('/stats');
        const response = await fetch(address, this.getRequestInit('GET', null));
        if (response.ok) {
            const json = await response.json();
            return json as Models.PostsStatsModel;
        } else {
            throw new Models.ProxyException('Could not retrieve posts stats.');
        }
    }
}