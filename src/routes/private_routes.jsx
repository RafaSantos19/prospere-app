import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../pages/home/'
import Board from '../pages/board/'
import Level from '../pages/board/level'
import Profile from '../pages/profile';
import Question from '../pages/board/level/questions'

function PrivateRoutes() {
    return (
        <BrowserRouter>
            <Route path="/home" exact={true} component={Home} />
            <Route path="/board" exact={true} component={Board} />
            <Route path="/level/:id" exact={true} component={Level} />
            <Route path="/start/:level/:id" exact={true} component={Question} />
            <Route path="/profile" exact={true} component={Profile} />
        </BrowserRouter>
    )
}

export default PrivateRoutes;