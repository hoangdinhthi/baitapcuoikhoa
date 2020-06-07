import I18n from 'i18n-js'
// import * as RNLocalize from 'react-native-localize'
import { Platform, NativeModules } from 'react-native'
import en from './locales/en'
import vi from './locales/vi'
import { isVNlocale } from '../commons/locale'
// const locales2 = RNLocalize.getLocales()

// const locales = [
//   {countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false},
//   {countryCode: 'VN', languageTag: 'vi-VN', languageCode: 'vi', isRTL: false},
// ]

export const setI18nConfig = callback => {
  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : NativeModules.I18nManager.localeIdentifier
  let locale = {}
  // let locale = RNLocalize.findBestAvailableLanguage(['en-US', 'vi-VN'])
  if (!deviceLanguage || !isVNlocale()) {
    locale = {
      isRTL: false,
      languageTag: 'en-US',
    }
  } else {
    locale = {
      isRTL: false,
      languageTag: 'vi-VN',
    }
  }

  I18n.defaultLocale = 'en-US'
  I18n.locale = locale.languageTag

  I18n.fallbacks = true
  I18n.translations = {
    vi,
    en,
  }

  if (typeof callback === 'function') callback()
}

setI18nConfig()

export default I18n
