import { useState, useEffect } from "react";
import unsplashAPI from "../../utils/API";
import { Image, Cache, Query } from "../../types/Types";
import useInfiniteScroll from "../infiniteScroll/useInfiniteScroll";
import useThrottledSearch from "../throttledSearch/useThrottledSearch";
import { useLocation } from "react-router-dom";

const useImageSearch = ({ query }: Query) => {
  const [data, setData] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevQuery, setPrevQuery] = useState<string>("");
  const [cache, setCache] = useState<Cache>({});
  const location = useLocation();

  const fetchData = async (searchQuery: string, pageNum: number) => {
    try {
      setLoading(true);
      let newData: Image[] = [];

      // Check if data for this query and page is present in cache
      if (cache[searchQuery]?.[pageNum]) {
        newData = cache[searchQuery][pageNum];
      } else {
        let response;
        if (searchQuery === "") {
          response = await unsplashAPI.get("/photos", {
            params: {
              order_by: "popular",
              per_page: 10,
              page: pageNum,
            },
          });
        } else {
          response = await unsplashAPI.get("/search/photos", {
            params: {
              query: searchQuery,
              per_page: 10,
              page: pageNum,
            },
          });
        }
        newData = response.data.results || response.data;

        // Update cache with fetched data
        setCache((prevCache) => ({
          ...prevCache,
          [searchQuery]: {
            ...prevCache[searchQuery],
            [pageNum]: newData,
          },
        }));
      }

      if (pageNum === 1) {
        setData(newData); // If it's the first page, replace data with new results
      } else {
        setData((prevData) => [...prevData, ...newData]); // Otherwise append to existing data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = useThrottledSearch((searchQuery: string) => {
    if (searchQuery) {
      const existingHistory: string[] = JSON.parse(
        localStorage.getItem("searchHistory") || "[]"
      );
      // Check if the word is not already present in the search history
      if (!existingHistory.includes(searchQuery)) {
        // Append the new word to the existing list
        const updatedHistory = [...existingHistory, searchQuery];
        // Save the updated list back to local storage
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      }
    }

    if (searchQuery !== prevQuery) {
      setPrevQuery(searchQuery);
      setPage(1); // Reset page when the search query changes
      fetchData(searchQuery, 1); // Fetch first page of search results
    }
  }, 600);

  useEffect(() => {
    if (page !== 1) {
      fetchData(query, page);
    }
  }, [page]);

  useEffect(() => {
    // Cleanup function to clear data and cache when the location changes
    setData([]);
    setCache({});
  }, [location.pathname]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1); // Increment page for infinite scroll
  };

  useInfiniteScroll(fetchMoreData);

  return { data, loading, handleSearchChange, page };
};

export default useImageSearch;
