import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as Models from '../Proxies/ProxyModels'
import { RuntimeInfo } from '../RuntimeInfo'

interface NavMenuState {
    user: Models.UserModel;
}

export class NavMenu extends React.Component<{}, NavMenuState> {
    constructor() {
        super();
        this.state = {
            user: RuntimeInfo.currentUser
        }
    }

    public render() {
        return <div className='navbar navbar-default navbar-fixed-top'>
            <div className='container'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>Xgag SPA</Link>
                </div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={'/'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/counter'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/fetchdata'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        </li>
                    </ul>
                    <ul className='nav navbar-nav navbar-right'>
                        <li>
                            <NavLink to={'/fetchdata'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span>
                                {this.state.user == undefined ? "Username" : this.state.user.username}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
