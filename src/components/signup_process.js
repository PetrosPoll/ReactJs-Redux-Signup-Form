import React, { useState, useEffect, useRef } from "react";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import "../App.css";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../store/form-data-slice";

function App() {


  const dispatch = useDispatch();

  //Using useRef because the progress bar inside the function couldn't understand the changes on the state and I wasn't able to make some validations
  const formData = useSelector((state) => state.formData.formData);
  const curFormData = useRef(formData);
  curFormData.current = formData;

  const nextOperations = useSelector(
    (state) => state.formData.operations.update
  );
  const curOperations = useRef(nextOperations);
  curOperations.current = nextOperations;

  const [nextStep, setNextStep] = useState("Failed");
  const curNextStep = useRef(nextStep);
  curNextStep.current = nextStep;


  useEffect(() => {
    // Depends the status of the operations change the value of a variable.
    if (nextOperations.status === "Success") {
      setNextStep("Success");
    } else if (nextOperations.status === "Pending") {
      setNextStep("Pending");
    } else if (nextOperations.status === "Failed") {
      setNextStep("Failed");
    }

    // Whenever dispatch called, and variables nextStep and status of iperations has change the component re-render
  }, [nextStep, nextOperations.status, dispatch]);

  const validate1 = () => {

    //Case 1
    if ( (curNextStep.current === "Failed" && curOperations.current.error === "") || (curNextStep.current === "Success" && curFormData.current.name === "")) {
      dispatch(
        formActions.setOperations({
          function: "update",
          status: "Failed",
          error: "Please fill in the fields",
        })
      );
      return false;
    }
    
    //Case 2
    if ( curNextStep.current === "Failed" && curOperations.current.error === "") {
      return false;
    }
    
    //Case 3
    if (curNextStep.current === "Pending" && curOperations.current.error !== ""){

      return false;
    }

    //Case 4
    if(curNextStep.current === "Success"){
    // Accross all over the world,  the for a phone number length is min 4 and max 15 (without country code)
    if(curFormData.current.phoneNumber.length < 7 || curFormData.current.phoneNumber.length > 15) {
      console.log("Inside check number");
      dispatch(
        formActions.setOperations({
          function: "update",
          status: "Failed",
          error:
            "A phone number can not be less than 7 and more than 15 numbers",
        })
      );
      return false;
    }
  }

    // Case win
    return true;
  };


const validate2  = () => {
console.log("Start valid 2")

  //Case 1
  if ( (curNextStep.current === "Failed" && curOperations.current.error === "") || curFormData.current.email === "") {
    dispatch(
      formActions.setOperations({
        function: "update",
        status: "Failed",
        error: "Please fill in the fields",
      })
    );
    return false;
  }

  //Case 2
  if ( (curNextStep.current === "Failed" && curOperations.current.error !== "")) {
    return false;
  }



const today = new Date();
const years = today.getFullYear() - curFormData.current.dateBirth.substr(4);
console.log(curFormData.current.dateBirth);

if(curFormData.current.dateBirth === "NaN NaN NaN"){
  dispatch(
    formActions.setOperations({
      function: "update",
      status: "Failed",
      error:
        "Number is NAN",
    }));
    return false;
}

//Case 3
if(curFormData.current.dateBirth.length < 8 ){
  dispatch(
    formActions.setOperations({
      function: "update",
      status: "Failed",
      error:
        "Please fill the birthday field correctly",
    }));
    return false;
}

//Case 4
if(years < 18){
  dispatch(
    formActions.setOperations({
      function: "update",
      status: "Failed",
      error:
        "You must be minimum 18 years old",
    }));
    return false;
}

//Case win
if(curOperations.current.status === "Success" && years >= 18)
return true;
  

  return false;
}


  return (
    
      <StepProgressBar
        startingStep={0}
        wrapperClass="progress-wrapper-custom"
        onSubmit={() => window.location.reload(false)} // Refresh the page when you complete the form.
        submitBtnName="Submit"
        previousBtnName="Back"
        nextBtnName="Next"
        steps={[
          {
            label: "Step 1",
            name: "step 1",
            content: <Step1 />,
            validator: validate1,
          },
          {
            label: "Step 2",
            name: "step 2",
            content: <Step2 />,
            validator: validate2,
          },
          {
            label: "Step 3",
            name: "step 3",
            content: <Step3 />,
            validator: () => true,
          },
          {
            label: "Step 4",
            name: "step 4",
            content: <Step4 />,
          },
        ]}
      />

  );
}

export default App;
