import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { RuntimeInfo } from '../RuntimeInfo'
import { PostsProxy } from '../Proxies/PostsProxy'
import { ProgressBar } from 'react-bootstrap'

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    private postsProxy = new PostsProxy();

    constructor() {
        super();
    }

    public render() {
        return <div className='container'>
            <div className='col-lg-8'>
                <button className='btn btn-default' onClick={async () => { console.log(await this.postsProxy.getPosts(1)); }}>
                    Test
                </button>
            </div>
            <div className='col-lg-4'>
            </div>
        </div>;
    }
}
