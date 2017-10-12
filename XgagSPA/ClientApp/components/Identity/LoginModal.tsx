import * as React from 'react';
import { Spinner } from '../System/spinner';
import { RouteComponentProps } from 'react-router';
import { Configuration } from '../../configuration';
import { IdentityProxy } from '../../Proxies/IdentityProxy'
import * as Models from '../../Proxies/ProxyModels'
import { RuntimeInfo } from "../../RuntimeInfo";
import { Modal } from 'react-bootstrap'

interface LoginFormState {
    isBusy: boolean;
    username: string;
    password: string;
    showModal: boolean;
}

interface LoginModalProps {
    loggedIn: Function;
}

export class LoginModal extends React.Component<LoginModalProps, LoginFormState> {
    private identityProxy = new IdentityProxy();

    constructor() {
        super();
        this.state = {
            isBusy: false,
            username: '',
            password: '',
            showModal: true
        };
    }

    public render() {
        return <Modal show={this.state.showModal} onHide={() => { }}>
            <Modal.Header>
                <span className='glyphicon glyphicon-user'></span> Login
            </Modal.Header>
            <Modal.Body>
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
                    <button className="btn btn-success btn-block"
                        onClick={() => this.login()}
                        disabled={this.state.isBusy}>
                        {this.state.isBusy ? <Spinner width={20} height={20} /> : 'Login'}
                    </button>
                </fieldset>
            </Modal.Body>
        </Modal>;
    }

    private async login() {
        try {
            this.setState({ isBusy: true });
            var user = await this.identityProxy.login(this.state.username, this.state.password);
            RuntimeInfo.setCurrentUser(user);
            this.setState({ isBusy: false, showModal: false });
            this.props.loggedIn();
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