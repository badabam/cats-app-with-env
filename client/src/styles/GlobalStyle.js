import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    --color-white: #fefefe;
    --color-black: #333;
    --color-gray: #aaacad;
  }

  body {
    margin: 0;
    font-family: sans-serif;
    font-size: 112.5%;
    background: var(----color-black);
    color: var(----color-white)
  }

  button, input, textarea {
    font-size: 1em;
  }

  textarea {
    font-family: sans-serif;
  }
`
