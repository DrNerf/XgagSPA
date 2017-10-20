import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { RuntimeInfo } from '../RuntimeInfo'
import { PostsProxy } from '../Proxies/PostsProxy'
import { ProgressBar } from 'react-bootstrap'
import * as Models from '../Proxies/ProxyModels'
import { Post } from './Posts/Post'
import { Spinner } from './System/Spinner'
import * as CSSTransitionGroup from 'react-addons-css-transition-group'

interface HomeState {
    posts: Models.PostModel[];
}

export class Home extends React.Component<RouteComponentProps<{}>, HomeState> {
    private postsProxy = new PostsProxy();
    private page = 0;

    constructor() {
        super();
        this.state = {
            posts: []
        };
    }

    public render() {
        return <div className='container'>
            <br />
            <div className='col-lg-8'>
                <CSSTransitionGroup
                    transitionName='list-item'
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}>
                    {this.renderPosts()}
                </CSSTransitionGroup>
                <div className='row text-center'>
                    <Spinner width={50} height={50} />
                </div>
                <br />
            </div>
            <div className='col-lg-4'>
            </div>
        </div>;
    }

    public componentDidMount() {
        window.addEventListener('scroll', () => this.handleOnScroll());

        this.loadNextPage();
    }

    public componentWillUnmount() {
        window.removeEventListener('scroll', () => this.handleOnScroll());
    }

    private renderPosts() {
        return this.state.posts.map(post =>
            <div className='row' key={post.postId}>
                <Post {...post} />
            </div>);
    }

    private handleOnScroll() {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            this.loadNextPage();
        }
    }

    private async loadNextPage(): Promise<void> {
        try {
            let newPosts = await this.postsProxy.getPosts(this.page + 1);
            this.setState({ posts: this.state.posts.concat(newPosts) });
            this.page++;
        } catch (ex) {
            console.error(ex);
        }
    }
}
