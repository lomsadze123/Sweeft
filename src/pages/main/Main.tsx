import { useEffect } from "react";
import unsplashAPI from "../../utils/API";

const Main = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await unsplashAPI.get("/photos", {
          params: {
            order_by: "popular",
            per_page: 20,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return <main>Main</main>;
};

export default Main;
