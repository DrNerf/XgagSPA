﻿import * as React from 'react'
import { Spinner } from '../System/Spinner'
import { Spacer } from './Spacer'

interface AsyncImageProps {
    src: string;
    className: string;
}

interface AsyncImageState {
    isLoaded: boolean;
}

export class AsyncImage extends React.Component<AsyncImageProps, AsyncImageState> {
    constructor() {
        super();
        this.state = {
            isLoaded: false
        };
    }

    public componentDidMount() {
        let preloadedImage = new Image();
        preloadedImage.onload = () => this.setState({ isLoaded: true });
        preloadedImage.src = this.props.src;
    }

    public render() {
        return <div>
            {this.state.isLoaded ?
                <img className={this.props.className} src={this.props.src} /> :
                <div className="text-center spinner-container">
                    <Spinner width={50} height={50} />
                </div>}
        </div>
    }
}