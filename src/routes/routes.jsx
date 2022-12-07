import React, { useContext } from 'react'

import PrivateRoutes from './private_routes'
import PublicRoutes from './public_routes'
import CommonRoutes from './common_routes'
import AuthContext from '../context/auth';

function Routes() {
    const { signed } = useContext(AuthContext);
    return (
        <>
            <CommonRoutes/>
            <PrivateRoutes/>
            <PublicRoutes/>
        </>
    )
}

export default Routes