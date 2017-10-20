﻿import * as React from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'
import * as Models from '../../Proxies/ProxyModels'
import { Spacer } from '../System/Spacer'
import { Link } from 'react-router-dom'
import { Spinner } from '../System/Spinner'

interface PostState {
    isLoading: boolean;
}

export class Post extends React.Component<Models.PostModel, PostState>{
    constructor() {
        super();
        this.state = {
            isLoading: true
        };
    }

    public render() {
        return <Panel header={this.renderTitle()} footer={this.renderFooter()}>
            <img
                className='post-image'
                src={!this.state.isLoading ? this.props.imageUrl : 'https://i.redd.it/ounq1mw5kdxy.gif'}
                onLoad={this.setFileStatus.bind(this)} />
        </Panel>;
    }

    private setFileStatus(): void{
        this.state = {
            isLoading: false
        };
    }

    private renderTitle() {
        return <Link to=''>{this.props.title}</Link>;
    }

    private renderFooter() {
        return <div>
            <button className='btn btn-primary'><Glyphicon glyph={'arrow-up'} /></button>
            <Spacer type='horizontal' space={5} />
            <button className='btn btn-primary'><Glyphicon glyph={'arrow-down'} /></button>
            <Spacer type='horizontal' space={5} />
            <button className='btn btn-primary'>
                <Glyphicon glyph='comment' /> 5
            </button>
            <span className='pull-right text-info'>
                Posted at: {this.getPostedDate().toLocaleDateString()}
            </span>
        </div>;
    }

    private getPostedDate(): Date {
        return new Date(this.props.dateCreatedTicks);
    }
}