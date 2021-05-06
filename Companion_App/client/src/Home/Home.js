import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { Button, Row, Col, Spinner } from "reactstrap";
import { UserProfileContext } from "../Providers/UserProfileProvider"







export default function Home() {

    const { getBlizzToken, test } = useContext(UserProfileContext);

    useEffect(() => {
        getBlizzToken().then((response) => sessionStorage.setItem("token", response.access_token)).then(() => test())
    }, [])

    return (
        <>
            <div className="HomeContainer">
                <Row>

                    <Col>
                        <h2>Home</h2>
                    </Col>
                </Row>
            </div>
        </>
    )

}
