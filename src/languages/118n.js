import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
            signIn: {
                title: 'Task Management',
                subtitle: 'Homework Assignment',
                inputLabel: 'Username',
                signInButton: 'Next'
            },
            dashboard: {
                title: 'All Tasks',
                filters: {
                    title: 'Title',
                    date: 'End Date',
                    status: 'Status'
                },
                taskCards: {
                    titleInputFieldName: 'Title',
                    descriptionInputFieldName: 'Description',
                    overdue: 'Overdue'
                },
                search: {
                    prompt: 'Search task title...'
                }
            }
        }
      },
    }
  });

export default i18n;