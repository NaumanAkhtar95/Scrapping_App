
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateUser } from './AuthContext';


const Logout = () => {
    const navigate = useNavigate()
    const updateUser = useUpdateUser()
    useEffect(() => {
        updateUser({
            email: "",
            firstname: "",
            lastname: "",
            token: "",
            isLoggedIn: false
        })
        localStorage.removeItem("selected_business_id")
        navigate('/login', { replace: true })
    }, [])

    return (
        <>

        </>
    )
}

export default Logout;
