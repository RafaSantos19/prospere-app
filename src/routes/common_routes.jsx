import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import About from '../pages/about'

function CommonRoutes() {
    return (
        <BrowserRouter>
            <Route path="/about" exact={true} component={About} />
        </BrowserRouter>
    )
}

export default CommonRoutes;