import { useState, useEffect, useRef } from "react";

const useInfiniteScroll = (callback: Function) => {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFetching(true);
        }
      },
      { threshold: 1 }
    );

    if (observer.current) {
      observer.current.observe(document.getElementById("end-of-images")!);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isFetching) return;

    callback();
    setIsFetching(false);
  }, [isFetching]);

  return setIsFetching;
};

export default useInfiniteScroll;
