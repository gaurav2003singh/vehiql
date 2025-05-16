import { useState, useEffect } from "react";

export default function useSuggestions(query) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!query || query.length < 2) {
        setSuggestions([]);
        return;
      }

      fetch(`/api/suggestions?q=${query}`)
        .then((res) => res.json())
        .then(setSuggestions)
        .catch(() => setSuggestions([]));
    }, 200); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  return suggestions;
}
