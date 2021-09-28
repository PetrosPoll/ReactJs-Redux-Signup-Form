import React from 'react';
import { Checkmark } from 'react-checkmark';
import { Grid } from '@material-ui/core';

const Step4 = () => {

    return(
        <div>
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center">
                <Checkmark size='xxLarge' />
                <h1>Congratulations!</h1>
                <p> You completed correctly the signup form! </p>
                </Grid>
        </div>
    );
}

export default Step4;