const { DISPLAY_ALERT, CLEAR_ALERT } = require("../constants/alert");

const initialState ={
    showAlert:false,
    alertText:"",
    alertType:"",

  }

 export const displayAlert=()=>{
    dispatch({
        type:DISPLAY_ALERT
    });
    clearAlert();
  };
const clearAlert = ()=>{
    setTimeout(()=>{
        dispatch({
            type:CLEAR_ALERT,
        })
    },3000);
};