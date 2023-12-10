import axios from 'axios';

const FetchHeadlinesFromAPI = async () => {
  let headlines;
  try {
    const news = await axios.get(
      'https://newsapi.org/v2/everything?apiKey=b6684226df7948ddb6df5ad210a9c9dd&q=india',
    );
    const articles = news.data.articles;
    headlines = articles.map((article: any) => {
      return {
        title: article.title,
        key: article.publishedAt.toString(),
        isPinned: false,
      };
    });
  } catch (error) {
    console.log(error);
  }
  return headlines;
};

export default FetchHeadlinesFromAPI;
