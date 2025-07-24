import { useState, useEffect } from "react";
import { fetchMenuSuggestions } from "../services/menuItemService";

const useMenuAutocomplete = (query, delay = 500) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  // Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetchMenuSuggestions(debouncedQuery);
        setSuggestions(response.data?.data || []);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm món ăn:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return { suggestions, loading };
};

export default useMenuAutocomplete;
