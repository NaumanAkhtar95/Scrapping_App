import React from 'react'
import { Formik } from 'formik';
import { Box, Button, Divider, Grid, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../../theme';
import * as yup from "yup";

interface formfield {
    name: string,
    type: string,
    placeholder:string,
    sm: number,
    xs: number
}

interface Prop {
    formFields: formfield[];
    handleFormSubmit: () => void;
}

function AppForm({ formFields, handleFormSubmit }: Prop) {

    const isNonMobile = useMediaQuery("(min-width:800px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const initialValues: any = {};
    formFields.forEach((field: any) => {
        initialValues[field.name] = "";
    });

    const checkoutSchema = yup.object().shape({
        email: yup.string().required("required"),
        password: yup.string().required("required"),
    });

    return (
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
                    
                    <Grid container rowGap={1} columnSpacing={1}>
                    {formFields.map((field:formfield) => (
                            <Grid item sm={field.sm} xs={field.xs}>
                                <TextField
                                    fullWidth
                                    name={field.name?.toLocaleLowerCase()}
                                    variant="standard"
                                    type="text"
                                    label={field.placeholder}
                                    value={values[field.name]}
                                    InputLabelProps={{
                                        color: 'secondary'
                                    }}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={!!touched[field.name] && !!errors[field.name]}
                                    helperText={touched[field.name]&& errors[field.name] && `${field.name} is required`}
                                    sx={{ gridColumn: "span 2" }}
                                    autoComplete='off'
                                />
                            </Grid>
                    ))}
                    </Grid>

                </form>
            )}
        </Formik>
    )
}

export default AppForm