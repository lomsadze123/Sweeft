import { useState } from "react";
import Images from "../../components/images/Images";
import useClickId from "../../context/useClickContext";

const History = () => {
  const { query, setQuery } = useClickId();
  const [clicked, setClicked] = useState(false);
  const existingHistory: string[] = JSON.parse(
    localStorage.getItem("searchHistory") || "[]"
  );

  return (
    <div>
      <h1 className="my-8 text-3xl text-center font-bold">
        Words for which you searched
      </h1>
      <div className="flex justify-center gap-6 text-2xl text-white">
        {existingHistory.map((history, index) => (
          <button
            onClick={() => {
              setQuery(history);
              setClicked(true);
            }}
            className="bg-blue-500 p-2 rounded-lg"
            key={history + index}
          >
            {history}
          </button>
        ))}
      </div>
      {clicked && <Images key={query} />}
    </div>
  );
};

export default History;
