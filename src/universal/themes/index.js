/**
 * theme object is used to provide our application with a
 * set of global variables that can be accessed within
 * styled-components. This app theme is passed to the highest
 * level <ThemeProvider /> within src/root/Root.js
 */
import { keyframes } from 'styled-components';

const flicker = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

export const theme = {
  colors: {
    black: '#000',
  },
  animations: {
    flicker,
  },
};
