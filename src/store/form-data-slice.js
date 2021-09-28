import { createSlice } from '@reduxjs/toolkit';

//Form initial State 
const initialFormState = { 
    formData:{
        name: '',
        phoneNumber: '',
        email: '',
        dateBirth: '',

    },
    operations: {
        update:{
            status: "Failed",
            error: ""
        }
        
    }
}

//Form slice initialization 
const formSlice = createSlice({
    name: 'signupForm',
    initialState: initialFormState,
    reducers: {
        setFormData(state,action){
            if(action.payload?.name)
            state.formData.name = action.payload.name;
            if(action.payload?.phoneNumber)
            state.formData.phoneNumber = action.payload.phoneNumber;
            if(action.payload?.email)
            state.formData.email = action.payload.email;
            if(action.payload?.dateBirth)
            state.formData.dateBirth = action.payload.dateBirth;
            
        },
        setOperations(state,action){
            state.operations[action.payload.function] = {
                status : action.payload.status || '',
                error : action.payload.error || undefined
            };
        },
    }
});
export const formActions = formSlice.actions;


// Thunk 
export const updateForm = (updateFormData) =>{
    return (dispatch) => {

    
      // Here you can make and othe validations.
      // Mainly here is the correct space to make some fetch and validate the results
      dispatch(formActions.setOperations({
        function: 'update',
        status: 'Success'
    }));
    dispatch(formActions.setFormData(updateFormData));
    }
}


export default formSlice.reducer;