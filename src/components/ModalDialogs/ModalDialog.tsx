import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Divider, IconButton, Typography, useTheme } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { MenuItem } from 'react-pro-sidebar';
import { tokens } from '../../theme';
import { Link } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

interface DialogLocalProps {
    children: React.ReactNode;
    heading: string
    buttonText: string
    buttonType: 'button' | 'link' | 'icon_button' | 'blue-big-button' | 'table-button'
    fullScreen?: boolean
    icon?: React.ReactNode
    onSave?: () => void
    buttonColor?: string
    title?: string
}

export default function CustomizedDialogs(props: DialogLocalProps) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {props.buttonType == 'table-button' ?
                <Button sx={{ width: '25px', height: '25px', minWidth: '25px', mr: '5px', padding: 0 }} title={props.title}
                    color={props.buttonColor as any}
                    variant="contained"
                    component="label"
                    onClick={handleClickOpen}
                >
                    {props.icon ? props.icon : ""}
                </Button>
                :
                props.buttonType == 'blue-big-button' ?
                    <Button
                        onClick={handleClickOpen}
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        title={props.title}
                    >
                        {props.icon ? props.icon : ""}
                        {props.buttonText}
                    </Button>
                    :
                    props.buttonType == 'button' ?
                        <Button variant="outlined" color='secondary' onClick={handleClickOpen} startIcon={props.icon ? props.icon : ""} title={props.title}>
                            {/* {props.icon ? props.icon : ""} */}
                            {props.buttonText}
                        </Button>
                        : <>
                            {props.buttonType == 'icon_button' ?
                                <IconButton sx={{ width: '35px', height: '35px', mr: '5px' }}
                                    color={colors.grey[300]}
                                    component="label"
                                    onClick={() => {
                                        handleClickOpen()
                                        setTimeout(() => {
                                            document.getElementById('set_values_btn')?.click()
                                        });
                                    }}
                                >
                                    {props.icon}
                                </IconButton>
                                :
                                <MenuItem
                                    style={{
                                        color: colors.grey[100],
                                    }}
                                    onClick={handleClickOpen}
                                    icon={props.icon ? props.icon : ''}
                                >
                                    <Typography>{props.buttonText}</Typography>
                                    <Link to='#' />
                                </MenuItem>
                            }
                        </>

            }
            <BootstrapDialog
                sx={{ //You can copy the code below in your theme

                    '& .MuiPaper-root': {
                        background: colors.primary[400]
                    },
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'transparent' // Try to remove this to see the result
                    }
                }}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                fullWidth
                fullScreen={props.fullScreen}
                maxWidth={'md'}
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.heading}
                </BootstrapDialogTitle>
                <Divider light />
                <DialogContent sx={{ minWidth: '300px' }} >
                    {props.children}
                </DialogContent>
                {props.onSave &&
                    <>
                        <Divider light />
                        <DialogActions>
                            <Box display="flex" justifyContent="end">
                                <Button autoFocus onClick={props.onSave} color="secondary" variant="contained" >
                                    Save Changes
                                </Button>
                            </Box>
                        </DialogActions>
                    </>
                }
            </BootstrapDialog>
        </>
    );
}