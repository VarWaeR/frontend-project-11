export default (data) => {
  const parser = new DOMParser();
  const parsedData = parser.parseFromString(data, 'application/xml');

  const error = parsedData.querySelector('parsererror');
  if (error) {
    const customError = new Error(`An error occurred while parsing the XML data! data: ${error.message}`);
    customError.message = 'parseError';
    throw customError;
  }

  const channel = parsedData.querySelector('channel');
  const feedTitle = channel.querySelector('title').textContent;
  const feedDescription = channel.querySelector('description').textContent;
  const feed = { title: feedTitle, description: feedDescription };

  const items = Array.from(parsedData.querySelectorAll('item'));

  const posts = items.map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return { title, description, link };
  });

  return { feed, posts };
};
