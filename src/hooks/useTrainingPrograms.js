import { useState, useEffect } from 'react';
import { getDataSpAPI } from '../utils/getDataSpAPI';
import { extractEvents } from '../utils/extractEvents';

const useTrainingPrograms = (accessToken) => {

  const [list, setList] = useState();

  const url = 'https://wh8d0.sharepoint.com/sites/TheLanding/_api/web/lists/GetByTitle(\'Events\')/Items?$Select=Title,EventDate,Description,Location,EndDate&$orderby=EventDate desc';

  useEffect(() => {
    getDataSpAPI(url, accessToken).then(response => {
      setList(extractEvents(response));
    });
  }, []);

  const refresh = async () => {
    const response = await getDataSpAPI(url, accessToken);
    setList(extractEvents(response));
  };

  return { list, refresh };
};

export default useTrainingPrograms;