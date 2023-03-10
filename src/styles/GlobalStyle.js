import { createGlobalStyle } from 'styled-components';
import colors from './Theme';

const GlobalStyle = createGlobalStyle`
html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%; 
  margin: 0;  
  height: 100%;
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;  
  height: 100%;
  overflow: hidden;
  background: ${colors.white};
  font-size: 15px;
  color: ${colors.gray900};
  font-family: "SCoreDream";
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  display: block;
}

li {
    list-style: none;
  }

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

a {
  color: ${colors.gray900};
  text-decoration: none;
  background-color: transparent;
  }

button {
  cursor: pointer;
}
button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
overflow: visible;
}

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

img {
  border-style: none;
}
abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}
`;

export default GlobalStyle;
