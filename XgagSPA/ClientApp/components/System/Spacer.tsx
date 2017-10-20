import * as React from 'react'

interface SpacerProps {
    space: number;
    type: 'vertical' | 'horizontal'
}

export class Spacer extends React.Component<SpacerProps, React.CSSProperties> {
    constructor(props: SpacerProps) {
        super(props);
        let display = 'inline-block';
        if (this.props.type == 'vertical') {
            this.state = {
                display: display,
                height: this.props.space
            };
        } else {
            this.state = {
                display: display,
                width: this.props.space
            };
        }
    }

    public render() {
        return <span style={this.state}></span>;
    }
}