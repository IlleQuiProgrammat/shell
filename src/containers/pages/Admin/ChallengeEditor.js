import React from "react";
import styled from "styled-components";

import Page from "../bases/Page";
import theme from "theme";

import Button from "../../../components/Button.js"

const Results = styled.div`
    background-color: ${theme.bg_d2};
    width: 800px;
    height: 500px;
    margin: 25px auto;
    padding: 5px;
`

export default () => <Page title={'Edit Challenges'}>
    <select>
        <option value='c1'>Challenge 1</option>
        <option value='c1'>Challenge 1</option>
        <option value='c1'>Challenge 1</option>
        <option value='c1'>Challenge 1</option>
    </select>
    <Button>Go</Button>

    <Results>
        <h2>Challenge 1</h2>
    </Results>


    <Button to={"/admin"}>Back</Button>

</Page>