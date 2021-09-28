import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import validator from "validator";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { updateForm, formActions } from "../store/form-data-slice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import '../MediaQuery.css';
import PostAddIcon from '@material-ui/icons/PostAdd';

// Styles for the component
const useStyles = makeStyles((theme) => ({
    error: {
        maxWidth: 350,
        color: "red",
    },
    errorCard: {
        padding: 15,
        marginTop: 20,
    },
    textField: {
        width: 300,
        marginTop: 20,
        marginBottom: 20,
    },
    paperStyle: {
        paddingBottom: 40,
    },
}));

const Step1 = () => {
    const classes = useStyles();
    const [phoneNumber, setPhoneNumber] = useState("");
    const dispatch = useDispatch();
    const nextOperations = useSelector(
        (state) => state.formData.operations.update
    );
    const formData = useSelector((state) => state.formData.formData);

    useEffect(() => {
        // Set phone number to input when you come back from another step
        setPhoneNumber(formData.phoneNumber);
    }, [formData.phoneNumber]);

    // Handler function for name input
    const nameChangeHandler = (e) => {
        if (validator.isLength(e.target.value.trim(), { min: 3, max: 10 })) {
            dispatch(
                formActions.setOperations({
                    function: "update",
                    status: "Success",
                })
            );

            // Pass the data to the store
            dispatch(updateForm({ name: e.target.value.trim() }));
        } else {
            // Set a new error
            dispatch(
                formActions.setOperations({
                    function: "update",
                    status: "Pending",
                    error: "Name must be between 3 and 10 characters!",
                })
            );
        }
    };

    return (
        <>
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
                                Step 1
                            </Typography>

                        
                                <TextField
                                className={classes.textField}
                                label="name"
                                defaultValue={formData?.name}
                                variant="outlined"
                                type="text"
                                name="Name"
                                onChange={nameChangeHandler}
                                ></TextField>
                            
                            <br />

                            <PhoneInput
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(phone) => {
                                    dispatch(updateForm({ phoneNumber: phone }));
                                }}
                                country={"gr"}
                            />

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
        </>
    );
};

export default Step1;
