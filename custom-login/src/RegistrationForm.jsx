import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

export default function RegistrationForm() {
  const { oktaAuth, authState } = useOktaAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    async function checkAuthentication() {
      if (authState.idToken) {
        setSessionToken({ sessionToken: authState.idToken });
      }
    }
    checkAuthentication();
  }, []);

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        sessionToken,
      }),
    })
      .then(() => {
        oktaAuth
          .signIn({
            username: email,
            password,
          })
          .then((res) => {
            setSessionToken({
              sessionToken: res.sessionToken,
            });
          });
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }

  if (sessionToken) {
    oktaAuth.signInWithRedirect({ sessionToken });
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-element">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="form-element">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label id="firstName">First Name:</label>
        <input
          type="text"
          aria-labelledby="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div className="form-element">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div className="form-element">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <input type="submit" id="submit" value="Register" />
    </form>
  );
}
