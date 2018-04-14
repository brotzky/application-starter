import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { Router } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { routes } from '../routes';
import { theme } from '../themes/';
import ReduxAsyncConnect from '../../universal/routes/ReduxAsyncConnect';

/**
 * <App />
 * the highest level component responsible for Providing the
 * redux store to our entire application and also the routes.
 * This component is not visually rendered.
 */
const App = ({ store, history }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <ReduxAsyncConnect routes={routes} store={store}>
            {renderRoutes(routes)}
          </ReduxAsyncConnect>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

/**
 * injectGlobal is technically an escape hatch provided by styled-components
 * that will enforce global cascading style rules which is against the whole
 * styled-components theory. This is where we define fronts, global resets,
 * and the very base styles.
 */
export const globalStyles = () => injectGlobal`
  @font-face {
    font-family: '-apple-system',
    'BlinkMacSystemFont',
	  'San Francisco',
	  'Helvetica Neue',
    'Helvetica',
    'Ubuntu',
    'Roboto',
    'Noto',
    'Segoe UI',
    'Arial',
    sans-serif;
    font-weight: 400;
    font-style: normal;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
    font-size: inherit;
  }

  :root {
    -ms-overflow-style: -ms-autohiding-scrollbar;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    cursor: default;
    font-size: 0.625rem;
    line-height: 1.5;
  }

  body {
    font-family: '-apple-system',
    'BlinkMacSystemFont',
	  'San Francisco',
	  'Helvetica Neue',
    'Helvetica',
    'Ubuntu',
    'Roboto',
    'Noto',
    'Segoe UI',
    'Arial',
    sans-serif;
    font-size: 1.6rem;
    margin: 0;
    color: ${theme.colors.black};
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.25;
    color ${theme.colors.black};
  }

  button,
  a {
    text-decoration: none;
    cursor: pointer;
  }

  a {
    color: ${theme.colors.black};
  }

  p {
    color: ${theme.colors.black};
  }
  [hidden] {
    display: none;
  }

  [unselectable] {
    user-select: none;
  }

  audio,
  canvas,
  iframe,
  img,
  svg,
  video {
    vertical-align: middle;
  }


  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    background-color: transparent;
    width: 100%;

    &::-ms-expand {
      display: none;
    }

    option {
      color: #262626;
    }
}


  input, textarea, select, button {
    font-family: '-apple-system',
    'BlinkMacSystemFont',
	  'San Francisco',
	  'Helvetica Neue',
    'Helvetica',
    'Ubuntu',
    'Roboto',
    'Noto',
    'Segoe UI',
    'Arial',
    sans-serif;
  }

  button,
  input,
  select,
  textarea {
    color: inherit;
    font-family: inherit;
    font-style: inherit;
    font-weight: inherit;
  }

  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
  }

  fieldset,
  button {
    appearance: none;
    border: none;
    outline: none;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
  }

  audio:not([controls]) {
    display: none; 
  }

  details {
    display: block; 
  }

  input {
    color: $text-color;

    &:focus,
    &:active {
      outline: none;
    }

    &::-webkit-input-placeholder,
    &:-moz-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder, 
    &::-webkit-input-placeholder {
      color: ${theme.colors.greyMidDark};
    }

    &[type="number"] {
      width: auto;
    }

    &[type="search"] {
      -webkit-appearance: textfield;

      &::-webkit-search-cancel-button,
      &::-webkit-search-decoration {
        -webkit-appearance: none;
      }
    }
  }


  /**
  * transition styles for all reactcsstransitiongroup
  * components we are using within the application
  */

  /* ========================
  * FadeIn
  =========================*/
  .FadeIn-appear {
    opacity: 0.01;
  }

  .FadeIn-appear.FadeIn-appear-active {
    opacity: 1;
    transition: opacity 366ms cubic-bezier(0.39, 0.575, 0.565, 1);
  }

  .FadeIn {
    &-enter {
      opacity: 0.01;
    }

    &-enter-active {
      opacity: 1;
      transition: all 366ms ease-out;
    }

    &-leave {
      opacity: 1;
    }

    &-leave-active {
      opacity: 0;
      transition: all 366ms ease-out;
    }
  }

  .Modal {
    position: fixed;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;

    &-enter {
      .ModalBackground {
        opacity: 0;
      }

      .ModalDialog {
        opacity: 0;
        transform: translateY(6%);
      }
    }

    &-enter-active {

      .ModalBackground {
        opacity: 1;
      },

      .ModalDialog {
        opacity: 1;
        transform:none;
        transition: all 280ms cubic-bezier(0.39, 0.575, 0.565, 1);
      }
    }

    &-leave {
      opacity: 1;
    }

    &-leave-active {

      .ModalDialog {
        opacity: 0;
        transform: translateY(6%);
        transition: all 200ms cubic-bezier(0.39, 0.575, 0.565, 1);
      }
    }
  }
`;
