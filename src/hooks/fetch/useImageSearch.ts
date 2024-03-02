import { useState, useEffect } from "react";
import unsplashAPI from "../../utils/API";
import { Image, Cache } from "../../types/Types";
import useInfiniteScroll from "../infiniteScroll/useInfiniteScroll";
import useThrottledSearch from "../throttledSearch/useThrottledSearch";

const useImageSearch = () => {
  const [data, setData] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevQuery, setPrevQuery] = useState<string>("");
  const [cache, setCache] = useState<Cache>({});

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
    console.log(searchQuery);

    if (searchQuery !== prevQuery) {
      setPrevQuery(searchQuery);
      setPage(1); // Reset page when the search query changes
      fetchData(searchQuery, 1); // Fetch first page of search results
    }
  }, 600);

  useEffect(() => {
    fetchData(query, page); // Fetch data based on current page and query
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1); // Increment page for infinite scroll
  };

  useInfiniteScroll(fetchMoreData);

  return { data, loading, query, setQuery, handleSearchChange };
};

export default useImageSearch;
