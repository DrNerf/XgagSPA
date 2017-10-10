import * as React from 'react';
import { Spinner } from './System/spinner';
import { RouteComponentProps } from 'react-router';

export class Login extends React.Component<RouteComponentProps<{}>, {}> {
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
                                    <input className="form-control" placeholder="E-mail" name="email" type="text" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" placeholder="Password" name="password" type="password" value="" />
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="Remember Me" /> Remember Me
			    	                </label>
                                </div>
                                <button className="btn btn-success btn-block">
                                    <Spinner width={20} height={20} />
                                    Login
                                </button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}