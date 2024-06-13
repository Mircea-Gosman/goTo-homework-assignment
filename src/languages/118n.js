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
                signInButton: 'Next',
                serverError: 'Failed to access the server.',
                incompleteError: 'Can not sign in without a username.'
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
                    overdue: 'Overdue',
                    emptyTaskList: 'There are no tasks in the list!'
                },
                search: {
                    prompt: 'Search task title...'
                },
                errorBanner: 'Beware: We\'re having trouble saving your changes.'
            }
        }
      },
    }
  });

export default i18n;