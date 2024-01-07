import { Box, Button, Divider, Grid, InputLabel, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { createContext, useContext } from "react";
import { tokens } from '../theme';
import Topbar from '../scenes/global/Topbar';
import { Formik } from 'formik';
import Header from '../components/Header';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { useUpdateUser } from './AuthContext';
import { axiosPostAuth, loginRequest } from '../components/general';
import { AlertInfo, useAlert } from '../components/Alerts/Alert';
import AppForm from '../components/AppForm/AppForm';


const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const navigate = useNavigate()
    const updateUser = useUpdateUser()
    const updateAlert = useAlert()

    useEffect(() => {
        // clearCacheData()
    })

    const handleFormSubmit = async (values: any) => {
        try {
            const result = await loginRequest(values)
            if (result.data.success) {
                updateUser({
                    ...result.data.user,
                    token: result.data.token,
                    isLoggedIn: true
                })
                navigate('/', { replace: true })
                window.location.reload();
            }
            else {
                const alertInfo: AlertInfo = {
                    message: result.data.response && result.data.response.data.error ? result.data.response.data.error : result.data.data.message ? result.data.data.message : result.data.message,
                    open: true,
                    severity: "error"
                }
                updateAlert(alertInfo)
            }
        }
        catch (err: any) {
            console.log(err)
            const alertInfo: AlertInfo = {
                message: err.response.data.error ? err.response.data.error : err.response.data.message ? err.response.data.message : err.message,
                open: true,
                severity: "error"
            }
            updateAlert(alertInfo)
        }
    };
    return (<>
        <Topbar />
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 70px)',
            background: colors.primary[400]
        }}>
            <Box className="box_shadow" sx={{
                borderRadius: '7px',
                background: colors.primary[400],
                padding: '15px',
                alignItems: 'center',
                textAlign: 'center',
                width: '60%'
            }}>

                <Header title="LOGIN" subtitle="Provide your Login Info" />
                <Divider sx={{ margin: '0px 0px 15px 0px' }} light />
                
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="email"
                                    label="EMAIL"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 2" }}
                                    InputLabelProps={{
                                        color: 'secondary'
                                    }}
                                    InputProps={{
                                        color: 'secondary'
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="PASSWORD"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 2" }}
                                    InputLabelProps={{
                                        color: 'secondary'
                                    }}
                                    InputProps={{
                                        color: 'secondary'
                                    }}
                                />
                            </Box>
                            <Divider sx={{ margin: '15px 0px 15px 0px' }} light />
                            <Grid container>
                                <Grid item xs={6} display="flex" justifyContent="start" mt="">
                                    <Typography variant='subtitle1'>Don't have an account <Link style={{ color: colors.secondary[400] }} to={'/register'}>Create One</Link></Typography>
                                </Grid>
                                <Grid item xs={6} display="flex" justifyContent="end" mt="">


                                    <Button type="submit" color="secondary" variant="contained">
                                        Login
                                    </Button>

                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Box>

        </Box>
    </>
    )
}

const checkoutSchema = yup.object().shape({
    email: yup.string().required("required"),
    password: yup.string().required("required"),
});
const initialValues = {
    email: "",
    password: "",
};




export default Login;
