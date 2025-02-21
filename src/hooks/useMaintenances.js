import { useState, useEffect } from 'react';
import { getDataSpAPI } from '../utils/getDataSpAPI';
import { extractNewsSpAPI } from '../utils/extractNewsSpAPI';

const useMaintenances = (accessToken) => {

  const [list, setList] = useState();

  const url = 'https://wh8d0.sharepoint.com/sites/TheLanding/_api/web/lists/GetByTitle(\'Site Pages\')/Items?$filter=startswith(Tyyppi, \'Vuosihuolto\')&$Select=Title,Tyyppi,Teksti,Created,BannerImageUrl,Picture,CanvasContent1,Description&$orderby=Created desc';

  useEffect(() => {
    getDataSpAPI(url, accessToken).then(response => {
      setList(extractNewsSpAPI(response));
    });
  }, []);

  const refresh = async () => {
    const response = await getDataSpAPI(url, accessToken);
    setList(extractNewsSpAPI(response));
  };

  return { list, refresh };
};

export default useMaintenances;