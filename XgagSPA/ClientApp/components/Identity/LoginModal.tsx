import * as React from 'react';
import { Spinner } from '../System/spinner';
import { RouteComponentProps } from 'react-router';
import { Configuration } from '../../configuration';
import { IdentityProxy } from '../../Proxies/IdentityProxy'
import * as Models from '../../Proxies/ProxyModels'
import { RuntimeInfo } from "../../RuntimeInfo";
import { Modal, FormGroup, FormControl, Collapse, Alert } from 'react-bootstrap'
import 'mousetrap'

interface LoginFormState {
    isBusy: boolean;
    username: string;
    password: string;
    showModal: boolean;
    wrongPassword: boolean;
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
            showModal: true,
            wrongPassword: false
        };
    }

    componentDidMount() {
        Mousetrap.bind('enter', (e) => this.login());
    }
    componentWillUnmount() {
        Mousetrap.unbind('enter');
    }

    public render() {
        return <Modal show={this.state.showModal} onHide={() => { }}>
            <Modal.Header>
                <span className='glyphicon glyphicon-user'></span> Login
            </Modal.Header>
            <Modal.Body>
                <fieldset>
                    <div className="form-group">
                        <FormGroup validationState={this.getUsernameValidationState()}>
                            <input className="form-control mousetrap"
                                placeholder="Username"
                                type="text"
                                value={this.state.username}
                                onChange={(evt) => this.updateUsername(evt)}
                                disabled={this.state.isBusy} />
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="form-group">
                        <FormGroup validationState={this.getPwdValidationState()}>
                            <input className="form-control mousetrap"
                                placeholder="Password"
                                type="password"
                                value={this.state.password}
                                onChange={(evt) => this.updatePassword(evt)}
                                disabled={this.state.isBusy} />
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <button className="btn btn-success btn-block"
                        type='submit'
                        onClick={() => this.login()}
                        disabled={this.state.isBusy}>
                        {this.state.isBusy ? <Spinner width={20} height={20} /> : 'Login'}
                    </button>
                    <br/>
                    <Collapse in={this.state.wrongPassword}>
                        <div>
                            <Alert bsStyle='danger'>Wrong username or password!</Alert>
                        </div>
                    </Collapse>
                </fieldset>
            </Modal.Body>
        </Modal>;
    }

    private async login() {
        this.setState({ isBusy: true });
        try {
            var user = await this.identityProxy.login(this.state.username, this.state.password);
            RuntimeInfo.setCurrentUser(user);
            this.setState({ showModal: false });
            this.props.loggedIn();
        } catch (ex) {
            console.warn(ex);
            this.setState({ wrongPassword: true });
        } finally {
            this.setState({ isBusy: false });
        }
    }

    private getPwdValidationState(): "success" | "error" {
        return this.state.password.length < 3 ? "error" : "success";
    }

    private getUsernameValidationState(): "success" | "error" {
        return this.state.username.length < 3 ? "error" : "success";
    }

    private updateUsername(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ username: evt.target.value });
    }

    private updatePassword(evt: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: evt.target.value });
    }
}