import { useState, useEffect } from "react";

const useQuery = (queryFn, deps = [], enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await queryFn();
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [enabled, ...deps]);

  return { data, loading, error };
};

export default useQuery;
