import React from 'react';
import {Dimmer, Segment, Grid, Header, Flag, Placeholder, Loader} from "semantic-ui-react";

const ENDPOINT = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const HIGHLIGHT_STYLE = {color: 'green', fontWeight: 600};

export default class Prices extends React.Component {

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
        fetch(ENDPOINT)
            .then(res => res.json())
            .then(result => {
                    const bpi = result.bpi;
                    if(bpi.USD.rate !== this.state.USD) {
                        this.setState({
                            highlight: true,
                            USD: bpi.USD.rate,
                            GBP: bpi.GBP.rate,
                            EUR: bpi.EUR.rate,
                        });

                        setTimeout(() => {
                            this.setState({highlight: false})
                        }, 1000);
                    }
                }
            )
            .catch(error => {
                this.setState({
                    error: error.toString()
                })
            });
    }

    render() {

        const {USD, GBP, EUR, error, highlight} = this.state;
        const dataLoaded = USD && GBP && EUR;
        const prices = [
            {
                name: 'USD',
                value: USD,
                flag: 'us'
            },
            {
                name: 'GBP',
                value: GBP,
                flag: 'uk'
            },
            {
                name: 'EUR',
                value: EUR,
                flag: 'eu'
            },
        ];

        return (
            <Segment style={{width: 780}} >
                {error ?
                    <Header textAlign='center' color='red'>
                        {error}
                    </Header>
                    :
                    dataLoaded ?
                        <Grid>
                            <Grid.Row textAlign='center'>
                                <Grid.Column width={16}>
                                    <Header as='h2'>
                                        Bitcoin prices now
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row textAlign='center' columns={3}>
                                {
                                    prices.map(price =>
                                        <Grid.Column>
                                            <label
                                                className='time-label'
                                                style={highlight ? HIGHLIGHT_STYLE : null}
                                            >
                                                {price.value + " " + price.name} <Flag name={price.flag}/>
                                            </label>

                                        </Grid.Column>
                                    )
                                }
                            </Grid.Row>
                        </Grid>
                        :
                        <div>
                            <Dimmer active inverted>
                                <Loader content='Loading Bitcoin prices...' />
                            </Dimmer>
                            <Placeholder>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder>
                        </div>
                }
            </Segment>
        );
    }
}