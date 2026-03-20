import type { ThemeName } from '../theme.js';

export const appConfig = {
  themeName: 'default' as ThemeName,
  privacyMode: false,
};

export function setTheme(name: ThemeName) {
  appConfig.themeName = name;
}

export function setPrivacyMode(enabled: boolean) {
  appConfig.privacyMode = enabled;
}
