import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { RuntimeInfo } from '../RuntimeInfo'
import { PostsProxy } from '../Proxies/PostsProxy'
import { ProgressBar, Panel } from 'react-bootstrap'
import * as Models from '../Proxies/ProxyModels'
import { Post } from './Posts/Post'
import { Spinner } from './System/Spinner'
import * as CSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router-dom'
import { Spacer } from './System/Spacer'
import { AsyncImage } from './System/AsyncImage'

interface HomeState {
    posts: Models.PostModel[];
    stats?: Models.PostsStatsModel;
}

export class Home extends React.Component<RouteComponentProps<{}>, HomeState> {
    private postsProxy = new PostsProxy();
    private page = 0;

    constructor() {
        super();
        this.state = {
            posts: [],
            stats: undefined
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
                <CSSTransitionGroup
                    transitionName='list-item'
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}>
                    {this.state.stats != undefined ? this.renderStats() : ''}
                </CSSTransitionGroup>
            </div>
        </div>;
    }

    public componentDidMount() {
        window.addEventListener('scroll', () => this.handleOnScroll());

        this.loadNextPage();
        this.postsProxy.getStats().then(
            (stats) =>
            {
                this.setState({ stats: stats });
            });
    }

    public componentWillUnmount() {
        window.removeEventListener('scroll', () => this.handleOnScroll());
    }

    private renderStats() {
        if (!this.state.stats) {
            return;
        }

        let postKey = 0, contributorKey = 0;
        return [<Panel key="TC" header='Top Contributors:'>
            <ul className="list-group">
                {this.state.stats.topContributors.map(contributor =>
                    <li className="list-group-item no-border" key={++contributorKey}>
                        <img className="img-rounded" width="30" src={contributor.user.profilePictureUrl} />
                        <Spacer type="horizontal" space={5} />
                        {contributor.user.username} with {contributor.postsCount} posts!
                    </li>)}
            </ul>
        </Panel>,
            <Panel key="TP" header="Top Posts:">
                <ul className="list-group">
                    {this.state.stats.topPosts.map(post =>
                        <li className="list-group-item no-border" key={++postKey}>
                            <Link to="">{post.title} with {post.score} points!</Link>
                            <div className="post-preview">
                                <Link to="">
                                    <AsyncImage src={post.imageUrl} />
                                </Link>
                            </div>
                        </li>)}
                </ul>
        </Panel>]
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
