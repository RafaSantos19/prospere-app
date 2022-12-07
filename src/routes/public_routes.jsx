import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/login/'
import Signup from '../pages/signup/'

function PublicRoutes() {
    return (
        <BrowserRouter>
            <Route path={["/", "/login"]} exact={true} component={Login} />
            <Route path="/signup" exact={true} component={Signup} />
        </BrowserRouter>
    )
}

export default PublicRoutes;