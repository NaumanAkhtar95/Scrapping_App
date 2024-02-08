import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider, colors, useTheme } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import { getData } from "./components/general";
import LoadingDiv from "./components/Shared/LoadingDiv";

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
  return (
    <>
      <LoadingDiv />
      <div className="app">
        <main className="content" style={{ height: '100vh', overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Box height={'90%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
              <h1>404 Not Found</h1>
            </Box>} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
