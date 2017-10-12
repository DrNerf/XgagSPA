import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as Models from '../Proxies/ProxyModels'
import { RuntimeInfo } from '../RuntimeInfo'
import { Navbar, NavItem, Nav } from 'react-bootstrap'

interface NavMenuProps {
    username: string;
    profileImg: string;
}

export class NavMenu extends React.Component<NavMenuProps, {}> {
    constructor() {
        super();
    }

    public render() {
        return <Navbar fixedTop={true}>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to={'/'}>Xgag</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem>
                        <Link to={'/'}>
                            <span className='glyphicon glyphicon-home'></span> Home
                    </Link>
                    </NavItem>
                    <NavItem>
                        <Link to={'/counter'}>
                            <span className='glyphicon glyphicon-education'></span> Counter
                    </Link>
                    </NavItem>
                    <NavItem>
                        <Link to={'/fetchdata'}>
                            <span className='glyphicon glyphicon-th-list'></span> Fetch data
                    </Link>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem>
                        <Link to={'/fetchdata'}>
                            <img src={this.props.profileImg} className='img-rounded profile-mini-image' />
                            {this.props.username}
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    }
}
