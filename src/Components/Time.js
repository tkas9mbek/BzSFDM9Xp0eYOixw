import React from 'react';
import {Button, Grid} from "semantic-ui-react";

export default class Time extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            type: this.props.type,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                value: this.props.value
            });
        }
    }

    render() {

        const {value, type} = this.state;

        return (
            <div>
                <Grid textAlign='center'>
                    <Grid.Row>
                        <Button
                            size='tiny'
                            icon='plus'
                            onClick={() => this.props.changeCounterValue(type, true)}
                        />
                    </Grid.Row>
                    <Grid.Row>
                        <label className='time-number'>
                            {value}
                        </label>
                        <label className='time-label'>
                            &nbsp;{value !== 1 ? type + 's' : type}
                        </label>
                    </Grid.Row>
                    <Grid.Row>
                        <Button
                            size='tiny'
                            icon='minus'
                            onClick={() => this.props.changeCounterValue(type, false)}
                        />
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

