import React, { useState, useEffect } from 'react';
import api from './api';

interface FetchState {
  data: any | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: Error | null;
}

export default function useFetch(url: string): FetchState {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<FetchState['status']>('idle');

  useEffect(() => {
    let doUpdate = true;

    setStatus('loading');
    setData(undefined);
    setError(null);

    api(url)
      .then((data:any) => {
        if (doUpdate) {
          setData(data);
          setStatus('success');
        }
      })
      .catch((error:any) => {
        if (doUpdate) {
          setError(error);
          setStatus('error');
        }
      });

    return () => {
      doUpdate = false;
    };
  }, [url]);

  return { data, status, error };
}