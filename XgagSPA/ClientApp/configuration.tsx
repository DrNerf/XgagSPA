interface ServerConfiguration {
    identityServer: string,
    postsServer: string
}

export class Configuration {
    public static serverConfig: ServerConfiguration;

    public static loadConfigurations(onConfigLoaded: Function) {
        fetch('api/configuration')
            .then(response => response.json() as Promise<ServerConfiguration>)
            .then(data => {
                this.serverConfig = data;
                onConfigLoaded();
            });
    }
}