import React from "react";
import styled from "styled-components";

import Page from "../bases/Page";
import theme from "theme";

import Button from "../../../components/Button.js"
import Input from "../../../components/Input.js"

const Results = styled.div`
    background-color: ${theme.bg_d2};
    width: 800px;
    height: 500px;
    margin: 25px auto;
    padding: 5px;

    * {
        margin: 2px auto;
    }
`

export default () => <Page title={'Edit Challenges'}>
    <select>
        <option value='c1'>Challenge 1</option>
        <option value='c1'>Challenge 1</option>
        <option value='c1'>Challenge 1</option>
        <option value='c1'>Challenge 1</option>
    </select>

    <Results>
        <table>
            <tr>
                <td>Name: </td>
                <td><Input placeholder={"Challenge 1"}></Input></td>
            </tr>
            <tr>
                <td>Points: </td>
                <td><Input placeholder={"6969"}></Input></td>
            </tr>
            <tr>
                <td>Description: </td>
                <td><Input placeholder={"This is a great challenge description"} rows={'5'}></Input></td>
            </tr>
            <tr>
                <td>Flag Hash: </td>
                <td><Input placeholder={"abc132"}></Input></td>
            </tr>
            <tr>
                <td>Hint: </td>
                <td><Input placeholder={"kali linux illegal"}></Input></td>
            </tr>
            <tr>
                <td>Flag Format: </td>
                <td><Input placeholder={"thebeanogamer"}></Input></td>
            </tr>
        </table>
        <Button>Save</Button>
    </Results>


    <Button to={"/admin"}>Back</Button>

</Page>