import React from 'react';
import {Segment, Grid} from "semantic-ui-react";
import Time from "./Time";

export default class Counter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            time: 10 * 60 * 60,
        }
    }

    componentDidMount() {
        setInterval( () => this.autoDecrementCounter(), 1000);
    }

    autoDecrementCounter() {
        const {time} = this.state;

        if (time > 0) {
            this.setState({
                time: time - 1
            });
        }
    }

    changeCounterValue = (type, increment, number = 1) => {
        let newTime = this.state.time;

        switch (type) {
            case 'hour':
                newTime += (increment ? 1 : -1) * number * 60 * 60;
                break;
            case 'minute':
                newTime += (increment ? 1 : -1) * number * 60;
                break;
            case 'second':
                newTime += (increment ? 1 : -1) * number;
                break;
            default:
                break;
        }

        if(newTime < 0) {
            this.setState({
                time: 0
            });
        } else {
            this.setState({
                time: newTime
            });
        }
    };

    render() {

        const {time} = this.state;

        const hours = Math.floor((time / (60 * 60)));
        const minutes = Math.floor((time % (60 * 60)) / 60);
        const seconds = Math.floor((time % (60)));

        return (
            <Segment>
                <Grid
                    style={{width: 780}}
                    columns={3}
                    divided
                >
                    <Grid.Column>
                        <Time
                            type='hour'
                            value={hours}
                            changeCounterValue={this.changeCounterValue}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Time
                            type='minute'
                            value={minutes}
                            changeCounterValue={this.changeCounterValue}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Time
                            type='second'
                            value={seconds}
                            changeCounterValue={this.changeCounterValue}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        );
    }
}

