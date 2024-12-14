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
    html, body, #root {
        height: 100%;
    }
    
    html,body,body > div { 
        /* the react root */
        margin: 0;
        padding: 0;
        height: 100%;
    }
    
    body {
        font-family: 'Noto Sans KR', sans-serif;
    }
    
    #root {
        display: flex;
    }
    
    h2 {
        margin: 0;
        font-size: 16px;
    }
    
    
    ul {
        margin: 0;
        padding: 0 0 0 1.5em;
    }
    
    li {
        padding: 0;
    }
    
    b { 
        margin-right: 3px;
    }
`;
