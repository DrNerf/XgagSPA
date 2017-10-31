import * as React from 'react';

interface SpinnerProps {
    width: number;
    height: number;
}

export class Spinner extends React.Component<SpinnerProps> {
    private spinnerStyles = {
        width: this.props.width,
        height: this.props.height
    }

    public render() {
        return <div className="wrapper">
            <div className="cssload-loader absolute-center" style={this.spinnerStyles}></div>
        </div>;
    }
}