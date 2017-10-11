import * as React from 'react';
import { Spinner } from './System/spinner';
import { RouteComponentProps } from 'react-router';
import { Configuration } from '../configuration';
import { IdentityProxy } from '../Proxies/IdentityProxy'
import * as Models from '../Proxies/ProxyModels'

interface LoginFormState {
    isBusy: boolean;
    username: string;
    password: string;
}

export class Login extends React.Component<RouteComponentProps<{}>, LoginFormState> {
    private identityProxy = new IdentityProxy();

    constructor() {
        super();
        this.state = {
            isBusy: false,
            username: '',
            password: ''
        };
    }

    public render() {
        return <div className="container">
            <br />
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Please sign in</h3>
                        </div>
                        <div className="panel-body">
                            <fieldset>
                                <div className="form-group">
                                    <input className="form-control"
                                        placeholder="Username"
                                        type="text"
                                        value={this.state.username}
                                        onChange={(evt) => this.updateUsername(evt)}
                                        disabled={this.state.isBusy} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control"
                                        placeholder="Password"
                                        type="password"
                                        value={this.state.password}
                                        onChange={(evt) => this.updatePassword(evt)}
                                        disabled={this.state.isBusy} />
                                </div>
                                <button className="btn btn-success btn-block" onClick={() => this.login()} disabled={this.state.isBusy}>
                                    {this.state.isBusy ? <Spinner width={20} height={20} /> : 'Login'}
                                </button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }

    private async login() {
        try {
            var user = await this.identityProxy.login(this.state.username, this.state.password);
            console.log(user);
        } catch (ex) {
            if (typeof (ex) == typeof (Models.ProxyException)) {
                console.log(ex);
            }

            console.log(ex);
        }
    }

    private updateUsername(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ username: evt.target.value });
    }

    private updatePassword(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: evt.target.value });
    }
}