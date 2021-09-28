import { configureStore } from "@reduxjs/toolkit";
import dataFormReducer from './form-data-slice';


const store = configureStore({
    reducer: {
        formData: dataFormReducer
    }
});

export default store;