import { useState, useEffect } from 'react';
import { getData } from '../utils/getData';
import { extractUsers } from '../utils/extractUsers';

const useUsers = (accessToken) => {

  const [list, setList] = useState();

  const url = 'https://graph.microsoft.com/v1.0/users';

  useEffect(() => {
    getData(url, accessToken).then(response => {
      setList(extractUsers(response));
    });
  }, []);

  const refresh = async () => {
    const response = await getData(url, accessToken);
    setList(extractUsers(response));
  };

  return { list, refresh };
};

export default useUsers;