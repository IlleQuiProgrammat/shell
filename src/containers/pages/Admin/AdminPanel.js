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


export default () => <Page title={'Admin Panel'}>

    <Buttons>
        <Button to={"/admin/alerts"} admin>Manage Alerts</Button>
        <Button to={"/admin/members"} admin>Manage Members</Button>
        <Button to={"/admin/challenges"} admin>Challenge Editor</Button>
        <Button to={"/admin/docker"} admin>Docker Status</Button>
        <Button to={"/admin/support"} admin>Access Support</Button>
    </Buttons>

</Page>