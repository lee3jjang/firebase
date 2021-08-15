import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if(newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch(error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount(prev => !prev);
  const onSocialClick = async (event) => {
    const {target: {name}} = event;
    let provider;
    if(name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
      console.log(provider);
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
  }

  return (
      <div>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} name="email" type="email" placeholder="Email" required value={email} />
          <input onChange={onChange} name="password" type="password" placeholder="Password" required value={password} />
          <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
          {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Create Account" : "Sign In"}</span>
        <div>
          <button name="google" onClick={onSocialClick}>Continue with Google</button>
          <button name="github" onClick={onSocialClick}>Continue with Github</button>
        </div>
      </div>
  );
}

export default Auth;