import React, { useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { userRegister, userLogin } from '../../api/index';



import "./Login.css";

const LoginPage  = ({setIsLoggedIn, setUser, notifySignup, notifyLogin, userDATA, setUserDATA}) => {
  // const modalSwitcher = () => {
  //   const { path }  = useLocation();
  // }
  //   path.includes("register") ?

  // }
  const history = useHistory();
  const userForms = document.getElementById('user_options-forms');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMsgText, setErrMsgText] = useState("");
  // const [msgColor, setMsgColor] = useState("");


  // const onFormSubmit = async (e) => {
  //   e.preventDefault();

  // }


  const LoginUser = async (e, name, pass) => {
    e.preventDefault();
    setErrMsgText("")
    try {
      const res = await userLogin(name, pass);
      console.log(res);
      setErrMsgText("Welcome back " + name);
      setIsLoggedIn(true);
      setUser(res.user);
      setUserDATA(res.user)
      notifyLogin();
      setTimeout(function() {
        history.push("/");
      }, 1200);
    } catch (err) {
      setErrMsgText('User does not exist, ' + err);
      console.log(err);
      return false; 
    }
  }
  
  const SignupUser = async (e, name, pass, mail) => {
    console.log(repassword, password)
    e.preventDefault();
    setErrMsgText("")
    if (repassword === password) {    
      try {
        const res = await userRegister(name, pass, mail);
        console.log(res);
        setErrMsgText("Thank you for signing up.");
        notifySignup();
        setIsLoggedIn(true);
        setUserDATA(res.user)
        setTimeout(function() {
          history.push("/");
        }, 2000);
      } catch (err) {
        setErrMsgText("" + err);
        console.log(err);
      }
    } else {   
      setErrMsgText("Minimum 6 characters or Passwords Do not Match.");
      e.preventDefault();
    }
  }

  // const colorChange = (color) => {
  //   document.getElementById("errMsg").style.color = color;
  // }
  const rmBounceR = () => {
    setErrMsgText("");
    userForms.classList.remove('bounceRight');
    userForms.classList.add('bounceLeft');
  }
  const rmBounceL = () => {
    setErrMsgText("");
    userForms.classList.remove('bounceLeft');
    userForms.classList.add('bounceRight');
  }

  return (
    <section class="user">
      <div class="user_options-container">
        <div class="user_options-text">
          <div class="user_options-unregistered">
            <h2 class="user_unregistered-title">Don't have a CardEX account?</h2>
            <p class="user_unregistered-text">
              Join CardEx now and start trading today!
            </p>
            <button class="user_unregistered-signup" id="signup-button"
              onClick={rmBounceR}
            >
              Sign up
            </button>
          </div>

          <div class="user_options-registered">
            <h2 class="user_registered-title">Have a CardEX account?</h2>
            <p class="user_registered-text">
              Already have an Account? Login Here.
            </p>
            <button 
              class="user_registered-login" 
              id="login-button"
              onClick={rmBounceL}
            >
              Login
            </button>
          </div>
        </div>

        <div class="user_options-forms" id="user_options-forms">
          <div class="user_forms-login">
            <h2 class="forms_title">Login</h2>
            <div id="errMsg" style={{color: '#ff0808'}} > {errMsgText} </div> 

            {/* The Login Form */}
            <form class="forms_form" onSubmit={(e) => {LoginUser( e, username, password)}}>
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <input type="text" class="forms_field-input" required 
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <label class="forms_field-label">Username</label>
                </div>
                <div class="forms_field">
                  <input type="password" class="forms_field-input" minlength="6" required 
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                  <label class="forms_field-label">Password</label>
                </div>
              </fieldset>
              <div class="forms_buttons">
                <button type="button" class="forms_buttons-forgot">
                  Forgot password?
                </button>
                <input
                  type="submit"
                  value="Login"
                  class="forms_buttons-action"                 
                />
              </div>
            </form>
          </div>
          <div class="user_forms-signup">
            <h2 class="forms_title">Sign Up</h2>
            <div id="errMsg" style={{color: '#ff0808'}}> {errMsgText} </div>

            {/* The Sign Up Form */}
            <form class="forms_form" onSubmit={(event) => {SignupUser( event, username, password, email)}}>
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <input type="text" class="forms_field-input" required 
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }} 
                  />
                  <label class="forms_field-label"> Username </label>
                </div>
                <div class="forms_field">
                  <input type="text" class="forms_field-input" required 
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }} 
                  />
                  <label class="forms_field-label"> Email </label>
                </div>
                <div class="forms_field">
                  <input type="password" class="forms_field-input" required 
                    onChange={(event) => {
                      setPassword(event.target.value);                     
                    }} 
                  />
                  <label class="forms_field-label">Password</label>
                </div>
                <div class="forms_field">
                  <input type="password" class="forms_field-input" required
                    onChange={(e) => {
                      setRepassword(e.target.value);
                    }}
                  />
                  <label class="forms_field-label">Confirm Password</label>
                </div>
              </fieldset>
              <div class="forms_buttons">
                <input
                  type="submit"
                  value="Sign up"
                  class="forms_buttons-action"                 
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;