import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
export const GlobalStyles = createGlobalStyle`
    :root {
        --primary-color: #7a22d6;
        --gray-7: #515C68;
        --gray-6: rgba(81, 92, 104, 0.5);
        --gray-4: rgba(200, 211, 222, 1);
    }
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
