import { GlobalToken } from 'antd';

export const blackKey = (token: GlobalToken) => ({
  height: '4.5rem',
  width: '3rem',
  margin: '0 0.1rem',
  position: 'absolute' as const,
  right: '-1.5rem',
  zIndex: 1,
  borderWidth: '0.2rem',
  borderTopWidth: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderColor: token.colorBgBase,
});

export const whiteKey = {
  height: '7rem',
  width: '5rem',
  margin: '0 0.1rem',
};

export const keyboardContainer = {
  overflowX: 'scroll',
  overflowY: 'hidden',
  scrollbarWidth: 'none', // Hide the scrollbar for firefox
  '&::webkitScrollbar': {
    display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
  },
  '&msOverflowStyle:': {
    display: 'none', // Hide the scrollbar for IE
  },
};
