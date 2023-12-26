import i18next from 'i18next';
import onChange from 'on-change';
import * as yup from 'yup';

// model

const defaultLanguage = 'ru';

export default () => {
  const i18nextInstance = i18next.createInstance();
  i18nextInstance
    .init({
      lng: defaultLanguage,
      debug: true,
      resources,
    })
    .then(() => {
      const initialState = {
        valid: false,
        inputValue: '',
        process: {
          processState: 'filling',
          error: '',
        },
        content: {
          posts: [],
          feeds: [],
        },
        uiState: {
          visitedLinksIds: new Set(),
          modalId: '',
        },
      };

      const rssForm = document.querySelector('.rss-form');
      const input = rssForm.querySelector('#url-input');

      const currentUrl = input.value;
      const feedLinks = initialState.content.feeds.map((feed) => feed.link);
      const validate = (url, urlList) => {
        const schema = yup.string().trim().required().url().notOneOf(urlList);
        return schema.validate(url);
      };

      const getAxiosResponse = (url) => {
        const allOrigins = 'https://allorigins.hexlet.app/get';
        const newUrl = new URL(allOrigins);
        newUrl.searchParams.set('url', url);
        newUrl.searchParams.set('disableCache', 'true');
        return axios.get(newUrl);
      };

      yup.setLocale({
        mixed: { notOneOf: 'doubleRss' },
        string: { url: 'invalidUrl' },
      });

      rssForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('success');
        validate(currentUrl, feedLinks)
          .catch((error) => {
            console.log(error);
          });
      });
    });
};
