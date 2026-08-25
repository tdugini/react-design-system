import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'TD/UI',
  colorPrimary: '#205c4a',
  colorSecondary: '#205c4a',
  appBg: '#f6f6f4',
  appContentBg: '#ffffff',
  appBorderColor: '#d9d9d3',
  appBorderRadius: 7,
  textColor: '#171715',
  textMutedColor: '#696964',
  barTextColor: '#696964',
  barSelectedColor: '#205c4a',
  barHoverColor: '#171715',
  barBg: '#ffffff',
  inputBg: '#ffffff',
  inputBorder: '#d9d9d3',
  inputTextColor: '#171715',
  inputBorderRadius: 7,
});

addons.setConfig({ theme });
