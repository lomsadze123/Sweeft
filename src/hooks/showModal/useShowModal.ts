import { useState, useEffect } from "react";
import unsplashAPI from "../../utils/API";
import { Image } from "../../types/Types";

const useShowModal = (imageId: string | undefined) => {
  const [image, setImage] = useState<Image | null>(null);

  const fetchImage = async () => {
    try {
      const response = await unsplashAPI.get(`/photos/${imageId}`);
      setImage(response.data);
    } catch (error) {
      console.log("Error fetching image:", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []); // No dependencies here since we only fetch image once when component mounts

  return { image };
};

export default useShowModal;
