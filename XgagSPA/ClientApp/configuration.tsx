interface ServerConfiguration {
    identityServer: string,
    postsServer: string
}

export class Configuration {
    public static serverConfig: ServerConfiguration;

    public static async loadConfigurations(onConfigLoaded: Function) {
        const response = await fetch("api/configuration");
        const json = await response.json();
        this.serverConfig = json as ServerConfiguration;
        onConfigLoaded();
    }
}