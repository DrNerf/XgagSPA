import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Configuration } from '../configuration'
import { Spinner } from './System/spinner'
import { Modal } from 'react-bootstrap'
import { LoginModal } from './Identity/LoginModal'

export interface LayoutProps {
    children?: React.ReactNode;
}

interface LayoutState {
    isBusy: boolean;
    isLoggedIn: boolean;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor() {
        super();
        this.state = {
            isBusy: true,
            isLoggedIn: false
        };
        Configuration.loadConfigurations(() => { this.onConfigLoaded(); });
    }

    private onConfigLoaded() {


        this.setState({ isBusy: false });
    }

    public render() {
        return <div>
            <NavMenu />
            <div className='container body-content'>
                {this.state.isBusy ? <Spinner height={100} width={100} /> : ''}
                {this.props.children}
                <LoginModal />
            </div>
        </div>;
    }
}
