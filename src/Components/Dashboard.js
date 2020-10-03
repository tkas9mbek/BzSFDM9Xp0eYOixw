import React from 'react';
import Counter from "./Counter";
import {Grid} from "semantic-ui-react";
import PriceTable from "./PriceTable";

export default class Dashboard extends React.Component {

    render() {
        return (
            <Grid
                textAlign='center'
                padded='vertically'
            >
                <Grid.Row>
                    <Counter />
                </Grid.Row>
                <Grid.Row>
                    <PriceTable />
                </Grid.Row>
            </Grid>
        );
    }
}

