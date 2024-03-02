import { useState, useEffect } from "react";
import unsplashAPI from "../../utils/API";
import { Image } from "../../types/Types";
import useInfiniteScroll from "../../hooks/infiniteScroll/useInfiniteScroll";
import useThrottledSearch from "../../hooks/throttledSearch/useThrottledSearch";

const Images = () => {
  const [data, setData] = useState<Image[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prevQuery, setPrevQuery] = useState("");

  const fetchData = async (searchQuery: string, pageNum: number) => {
    try {
      setLoading(true);
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

      const newData = response.data.results || response.data;
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

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="text-center">
        <input
          className="border-2 border-gray-500 outline-none my-8 w-1/3 p-3 rounded-lg"
          type="text"
          name="search"
          id="search"
          placeholder="search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearchChange(e); // Pass the event object to handleSearchChange
          }}
        />
      </form>
      <div className="flex justify-center gap-5 flex-wrap">
        {data.map((image, index) => (
          <div
            className="w-full max-w-[500px] h-[333px]"
            key={image.id + index}
          >
            <img
              className="w-full h-full object-cover"
              src={image.urls.regular}
              alt={image.id}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div id="end-of-images"></div>
      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
};

export default Images;
