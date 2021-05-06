import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";
import { Strategy } from "passport-bnet"
import passport from "passport"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);
// const BnetStrategy = Strategy;
// const strategyConfig = {
//   id: process.env.REACT_APP_CLIENT_ID,
//   secret: process.env.REACT_APP_CLIENT_SECRET
// };



// debugger
// // Use the BnetStrategy within Passport.
// passport.use(new BnetStrategy({
//   clientID: strategyConfig.id,
//   clientSecret: strategyConfig.secret,
//   callbackURL: "https://localhost:3000/oauth/battlenet/callback",
//   region: "us"
// }, function (accessToken, refreshToken, profile, done) {
//   return done(null, profile);
// }));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
