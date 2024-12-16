import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./theme/theme.css";

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        color: inherit;
    }

    html, body, #root  {
        height: 100%;
    }
    
    html,body,body > div { 
        /* the react root */
        margin: 0;
        padding: 0;
        height: 100%;
    }
    
    body {
        font-family: 'Open Sans', sans-serif;
    }

    #modal-root {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none; 
        z-index: 1000;
    }
     
`;
