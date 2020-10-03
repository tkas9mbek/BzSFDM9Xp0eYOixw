import React from 'react';

export default class Price extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            type: this.props.type,
        }
    }

    render() {
        const {value, type} = this.state;

        return (
            <div>
                <label className='time-number'>
                    {value}
                </label>
                <label className='time-label'>
                    {type}
                </label>
            </div>
        );
    }
}