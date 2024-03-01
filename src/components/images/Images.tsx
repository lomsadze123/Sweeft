import React, { useEffect, useState, useRef } from "react";
import unsplashAPI from "../../utils/API";
import { Image } from "../../types/Types";

const Images = () => {
  const [data, setData] = useState<Image[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver>();

  // Create a separate ref for the div element
  const endOfImagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();

    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (observer.current && endOfImagesRef.current) {
      observer.current.observe(endOfImagesRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [query]);

  useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let response;
      if (query === "") {
        response = await unsplashAPI.get("/photos", {
          params: {
            order_by: "popular",
            per_page: 20, // Load only 20 images initially
            page: page,
          },
        });
      } else {
        response = await unsplashAPI.get("/search/photos", {
          params: {
            query: query,
            per_page: 20, // Load only 20 images initially
            page: page,
          },
        });
      }

      const newData = response.data.results || response.data;
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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
          onChange={(e) => setQuery(e.target.value)}
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
      {/* Assign the ref to the div element */}
      <div id="end-of-images" ref={endOfImagesRef}></div>
      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
};

export default Images;
