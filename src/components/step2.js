import React, {useState, useEffect} from 'react';
import PostAddIcon from '@material-ui/icons/PostAdd';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import validator from 'validator';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import {useDispatch, useSelector} from "react-redux";
import {updateForm, formActions} from "../store/form-data-slice";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import '../MediaQuery.css';

// Styles for the component
const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
        marginTop: 30,

    },
    error: {
        maxWidth: 350,
        color: "red"
    },
    errorCard: {
        padding: 15,
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


const Step2 = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const nextOperations = useSelector((state) =>state.formData.operations.update);
    const formData = useSelector((state) => state.formData.formData);
    const [birthday, setBirthday] = useState(new Date());


    useEffect(() => {

        
       if(formData.dateBirth) 
       setBirthday(formData.dateBirth)

    },[birthday, formData.dateBirth]);


    // Handler function for email input
    const emailChangeHandler = (e) => {
        // Validate and trim and change the operations
        if(validator.isEmail(e.target.value.trim())){
            dispatch(formActions.setOperations({
                function: 'update',
                status: "Success",
                error: ""
            }));
            // Pass the data to the store
            dispatch(updateForm({email: e.target.value.trim()}));
        }else{
            // Set a new error 
            dispatch(formActions.setOperations({
                function: 'update',
                status: "Failed",
                error: "Invalid email"
            }))
        }
    }


    const birthdayHandleChange = (e) => {
            setBirthday(e);
            if(e !== null){
                const newFormatDate = e.getUTCMonth() +1 + " " + e.getUTCDate() + " " + e.getUTCFullYear();
                dispatch(updateForm({dateBirth: newFormatDate}));
            }
      };



    return(
        <Box sx={{ flexGrow: 1, px: 3 }}>
        <Paper
            id="paperStyle"
            className={classes.paperStyle}
            sx={{ maxWidth: 500, my: 1, mx: "auto", p: 2 }}
        >
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                wrap="wrap"
                spacing={2}
            >
                <Grid  item xs>
                    <Typography
                        style={{ textAlign: "center" }}
                        component="div"
                        variant="h5"
                    >
                        <PostAddIcon /> <br />
                        Step 2
                    </Typography>

                
                    <TextField className={classes.textField} label="email" defaultValue={formData?.email} variant="outlined"  type="text" name="Email" onChange={emailChangeHandler} ></TextField><br />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            AutoClose
                            label="Birthday date"
                            value={birthday}
                            onChange={birthdayHandleChange}
                            renderInput={(params) => <TextField className={classes.birthday} variant="outlined" {...params} />}
                        />
                    </LocalizationProvider>

                </Grid>
            </Grid>
        </Paper>

        {nextOperations.error && (
            <Paper
                sx={{ maxWidth: 500, my: 1, mx: "auto", p: 2 }}
                className={classes.errorCard}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography
                            component="div"
                            paragraph={true}
                            className={classes.error}
                            variant="body1"
                        >
                            <ErrorOutlineOutlinedIcon />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            component="div"
                            noWrap={false}
                            paragraph={true}
                            className={classes.error}
                            variant="body1"
                        >
                            {nextOperations.error}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        )}
    </Box>
    );
}

export default Step2;
