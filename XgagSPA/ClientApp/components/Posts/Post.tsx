import * as React from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'
import * as Models from '../../Proxies/ProxyModels'
import { Spacer } from '../System/Spacer'
import { Link } from 'react-router-dom'
import { Spinner } from '../System/Spinner'
import { AsyncImage } from '../System/AsyncImage'

interface PostState {
    isLoading: boolean;
}

export class Post extends React.Component<Models.PostModel, PostState>{
    private image = new Image();

    constructor(props: Models.PostModel) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    public render() {
        return <Panel header={this.renderTitle()} footer={this.renderFooter()}>
            <AsyncImage className='post-image' src={this.props.imageUrl} />
        </Panel>;
    }

    private renderTitle() {
        return <Link to=''>{this.props.title}</Link>;
    }

    private renderFooter() {
        return <div>
            <div>
                <span className="text-info text">Score: {this.props.score}</span>
                <span className='pull-right text-info'>
                    Posted at: {this.getPostedDate().toLocaleDateString()}
                </span>
            </div>
            <div>
                <button className='btn btn-primary'><Glyphicon glyph={'arrow-up'} /></button>
                <Spacer type='horizontal' space={5} />
                <button className='btn btn-primary'><Glyphicon glyph={'arrow-down'} /></button>
                <Spacer type='horizontal' space={5} />
                <button className='btn btn-primary'>
                    <Glyphicon glyph='comment' /> {this.props.commentsCount}
                </button>
            </div>
        </div>;
    }

    private getPostedDate(): Date {
        return new Date(this.props.dateCreatedTicks);
    }
}