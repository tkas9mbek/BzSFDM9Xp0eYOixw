import React from 'react';
import {Segment, Grid} from "semantic-ui-react";

const endpoint = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export default class PriceTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount(){
        this.getBitcoinPrices();
    }

    componentDidMount() {
        setInterval( () => this.getBitcoinPrices(), 1000);
    }

    getBitcoinPrices() {
        fetch(endpoint)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        USD: result.bpi.USD.rate,
                        GBP: result.bpi.GBP.rate,
                        EUR: result.bpi.EUR.rate,
                    })
                },
                (error) => {
                    this.setState({
                        error
                    })
                }
            );
    }

    render() {

        const {USD, GBP, EUR, error} = this.state;
        const dataLoaded = USD && GBP && EUR;

        return (
            <Segment
                style={{width: 780}}
            >
                {error ?
                    <label>error</label>
                    :
                    dataLoaded ?
                        <Grid

                            columns={3}
                            divided
                        >
                            <Grid.Column>
                                <label className='time-label'>
                                    {USD}
                                </label>
                                <label className='time-label'>
                                    USD
                                </label>
                            </Grid.Column>
                            <Grid.Column>
                                <label className='time-label'>
                                    {GBP}
                                </label>
                                <label className='time-label'>
                                    GBP
                                </label>
                            </Grid.Column>
                            <Grid.Column>
                                <label className='time-label'>
                                    {EUR}
                                </label>
                                <label className='time-label'>
                                    EUR
                                </label>
                            </Grid.Column>
                        </Grid>
                        :
                        <label>no loaded</label>
                }
            </Segment>
        );
    }
}