import React, { useContext, useEffect, useReducer, useState } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { INPUTBLUR, PASSWORDBLUR, PASSWORDINPUT, USERINPUT } from '../ReduxComponent/Types';
import AuthContext from '../../Context/AuthContext';

const LoginReducre = (state,action) => {

  switch(action.type){
      case USERINPUT:
          return {value:action.value,isValid:action.value.includes('@')};

      case INPUTBLUR:
          return {value:state.value,isValid:state.value.includes('@')};
  
      case PASSWORDINPUT:
          return {value:action.value,isValid: + action.value.trim().length>6}
      case PASSWORDBLUR:
          return {value:state.value,isValid: +state.value.trim().length>6}
  
      default:
       
      return{value:'', isValid:false}
      }
    }



const Login = (props) => {
  const ctx = useContext(AuthContext);

  const [emailState,emailDispatch] = useReducer(LoginReducre,{
    value:'',
    isValid:null
  });
  const [passwordState, DispatchPassword] = useReducer(LoginReducre,{
    value:'',
    isValid:null
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const {isValid:nameValid} = emailState;
  const {isValid:passValid} = passwordState;


  useEffect(()=>{
      const Identifier = setTimeout(()=>{
        console.log('moahmed')
        setFormIsValid( emailState.value.includes('@') && passwordState.value.trim().length > 6)
      },500)
    return ()=>{
      clearTimeout(Identifier);
    }

  },[nameValid,passValid])


  const emailChangeHandler = (event) => {
    emailDispatch({type:USERINPUT,value:event.target.value});
  };

  const passwordChangeHandler = (event) => {
    DispatchPassword({type:PASSWORDINPUT,value:event.target.value})
  };


  const validatePasswordHandler = () => {
    DispatchPassword({type:PASSWORDBLUR})
  };
  const validateEmailHandler = () =>{
    emailDispatch({type:INPUTBLUR})

  }

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}

          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit"
           className={classes.btn} 
           disabled={!formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
