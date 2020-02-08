import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 1em;
        border: none;
        background: transparent;
        outline: none;
        font-family: 'Montserrat', sans-serif;
    }
    html,
    body,
    #root {
        width: 100%;
        height: 100%;
    }
`;
