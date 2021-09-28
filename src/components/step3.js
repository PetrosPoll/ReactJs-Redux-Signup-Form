import React from 'react';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector} from "react-redux";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';


// Styles for the component
const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: 50,
        paddingRight: 50,
        padding: 20,
        marginTop: 30,
        paddingBottom: 40

    },
    error: {
        maxWidth: 150,
        color: "red"
    },
    errorCard: {
        paddingTop: 15,
        marginTop: 20
    },
    textField: {
        width: 300,
        marginTop: 20
    },
    birthday: {
        width: 300,
        marginTop: 20
    }
}));


const Step3 = () => {
    const classes = useStyles();
    const formData = useSelector((state) => state.formData.formData);


    return(
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
        <Paper className={classes.root}  elevation={8} >
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
                <CheckCircleOutlineIcon />
            
            <Typography component="h1" variant="h5">
            Details for confirmation
            </Typography>
        
            <TextField className={classes.textField} label="name" defaultValue={formData?.name} variant="outlined"  type="text" name="Name" disabled={true} ></TextField><br />
            <PhoneInput onclick={false} disabled placeholder="Enter phone number"  value={formData?.phoneNumber}  country={'gr'}/>
            <TextField className={classes.textField} label="email" defaultValue={formData?.email} variant="outlined"  type="text" name="Email" disabled={true} ></TextField><br />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                readOnly
                disabled={true}
                    label="Basic example"
                    value={formData?.dateBirth}
                    renderInput={(params) => <TextField disabled={true} className={classes.birthday} variant="outlined" {...params} />}
                />
            </LocalizationProvider>
        </Grid>

       
    </Paper>
    </Grid>
    );
}

export default Step3;