import React, { Component } from 'react';

import Navigation from '../HeaderComponents/Navigation.component';
import Footer from '../HeaderComponents/Footer.component';

export default class ShoppingList extends Component {
    render() {
        return (
            <>
                <Navigation />

                <Footer />
            </>
        )
    }
}