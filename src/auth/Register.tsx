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
import { axiosPostAuth } from '../components/general';
import { RegisterModel } from './Models';
import { AlertInfo, useAlert } from "../components/Alerts/Alert";
import { VisuallyHiddenInput } from '../components/Shared/FileUpload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Register = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:800px)");
    const navigate = useNavigate()
    const updateUser = useUpdateUser()
    const updateAlert = useAlert()

    const handleFormSubmit = async (values: RegisterModel) => {
        // console.log(values)
        if (values.password !== values.confirmPassword) {
            const alertInfo: AlertInfo = {
                message: "Both passwords should be same",
                open: true,
                severity: "error"
            }
            updateAlert(alertInfo)
        }
        else{
            try{
                const result = await axiosPostAuth('users/create_superadmin', values)
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
                        message: result.data.response.data && result.data.response.data.error ? result.data.response.data.error : result.data.response.data.message ? result.data.response.data.message : result.data.message,
                        open: true,
                        severity: "error"
                    }
                    updateAlert(alertInfo)
                }
            }
            catch(err: any){
                console.log(err)
                const alertInfo: AlertInfo = {
                    message: err.response.data.error ? err.response.data.error : err.response.data.message ? err.response.data.message : err.message,
                    open: true,
                    severity: "error"
                }
                updateAlert(alertInfo)
            }
        }
    }

    return (<>
        <Topbar />
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
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

                <Header title="REGISTER" subtitle="Provide Your Info Here" />
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
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}><Grid container rowGap={1} columnSpacing={1}>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="FIRST NAME"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fname}
                                    name="fname"
                                    error={!!touched.fname && !!errors.fname}
                                    helperText={touched.fname && errors.fname}
                                    sx={{ gridColumn: "span 2" }}
                                    InputLabelProps={{
                                        color: 'secondary'
                                    }}
                                    InputProps={{
                                        color: 'secondary'
                                    }}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="LAST NAME"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lname}
                                    name="lname"
                                    error={!!touched.lname && !!errors.lname}
                                    helperText={touched.lname && errors.lname}
                                    sx={{ gridColumn: "span 2" }}
                                    InputLabelProps={{
                                        color: 'secondary'
                                    }}
                                    InputProps={{
                                        color: 'secondary'
                                    }}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
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
                            </Grid>
                            <Grid item sm={6} xs={12}>
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
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="CONFIRM PASSWORD"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.confirmPassword}
                                    name="confirmPassword"
                                    error={!!touched.confirmPassword && !!errors.confirmPassword}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                    sx={{ gridColumn: "span 2" }}
                                    InputLabelProps={{
                                        color: 'secondary'
                                    }}
                                    InputProps={{
                                        color: 'secondary'
                                    }}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="date"
                                    label="DATE OF BIRTH"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.dob}
                                    name="dob"
                                    error={!!touched.dob && !!errors.dob}
                                    // helperText={touched.dateOfBirth && errors.dateOfBirth}
                                    sx={{ gridColumn: "span 2" }}
                                    InputLabelProps={{
                                        color: 'secondary'
                                    }}
                                    InputProps={{
                                        color: 'secondary'
                                    }}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="CONTACT"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.contact}
                                    name="contact"
                                    error={!!touched.contact && !!errors.contact}
                                    // helperText={touched.dateOfBirth && errors.dateOfBirth}
                                    sx={{ gridColumn: "span 2" }}
                                    InputLabelProps={{
                                        color: 'secondary'
                                    }}
                                    InputProps={{
                                        color: 'secondary'
                                    }}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <Box display="flex" alignItems="center">
                                    <TextField
                                        fullWidth
                                        name="img_address"
                                        variant="filled"
                                        type="text"
                                        label="File Name"
                                        value={values.img_address}
                                        InputLabelProps={{
                                            color: 'secondary'
                                        }}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={!!touched.img_address && !!errors.img_address}
                                        helperText={touched.img_address && errors.img_address && "File Name is required"}
                                        sx={{ gridColumn: "span 2" }}
                                        autoComplete='off'
                                    />
                                    <Button component="label" variant="outlined" color='secondary' startIcon={<CloudUploadIcon />}
                                        sx={{ width: '150px', height: '54px', padding: 0, mt: '0px', ml: '5px' }}
                                    >
                                        Upload file
                                        <VisuallyHiddenInput name='file' type="file" onChange={(event) => {
                                            if (event.target.files && event.target.files.length > 0) {
                                                setFieldValue('img_address', event.target.files[0].name);
                                                setFieldValue('file', event.target.files[0]);
                                            }
                                        }} />
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>


                            <Divider sx={{ margin: '15px 0px 15px 0px' }} light />
                            <Grid container>
                                <Grid item xs={6} display="flex" justifyContent="start" mt="">
                                    <Typography variant='subtitle1'>Already have an account <Link style={{ color: colors.secondary[400] }} to={'/login'}>Login</Link></Typography>
                                </Grid>
                                <Grid item xs={6} display="flex" justifyContent="end" mt="">


                                    <Button type="submit" color="secondary" variant="contained">
                                        Register
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
    fname: yup.string().required("required"),
    lname: yup.string().required("required"),
    email: yup.string().required("required"),
    password: yup.string().required("required"),
    confirmPassword: yup.string().required("required"),
    dob: yup.string().required("required"),
});

const initialValues: RegisterModel = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: new Date(),
    contact: "",
    img_address: ""
};


export default Register;
