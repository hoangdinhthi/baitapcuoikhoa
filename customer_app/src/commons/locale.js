import { Platform, NativeModules } from 'react-native'

export const isVNlocale = () => {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier
  const isVNLocale = deviceLanguage.search('vi')
  return isVNLocale >= 0
}

export const test = () => {}
