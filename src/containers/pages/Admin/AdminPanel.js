import React from "react";
import styled from "styled-components";

import Page from "../bases/Page";
import theme from "theme";

const Button = styled.div`
    width: 250px;
    height: 100px;
    background-color: ${theme.bg_d2};
    line-height: 100px;
    margin: 10px;
    font-size: 1.5rem;
    flex-shrink: 1;
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
        <Button to={"alerts"} main>Manage Alerts</Button>
        <Button>Manage Members</Button>
        <Button>Challenge Editor</Button>
        <Button>Docker Status</Button>
        <Button>Access Support</Button>
    </Buttons>

</Page>