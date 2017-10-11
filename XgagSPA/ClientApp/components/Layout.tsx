import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Configuration } from '../configuration'
import { Spinner } from './System/spinner'

export interface LayoutProps {
    children?: React.ReactNode;
}

interface LayoutState {
    isBusy: boolean;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor() {
        super();
        this.state = {
            isBusy: true
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
                { this.props.children }
            </div>
        </div>;
    }
}
