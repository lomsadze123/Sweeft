import { useState, useEffect, useRef } from "react";

const useInfiniteScroll = (callback: Function) => {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    try {
      const endOfImages = document.getElementById("end-of-images");
      if (!endOfImages) {
        console.log(
          "Element with id 'end-of-images' not found because it is first render"
        );
        return;
      }
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsFetching(true);
          }
        },
        { threshold: 1 }
      );

      if (observer.current) {
        observer.current.observe(endOfImages);
      }
    } catch (error) {
      console.log("An error occurred");
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
