import i18next from 'i18next';
import onChange from 'on-change';
import * as yup from 'yup';


// model
export default () => {
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
    const feedLinks = initialState.content.feeds.map((feed) => feed.link)
    const validate = (url, urlList) => {
        const schema = yup.string().trim().required().url().notOneOf(urlList);
        return schema.validate(url);
    };
    
    rssForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('success')
        validate(currentUrl, feedLinks)
            .catch((error) => {
                console.log(error);
            });
    });
};


