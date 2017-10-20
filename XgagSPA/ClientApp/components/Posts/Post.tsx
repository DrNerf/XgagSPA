import * as React from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'
import * as Models from '../../Proxies/ProxyModels'

export class Post extends React.Component<Models.PostModel, {}>{
    public render() {
        return <Panel header={this.props.title} footer={this.renderFooter()}>
            <img className='post-image' src={this.props.imageUrl} />
        </Panel>;
    }

    private renderFooter() {
        return <div>
            <button className='btn btn-primary'><Glyphicon glyph={'arrow-up'} /></button>
            <button className='btn btn-primary'><Glyphicon glyph={'arrow-down'} /></button>
        </div>;
    }
}