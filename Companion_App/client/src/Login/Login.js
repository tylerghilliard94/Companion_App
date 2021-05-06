import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input, Card, Row } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../Providers/UserProfileProvider";
import OAuth2Login from 'react-simple-oauth2-login';

import reactDom from "react-dom";



export default function Login() {
  const history = useHistory();
  const { login, test } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    test()
    // login(email, password)
    //   .then(() => history.push("/home"))
    //   ;
  };


  const onSuccess = response => sessionStorage.setItem("accessCode", response.code);
  const onFailure = response => console.error(response);

  reactDom.render(
    <OAuth2Login
      authorizationUrl={process.env.REACT_APP_OAUTH_TOKEN_HOST}
      responseType="code"
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri="http://localhost:3000/home"
      onSuccess={onSuccess}
      onFailure={onFailure} />,
    document.getElementById('root')


  );
  return (
    <div>
      <Form onSubmit={loginSubmit}> <button>Test</button></Form>
    </div>
  )

  // return (
  //   <div className="LoginContainer">
  //     <Card className="LoginCard">
  //       <img className="LoginLogo" src="" />
  //       <h2 className="LoginTitle">Welcome to FFXIV Companion App</h2>
  //       <h4 className="LoginSubTitle">Your guide to Eorzea</h4>
  //       <Form onSubmit={loginSubmit}>
  //         <fieldset>
  //           <FormGroup>
  //             <Row>
  //               <Label className="LoginEmail" for="email">Email</Label>
  //               <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
  //             </Row>
  //           </FormGroup>
  //           <FormGroup>
  //             <Row>
  //               <Label className="LoginPassword" for="password">Password</Label>
  //               <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
  //             </Row>
  //           </FormGroup>
  //           <FormGroup>
  //             <Button className="LoginButton"><strong>Login</strong></Button>
  //           </FormGroup>
  //           <em className="RegisterText">
  //             Not registered? <Link to="register"><strong className="RegisterButton">Register</strong></Link>
  //           </em>
  //         </fieldset>
  //       </Form>

  //     </Card>
  //   </div>
  // );
}
