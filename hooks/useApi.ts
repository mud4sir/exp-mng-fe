import { useState } from 'react';
import { useContextApi } from '../context/Context';
import { IConfig } from '../interfaces';

function useApi() {
  const context = useContextApi();
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>();

  async function sendRequest(url: string, payload?: any, method: 'GET' | 'POST' | 'PATCH' = 'GET', showLoading: boolean = true) {
    try {
      if (showLoading) {
        setLoading(true);
      }
      
      const config: IConfig = {
        method,
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${context.user && context.user.accessToken}`
        }
      };

      if (payload) {
        config.body = JSON.stringify(payload)
      }
      
      const res = await fetch(url, config);
      const data = await res.json();
      return data;
    } catch (e) {
      setServerError(e.message);
    } finally {
      setLoading(false);
    }

  }

  return { sendRequest, loading, serverError };
}

export default useApi;
