/**
 * theme object is used to provide our application with a
 * set of global variables that can be accessed within
 * styled-components. This app theme is passed to the highest
 * level <ThemeProvider /> within src/root/Root.js
 */
import { keyframes } from 'styled-components';

const black = '#262626';
const blue = '#448aff';
const blueMid = '#1c5ece';
const blueStone = '#262626';
const bluePale = '#95c4f9';
const greyBg = '#f9f9f9';
const errorPink = '#fff7f7';
const errorRed = '#f54d3d';
const easingOut = 'cubic-bezier(0.23, 1, 0.32, 1)';

const flicker = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

export const theme = {
  font: {
    size1: '1.2rem',
    size2: '1.5rem',
    size3: '1.875rem',
    size4: '2.250rem',
    size5: '2.812rem',
    size6: '3.374rem',
    size7: '4.218rem',
    size8: '5.062rem',
    size9: '6.328rem',
    size10: '7.594rem',
  },
  colors: {
    red: '#F44336',
    orange: '#FF605D',
    green: '#32C594',
    blue,
    bluePale,
    blueMid,
    black,
    greyVeryDark: '#31373d',
    blueStone: '#43526D',
    errorPink,
    errorRed,
    grey: '#E3E3E3',
    greyBg,
    greyDark: '#424242',
    greyMidDark: '#585858',
    greyMid: '#777777',
    greyMidLight: '#a8a8a8',
    greyLight: '#F8F8F8',
  },
  animations: {
    flicker,
  },
  banks: {
    default: '#616161',
    grow: {
      pri: blue,
      sec: blueStone,
      bg: greyBg,
      border: bluePale,
    },
    westoba: '#003f77',
    conexus: '#008DA8',
    scotiabank: '#D81E05',
    tangerine: '#F58426',
    td: '#01A221',
  },
  placeholder: {
    dark: 'rgba(#E7EEF5, 0.65)',
    light: 'rgba(#ebeef0, 0.65)',
  },

  buttons: {
    borderRadius: 0,
    height: '5rem',
    primary: {
      background: {
        default: blue,
        hover: blue,
      },
      color: {
        default: blue,
        hover: '#fff',
      },
    },
    secondary: {
      background: {
        default: 'none',
        hover: 'none',
      },
      color: {
        default: blue,
        hover: blue,
      },
    },
    tertiary: {
      background: {
        default: 'none',
        hover: 'none',
      },
      color: {
        default: blue,
        hover: blue,
      },
    },
    textTransform: 'uppercase',
  },
  headings: {
    color: '#262626',
    fontWeight: 400,
  },
  fields: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: '0rem',
  },
  inputs: {
    border: {
      color: {
        default: '#c4c4c4',
        focus: blue,
      },
      radius: '3px',
      style: 'solid',
      width: '1px',
    },
    boxShadow: 'inset 0 1px 0 0 rgba(63,63,68,0.05)',
    color: {
      placeholder: '#969696',
      value: black,
    },
    fontSize: '1.5rem',
    height: '3.4rem',
    width: '100%',
    padding: '1.2rem',
    paddingRight: '3.1rem',
  },
  labels: {
    color: '#262626',
    fontSize: '1.5rem',
    width: '225px',
    textTransform: 'initial',
    flexDirection: 'row',
  },
  selectEasy: {
    item: {
      fontSize: '1.5rem',
      padding: '0.8rem',
    },
  },
  select: {
    background: 'linear-gradient(to bottom, #fff, #f9fafb)',
    border: {
      width: '1px',
      style: 'solid',
    },
    width: '100%',
    svg: {
      height: '1.2rem',
      top: '1.4rem',
    },
  },
  space: '2.25',
};

export const easings = {
  default: easingOut,
  defaultSpeed: '0.25',
  in: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  inBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  out: easingOut,
  outBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  inOut: 'cubic-bezier(0.86, 0, 0.07, 1)',
  inOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};
