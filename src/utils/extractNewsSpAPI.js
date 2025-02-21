export function extractNewsSpAPI (data)  {
  const newsObj = {};
  const newsArticles = [];
  const newsData = data.d.results;
  let counter = 0;
  let counter1 = 0;

  const addNewsItem = (newsItem) => {
    const newsObject = {
      id: counter1,
      title: newsItem.Title,
      body: newsItem.CanvasContent1,
      description: newsItem.Description,
      image: newsItem.Picture.Url,
      createdAt: newsItem.Created
    };
    counter1++;
    newsArticles.push(newsObject);
  };
  newsData.forEach(element => {
    let newsname = 'newsitem' + counter.toString();
    let newsstring = element;
    newsObj[newsname] = newsstring;
    counter++;
    addNewsItem(newsObj[newsname]);
  });
  return newsArticles;
}