import * as React from 'react'
import { Panel } from 'react-bootstrap'
import * as Models from '../../Proxies/ProxyModels'

export class Post extends React.Component<Models.PostModel, {}>{
    public render() {
        return <Panel header={this.props.title} footer='Vote buttons and score here!'>
            <img className='post-image' src={this.props.imageUrl} />
        </Panel>;
    }
}