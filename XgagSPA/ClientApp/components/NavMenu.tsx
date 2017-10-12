import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as Models from '../Proxies/ProxyModels'
import { RuntimeInfo } from '../RuntimeInfo'

interface NavMenuProps {
    username: string;
    profileImg: string;
}

export class NavMenu extends React.Component<NavMenuProps, {}> {
    constructor() {
        super();
    }

    public render() {
        return <div className='navbar navbar-default navbar-fixed-top'>
            <div className='container'>
                <div className='navbar-header'>
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
                        <li className='profile-li'>
                            <NavLink to={'/fetchdata'} activeClassName='active' className='profile-link'>
                                <img src={this.props.profileImg} className='img-rounded profile-mini-image' />
                                {this.props.username}
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
