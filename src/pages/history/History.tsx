import Images from "../../components/images/Images";
import { Query } from "../../types/Types";

const History = ({ query, setQuery }: Query) => {
  const existingHistory: string[] = JSON.parse(
    localStorage.getItem("searchHistory") || "[]"
  );

  const handleHistoryClick = (history: string) => {
    setQuery(history);
  };

  return (
    <div>
      <h1 className="my-8 text-3xl text-center font-bold">
        {existingHistory.length > 0
          ? "Words for which you searched"
          : "You have no history yet"}
      </h1>
      <div className="flex justify-center gap-6 text-2xl text-white">
        {existingHistory.map((history) => (
          <button
            onClick={() => handleHistoryClick(history)}
            className="bg-blue-500 p-2 rounded-lg"
            key={history}
          >
            {history}
          </button>
        ))}
      </div>
      {query && <Images key={query} query={query} setQuery={setQuery} />}
    </div>
  );
};

export default History;
