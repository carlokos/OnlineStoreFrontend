import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';


const ProtectedRoute = ({
    activate,
    needAdmin,
    redirectPath= '/login'
}) => {

    const accessToken = localStorage.getItem('token');
    const roles =  localStorage.getItem('roles');

    console.log(accessToken);
    
    if (!accessToken) {
        return <Navigate to={redirectPath} replace />
    }

    if(needAdmin){
        if(!roles || !roles.includes(1)){
            return <Navigate to={'/'} replace/>
        }
    }

    return <Outlet/>

}

export default ProtectedRoute;