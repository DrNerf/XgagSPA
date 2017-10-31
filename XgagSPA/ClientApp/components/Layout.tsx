import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Configuration } from '../configuration'
import { Spinner } from './System/Spinner'
import { Modal, ProgressBar, Collapse, Fade } from 'react-bootstrap'
import { LoginModal } from './Identity/LoginModal'
import { RuntimeInfo } from '../RuntimeInfo'
import { IdentityProxy } from '../Proxies/IdentityProxy'

export interface LayoutProps {
    children?: React.ReactNode;
}

interface LayoutState {
    isBusy: boolean;
    isLoggedIn: boolean;
    pageProgress: number;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
    private identityProxy = new IdentityProxy();

    constructor() {
        super();
        this.state = {
            isBusy: true,
            isLoggedIn: false,
            pageProgress: 0
        };
        Configuration.loadConfigurations(() => { this.onConfigLoaded(); });
    }

    private async onConfigLoaded() {
        let isLoggedIn = false;
        if (!RuntimeInfo.currentUser) {
            try {
                let user = await this.identityProxy.verifySession();
                RuntimeInfo.setCurrentUser(user);
                isLoggedIn = true;
            } catch (e) {
                console.warn(e);
            }
        }

        this.setState({ isBusy: false, isLoggedIn: isLoggedIn });
    }

    private onLoggedIn() {
        this.setState({ isLoggedIn: true });
    }

    public componentWillReceiveProps(nextProps: any) {
        this.setState({ pageProgress: 0 });
        let updateProgressInterval = setInterval(
            () => {
                if (this.state.pageProgress >= 100) {
                    clearInterval(updateProgressInterval);
                    return;
                }

                this.setState({ pageProgress: this.state.pageProgress + 10 });
                console.log(this.state.pageProgress);
            },
            1000);
    }

    public render() {
        return <div>
            <Fade in={this.state.pageProgress != 100}>
                <ProgressBar id='page-progressbar' active now={this.state.pageProgress} />
            </Fade>
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
