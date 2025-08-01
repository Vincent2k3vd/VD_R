import { useState, useEffect, useRef, useCallback } from 'react';

const useQuery = (queryFn, deps = [], options = {}) => {
  const {
    enabled = true,
    initialData = null,
    onSuccess,
    onError,
  } = options;

  const isMounted = useRef(true);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const res = await queryFn();
      if (isMounted.current) {
        setData(res.data);
        onSuccess?.(res.data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err);
        onError?.(err);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [enabled, ...deps]);

  useEffect(() => {
    isMounted.current = true;
    fetchData();

    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useQuery;
