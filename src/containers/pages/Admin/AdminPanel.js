import React from "react";
import styled from "styled-components";

import Page from "../bases/Page";
import theme from "theme";

import {Link} from "react-router-dom";

const Button = styled(Link)`
    width: 250px;
    height: 100px;
    background-color: ${theme.bg_d2};
    line-height: 100px;
    margin: 10px;
    font-size: 1.5rem;
    flex-shrink: 1;

    && {
        text-decoration: none;
        color: white;        
    }
`
const Buttons = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1000px;
    justify-content: center;
    margin: 0 auto;
`


export default () => <Page title={'Admin Panel'}>

    <Buttons>
        <Button to={"/admin/alerts"}>Manage Alerts</Button>
        <Button to={"/admin/members"}>Manage Members</Button>
        <Button to={"/admin/challenges"}>Challenge Editor</Button>
        <Button to={"/admin/docker"}>Docker Status</Button>
        <Button to={"/admin/support"}>Access Support</Button>
    </Buttons>

</Page>