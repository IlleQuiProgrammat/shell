import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import theme from "theme";


const Button = styled.button`
    background-color: #2c2a44;
    border-radius: 2px;
    border: 1px solid #373354;
    display: block;
    cursor: pointer;
    color: ${theme.fg};
    font-family: 'Roboto Mono',monospace;
    font-size: 1.2rem;
    padding: 5px 10px;
    text-decoration: none;
    transition: background-color 1s;
    margin: 1rem auto 0;

    ${props => props.main && css`
        padding: .6rem 2rem;
    `}
    ${props => props.medium && css`
        padding: 8px 15px;
    `}
    ${props => props.lesser && css`
        background: none;
    `}

    ${props => props.disabled ? css`
        color: #999;
        cursor: not-allowed;
    ` : css`
        &:hover {
            background-color: ${theme.bg};
            text-decoration: none;
        }
    `}

    ${props => props.admin && css`
        padding: 0;
        width: 250px;
        height: 100px;
        background-color: ${theme.bg_d2};
        margin: 10px;
        font-size: 1.5rem;
`}

`;
const NoUnderline = styled(Link)`
    && {
        text-decoration: none;
    }
`;

export const ButtonRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    >* {
        margin-right: 16px;
    }
    >*:last-child {
        margin-right: 0;
    }
`;

export default (props) =>
    props.to ?
        <NoUnderline to={props.to} onMouseDown={(e => e.target.click())}>
            <Button onMouseDown={(e => e.target.click())} onClick={props.click || (()=>{})} {...props}>{props.children}</Button>
        </NoUnderline>
        : <Button onMouseDown={(e => e.target.click())} onClick={props.click || (()=>{})} {...props}>{props.children}</Button>
;
