import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import firebase from "firebase/app";
import "firebase/auth";


export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "/api/userprofile";

  const userProfile = sessionStorage.getItem("userProfile");

  const activeUser = JSON.parse(userProfile);

  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  const [allUserProfiles, setAllUserProfiles] = useState([]);
  const [singleUserProfile, setSingleUserProfile] = useState({ primaryFocus: {} });





  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);



  const login = (email, pw) => {

    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        debugger
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
        sessionStorage.setItem("userProfileId", JSON.stringify(userProfile.id));
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
      });
  };

  const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        sessionStorage.setItem("userProfileId", JSON.stringify(savedUserProfile.id))
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();
  const getBlizzToken = async () => {

    const basicAuth = btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`);
    const grantType = sessionStorage.getItem("accessCode")
    const resp = await fetch(`https://us.battle.net/oauth/token`, {

      method: "POST",
      body: 'developer_client_id=' + process.env.REACT_APP_CLIENT_SECRET + '&redirect_uri=http://localhost:3000/home' + '&grant_type=authorization_code' + '&code=' + grantType,

      headers: {
        authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'


      },

    })

    const token = await resp.json();
    return token


  };

  const test = async () => {



    const response = await fetch(`https://render-us.worldofwarcraft.com/character/proudmoore/146/231512978-avatar.jpg?alt=/shadow/avatar/2-1.jpg`, {

      method: "GET",
      mode: "no-cors",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,


      },

    })

    // const creature = await response.json()

    return response


  };
  const getUserProfile = (firebaseUserId) => {

    return getToken().then((token) =>

      fetch(`${apiUrl}/${firebaseUserId}`, {

        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => {

        return resp.json()
      }));
  };

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      }).then(resp => resp.json()));
  };

  const getAllUserProfiles = () => {
    return getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()))
      .then((resp) => setAllUserProfiles(resp));
  };

  const getUserProfileById = (userId) => {

    return getToken().then((token) =>
      fetch(`${apiUrl}/details/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()))
      .then((resp) => setSingleUserProfile(resp));;
  };

  const editUserProfile = (user) => {

    return getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
      }).then(() =>
        sessionStorage.setItem("userProfile", JSON.stringify(user)
        )));
  };

  const deleteUserProfile = (userId) => {

    return getToken().then((token) =>
      fetch(`${apiUrl}/delete/${userId}`, {
        method: "PUT",
        headers: {

          Authorization: `Bearer ${token}`
        }
      }));;
  };




  return (
    <UserProfileContext.Provider value={{ isLoggedIn, getBlizzToken, login, test, logout, register, getToken, userProfile, activeUser, getAllUserProfiles, allUserProfiles, getUserProfileById, singleUserProfile, editUserProfile, deleteUserProfile }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </UserProfileContext.Provider>
  );
}