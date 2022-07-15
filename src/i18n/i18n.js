
import en from './en-us';
import es from './es';
import ch from './ch';

let i18n = {
  i18n: {
    header: 'inside',
    enabled: true,
    languages: [
      {
        language: 'en-US',
        title: 'English',
      },
      {
        language: 'es',
        title: 'Español',
      },
      {
        language: 'ch',
        title: '中文',
      },
    ],
    refinePanel: true,
    expandCollapseTitle: true,
    footer: true,
    data: {
      locale: 'en-US',
      messages: {
        'en-US': en,
        es: es,
        ch: ch,
      },
    },
  },
};

// console.log('primary care i18n.js, i18n:', i18n);

export default i18n;
