import * as React from 'react';
import { Spinner } from './System/spinner';
import { RouteComponentProps } from 'react-router';

interface LoginFormState {
    isBusy: boolean;
}

export class Login extends React.Component<RouteComponentProps<{}>, LoginFormState> {
    constructor() {
        super();
        this.state = { isBusy: false };
    }

    private login() {
        let that = this;
        this.setState({ isBusy: true });
        setTimeout(function myfunction() {
            that.setState({ isBusy: false });
        }, 2000);
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
                                    <input className="form-control" placeholder="Username" type="text" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Password" type="password" />
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
}