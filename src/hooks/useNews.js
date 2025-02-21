import { useState, useEffect } from 'react';
import { getDataSpAPI } from '../utils/getDataSpAPI';
import { extractNewsSpAPI } from '../utils/extractNewsSpAPI';

const useNews = (accessToken) => {

  const AMOUNT_TO_LOAD = 1;
  const [list, setList] = useState();
  const [counter, setCounter] = useState(AMOUNT_TO_LOAD);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isMoreNews, setIsMoreNews] = useState(true);

  const url = 'https://wh8d0.sharepoint.com/sites/TheLanding/_api/web/lists/GetByTitle(\'Site Pages\')/Items?$filter=startswith(Tyyppi, \'Uutinen\')&$orderby=Created desc&$Select=Title,Tyyppi,Teksti,Created,BannerImageUrl,Picture,CanvasContent1,Description';

  useEffect(() => {
    getDataSpAPI(url.concat(`&$top=${AMOUNT_TO_LOAD + 1}`), accessToken).then(response => {
      const newsList = extractNewsSpAPI(response);
      if (newsList.length <= AMOUNT_TO_LOAD) {
        setIsMoreNews(false);
        setList(newsList);
      } else {
        setIsMoreNews(true);
        setList(newsList.slice(0, newsList.length - 1));
      }
    });
  }, []);

  // While this mainly repeats the initialization code above, we don't want to setRefresh during init, which is the reason for a separate function
  const refresh = async () => {
    setIsRefreshing(true);
    setCounter(AMOUNT_TO_LOAD);
    const response = await getDataSpAPI(url.concat(`&$top=${AMOUNT_TO_LOAD + 1}`), accessToken);
    const newsList = extractNewsSpAPI(response);
    if (newsList.length <= AMOUNT_TO_LOAD) {
      setIsMoreNews(false);
      setList(newsList);
    } else {
      setIsMoreNews(true);
      setList(newsList.slice(0, newsList.length - 1));
    }
    setIsRefreshing(false);
  };

  const loadMore = async () => {
    getDataSpAPI(url.concat(`&$top=${counter + AMOUNT_TO_LOAD + 1}`), accessToken).then(response => {
      const newsList = extractNewsSpAPI(response);
      if (newsList.length <= counter+AMOUNT_TO_LOAD) {
        setIsMoreNews(false);
        setList(newsList);
      } else {
        setIsMoreNews(true);
        setList(newsList.slice(0, newsList.length-1));
      }
      setCounter(newsList.length-1);
    });
  };

  return { list, counter, setCounter, refresh, loadMore, isRefreshing, isMoreNews };
};

export default useNews;