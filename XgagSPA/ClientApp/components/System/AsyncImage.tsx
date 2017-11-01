import * as React from 'react'
import { Spinner } from '../System/Spinner'
import { Spacer } from './Spacer'
import { Fade } from 'react-bootstrap'

interface AsyncImageProps {
    src: string;
    className?: string;
}

interface AsyncImageState {
    isLoaded: boolean;
}

export class AsyncImage extends React.Component<AsyncImageProps, AsyncImageState> {
    private _isMounted = false;
    constructor() {
        super();
        this.state = {
            isLoaded: false
        };
    }

    public componentDidMount() {
        this._isMounted = true;
        let preloadedImage = new Image();
        preloadedImage.onload = () => {
            if (this._isMounted) {
                this.setState({ isLoaded: true });
            }
        };
        preloadedImage.src = this.props.src;
    }

    public componentWillUnmount() {
        this._isMounted = false;
    }

    public render() {
        return <div>
            <Fade in={this.state.isLoaded}>
                <img className={this.props.className} src={this.props.src} />
            </Fade>
            {!this.state.isLoaded ?
                <div className="text-center">
                    <Spinner width={50} height={50} />
                </div> : ''}
        </div>
    }
}