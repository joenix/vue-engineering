export default (I18N, i18n, configure = {}) => {
  const lang =
    configure.lang ||
    navigator.userLanguage || navigator.browserLanguage || navigator.language;

  const $i18n = new I18N({
    locale: lang,
    messages: i18n
  });

  return $i18n
};
