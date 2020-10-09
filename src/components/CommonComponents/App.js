import React, { Component } from 'react';
import '../../sass/App.sass';

import ShoppingList from './ShoppingList.component';

class App extends Component {
    render() {
        return (
            <ShoppingList />
        );
    }
}

export default App;