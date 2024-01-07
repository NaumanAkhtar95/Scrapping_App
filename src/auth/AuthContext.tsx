
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<any>({
    id: '',
    fname: "",
    lname: "",
    email: '',
    isLoggedIn: false,
    token: ''
});

const UpdateUserContext = createContext<Function>((user: any) => { })

export const useUpdateUser = () => {
    return useContext(UpdateUserContext)
}

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>({
        id: '',
        email: '',
        firstname: "",
        lastname: "",
        isLoggedIn: false,
        token: ''
    });

    const updateUser = useCallback((user: any) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user)
    }, []);

    return (
        <AuthContext.Provider value={user}>
            <UpdateUserContext.Provider value={updateUser}>
                {children}
            </UpdateUserContext.Provider>
        </AuthContext.Provider>
    );
};

export default AuthProvider