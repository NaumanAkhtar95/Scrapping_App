import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider, colors, useTheme } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "./theme";
import { useAuth, useUpdateUser } from "./auth/AuthContext";
import { SidebarOptionModel } from "./components/Menus/SidebarModels";
import { AlertInfo, useAlert } from "./components/Alerts/Alert";
import SubscriptionPlans from "./components/SubscriptionPlans";
import Dashboard from "./scenes/dashboard";
import Logout from "./auth/Logout";
import { getData } from "./components/general";
import LoadingDiv from "./components/Shared/LoadingDiv";
import Businesses from "./components/Business/Businesses";
import { Filters } from "./components/general_models";
import { PermissionModel } from "./components/Users/Roles/Models";
import { usePermissions, useUpdatePermissions } from "./auth/PermissionsContext";

const routeMap: Record<string, string> = {
  login: "./auth/Login",
  register: "./auth/Register",
  inventory: "./components/Inventory",
  parties: "./components/Parties",
  purchase_invoices: "./components/Purchase/Invoice",
  users: "./components/Users",
  roles: "./components/Users/Roles",
  permissions: "./components/Users/Permissions",
};

// Define a function that returns a component wrapped in Suspense
const AsyncComponent: React.FC<{ componentName: any, props?: any }> = ({ componentName, props }) => {
  const comp = routeMap[componentName]
  const Component = lazy(() => import(comp));
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Suspense fallback={
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 70px)',
        background: colors.primary[500],
        marginTop: "20px"
      }}>
        <Box
          // className="box_shadow" 
          sx={{
            borderRadius: '7px',
            background: colors.primary[500],
            padding: '15px',
            alignItems: 'center',
            textAlign: 'center',
            width: '95%'
          }}>
          <h2>Please Wait...</h2>
          <div className="loader"></div>
        </Box>
      </Box>
    }>
      {/* {props ? <Component props={...props} /> : <Component />} */}
    </Suspense>
  );
};

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
            <LoadingDiv />
            <div className="app">
              <main className="content" style={{ height: '100vh', overflow: 'auto', background: colors.primary[500] }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="*" element={<Box height={'90%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <h1>404 Not Found</h1>
                  </Box>} />
                </Routes>
              </main>
            </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
