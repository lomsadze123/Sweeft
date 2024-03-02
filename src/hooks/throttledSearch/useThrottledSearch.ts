import { useState, useEffect } from "react";

const useThrottledSearch = (callback: Function, delay: number) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      callback(searchTerm);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, callback, delay]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return handleSearchChange;
};

export default useThrottledSearch;
