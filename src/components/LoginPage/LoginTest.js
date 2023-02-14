import React from 'react';
import { useLocation } from 'react-router-dom';

import "./Login.css";

const LoginPage  = () => {
  const modalSwitcher = () => {
    const { path }  = useLocation();
    path.includes("register") ?

  }
  
  return (
    <section class="user">
      <div class="user_options-container">
        <div class="user_options-text">
          <div class="user_options-unregistered">
            <h2 class="user_unregistered-title">Don't have an account?</h2>
            <p class="user_unregistered-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
              sunt expedita! Reiciendis ratione soluta tempora numquam!
              Consequuntur.
            </p>
            <button class="user_unregistered-signup" id="signup-button">
              Sign up
            </button>
          </div>

          <div class="user_options-registered">
            <h2 class="user_registered-title">Have an account?</h2>
            <p class="user_registered-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis in
              laboriosam adipisci. Facilis laudantium adipisci illo!
            </p>
            <button class="user_registered-login" id="login-button">
              Login
            </button>
          </div>
        </div>

        <div class="user_options-forms" id="user_options-forms">
          <div class="user_forms-login">
            <h2 class="forms_title">Login</h2>
            <form class="forms_form">
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <input type="text" class="forms_field-input" required />
                  <label class="forms_field-label">Email</label>
                </div>
                <div class="forms_field">
                  <input type="password" class="forms_field-input" required />
                  <label class="forms_field-label">Password</label>
                </div>
              </fieldset>
              <div class="forms_buttons">
                <button type="button" class="forms_buttons-forgot">
                  Forgot password?
                </button>
                <input
                  type="submit"
                  value="Log In"
                  class="forms_buttons-action"
                />
              </div>
            </form>
          </div>
          <div class="user_forms-signup">
            <h2 class="forms_title">Sign Up</h2>
            <form class="forms_form">
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <input type="text" class="forms_field-input" required />
                  <label class="forms_field-label"> Full Name </label>
                </div>
                <div class="forms_field">
                  <input type="text" class="forms_field-input" required />
                  <label class="forms_field-label">Email</label>
                </div>
                <div class="forms_field">
                  <input type="password" class="forms_field-input" required />
                  <label class="forms_field-label">Password</label>
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
