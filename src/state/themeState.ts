import { theme } from 'antd';
import { AliasToken } from 'antd/es/theme/internal';
import { proxy } from 'valtio';
import { subscribeKey } from 'valtio/utils';

interface themeStateType {
  themeMode: 'light' | 'dark';
  algorithm: typeof theme.defaultAlgorithm;
  token: Partial<AliasToken>;
}

const lightModeToken: Partial<AliasToken> = {
  colorBgBase: '#DDDDFF',
};

const darkModeToken: Partial<AliasToken> = {
  colorBgBase: '#111111',
};

export const themeState: themeStateType = proxy({
  themeMode: 'dark',
  algorithm: theme.darkAlgorithm,
  token: darkModeToken,
});

subscribeKey(themeState, 'themeMode', (newThemeMode) => {
  if (newThemeMode === 'dark') {
    themeState.algorithm = theme.darkAlgorithm;
    themeState.token = darkModeToken;
  } else {
    themeState.algorithm = theme.defaultAlgorithm;
    themeState.token = lightModeToken;
  }
});
