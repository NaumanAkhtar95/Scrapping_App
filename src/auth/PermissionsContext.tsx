
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { PermissionModel } from "../components/Users/Roles/Models";

interface PermissionsProviderProps {
    children: React.ReactNode;
}

const PermissionsContext = createContext<PermissionModel[]>([]);

const UpdatePermissionsContext = createContext<Function>((permissions: any) => { })

export const useUpdatePermissions = () => {
    return useContext(UpdatePermissionsContext)
}

export const usePermissions = () => {
    return useContext(PermissionsContext)
}

const PermissionsProvider: React.FC<PermissionsProviderProps> = ({ children }) => {
    const [permissions, setPermissions] = useState<PermissionModel[]>([]);

    const updatePermissions = useCallback((permissions: PermissionModel[]) => {
        localStorage.setItem('permissions', JSON.stringify(permissions));
        setPermissions(permissions)
    }, []);

    return (
        <PermissionsContext.Provider value={permissions}>
            <UpdatePermissionsContext.Provider value={updatePermissions}>
                {children}
            </UpdatePermissionsContext.Provider>
        </PermissionsContext.Provider>
    );
};

export default PermissionsProvider