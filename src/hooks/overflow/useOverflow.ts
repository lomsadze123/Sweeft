import { useEffect } from "react";

const useOverflow = (clickId: string | null) => {
  useEffect(() => {
    if (clickId) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to remove the class when component unmounts or clickId changes
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [clickId]);
};

export default useOverflow;
