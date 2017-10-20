import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { RuntimeInfo } from '../RuntimeInfo'
import { PostsProxy } from '../Proxies/PostsProxy'
import { ProgressBar } from 'react-bootstrap'
import * as Models from '../Proxies/ProxyModels'
import { Post } from './Posts/Post'
import { Spinner } from './System/spinner'
import * as CSSTransitionGroup from 'react-addons-css-transition-group'

interface HomeState {
    posts: Models.PostModel[];
}

export class Home extends React.Component<RouteComponentProps<{}>, HomeState> {
    private postsProxy = new PostsProxy();

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

        this.pushDemoPost();
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
            setTimeout(() => this.pushDemoPost(), 2000);
        }
    }

    private demoIdCounter = 1;
    private pushDemoPost(): void {
        var newState = this.state.posts.concat([{
            postId: this.demoIdCounter,
            title: 'Demo',
            dateCreatedTicks: 1231241234,
            imageUrl: 'https://img-9gag-fun.9cache.com/photo/aB8Xq1N_700b.jpg',
            youTubeLink: '',
            isNsfw: false,
            isYoutubePost: false,
            score: 12
        }]);
        this.setState({ posts: newState })
        this.demoIdCounter++;
    }
}
