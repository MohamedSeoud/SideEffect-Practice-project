import { PASSWORDINPUT, USERINPUT } from "./Types";

const LoginReducre = (state,action) => {

switch(action.type){
    case USERINPUT:
        return {value:action.value,isValid:action.value.includes('@')};
    case PASSWORDINPUT:
        return {value:action.value,isValid: +action.value>6}
    default:
        return{value:"",isValid:""}
    }
}
export default LoginReducre;