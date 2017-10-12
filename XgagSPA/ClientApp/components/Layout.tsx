import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Configuration } from '../configuration'
import { Spinner } from './System/spinner'
import { Modal } from 'react-bootstrap'
import { LoginModal } from './Identity/LoginModal'
import { RuntimeInfo } from '../RuntimeInfo'
import { IdentityProxy } from '../Proxies/IdentityProxy'

export interface LayoutProps {
    children?: React.ReactNode;
}

interface LayoutState {
    isBusy: boolean;
    isLoggedIn: boolean;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
    private identityProxy = new IdentityProxy();

    constructor() {
        super();
        this.state = {
            isBusy: true,
            isLoggedIn: false
        };
        Configuration.loadConfigurations(() => { this.onConfigLoaded(); });
    }

    private async onConfigLoaded() {
        let isLoggedIn = false;
        if (!RuntimeInfo.currentUser) {
            var token = RuntimeInfo.readSessionTokenFromLocalStorage();
            if (token) {
                let user = await this.identityProxy.verifyToken(token);
                RuntimeInfo.setCurrentUser(user);
                isLoggedIn = true;
            }
        }

        this.setState({ isBusy: false, isLoggedIn: isLoggedIn });
    }

    private onLoggedIn() {
        this.setState({ isLoggedIn: true });
    }

    public render() {
        return <div>
            {RuntimeInfo.currentUser ?
                <NavMenu username={RuntimeInfo.currentUser.username}
                    profileImg={RuntimeInfo.currentUser.profilePictureUrl} />
            : ''}
            <div className='container body-content'>
                {this.state.isBusy ? <Spinner height={100} width={100} /> : ''}
                {this.state.isLoggedIn ? this.props.children : <LoginModal loggedIn={() => this.onLoggedIn()} />}
            </div>
        </div>;
    }
}
