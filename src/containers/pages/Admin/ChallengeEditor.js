import React from "react";
import styled from "styled-components";

import Page from "../bases/Page";
import theme from "theme";

import Button from "../../../components/Button.js"

const Buttons = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
    justify-content: center;
    margin: 0 auto;
`

export default () => <Page title={'Edit Challenges'}>

    <Buttons>
        <Button to={"/admin/"} admin>Challenge 1</Button>
        <Button to={"/admin/"} admin>Challenge 1</Button>
        <Button to={"/admin/"} admin>Challenge 1</Button>
        <Button to={"/admin/"} admin>Challenge 1</Button>
        <Button to={"/admin/"} admin>Challenge 1</Button>
        <Button to={"/admin/"} admin>Challenge 1</Button>
    </Buttons>

    <Button to={"/admin"}>Back</Button>

</Page>