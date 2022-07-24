import {useCallback, useState} from 'react';
import {Api} from '../../service/api/Api';

export const useRequest = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async (config: { url:string, method:string, body: any}, setData: ((data: any | null, status:number) => void)) => {
    setError(false);
    setIsloading(true);
    try {
      const api: Api<any, any> = new Api< any, any>();
      const response : Response = await api.request({path: config.url, method: config.method, body: config.body});
      let data = null;
      if (response.ok) {
        try {
          data = await response.json();
        } catch (rError) {
          data = {};
        }
      }
      setData(data, response.status);
      setIsloading(false);
    } catch (requestError) {
      setError(true);
      setIsloading(false);
    }
  }, []);


  return {isLoading, error, sendRequest};
};
