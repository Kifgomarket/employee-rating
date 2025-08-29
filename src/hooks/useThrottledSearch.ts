import { useEffect, useState } from "react";
import useThrottle from "./useThrottle";

interface UseThrottledSearchParams {
  key?: string;
  searchQuery: string; // The current search query string from the URL
  batchUpdateSearchQuery: (
    appendParams?: Record<string, string>,
    deleteParams?: string[],
    options?: { useReplace: boolean },
  ) => void;
  delay?: number; // Optional delay for throttling, defaults to 300ms
}

/**
 * Custom hook to manage throttled search input and URL updates.
 * @param searchQuery - The current search query from the URL.
 * @param appendToSearchQuery - Function to add/update the search query parameter.
 * @param deleteFromSearchQuery - Function to remove the search query parameter.
 * @param delay - Optional delay for throttling the search updates (default: 300ms).
 * @returns An object containing the current query input value and a setter function.
 */
const useThrottledSearch = ({
  key = "search",
  searchQuery,
  batchUpdateSearchQuery,
  delay = 300,
}: UseThrottledSearchParams) => {
  // State to store the query input, initialized from the search query from the URL
  const [queryToSearch, setQueryToSearch] = useState(searchQuery ?? "");

  // Effect to synchronize the queryToSearch state with the searchQuery prop
  useEffect(() => {
    setQueryToSearch(searchQuery);
  }, [searchQuery]);

  // Throttle the query input updates to limit how often the URL is modified
  const throttledQueryToSearch = useThrottle(queryToSearch, delay);

  // Effect to update the search query in the URL whenever the throttled value changes
  useEffect(() => {
    if (throttledQueryToSearch.length > 0) {
      batchUpdateSearchQuery({ [key]: throttledQueryToSearch }, ["page"]);
    } else {
      batchUpdateSearchQuery(undefined, [key, "page"]);
    }
  }, [throttledQueryToSearch, batchUpdateSearchQuery, key]);

  return {
    queryToSearch,
    setQueryToSearch,
  };
};

export default useThrottledSearch;
