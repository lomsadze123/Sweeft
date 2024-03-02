import useImageSearch from "../../hooks/fetch/useImageSearch";
import Modal from "../modal/Modal";
import useClickId from "../../context/useClickContext";

const Images = () => {
  const { data, loading, query, setQuery, handleSearchChange } =
    useImageSearch();
  const { clickId, setClickId } = useClickId();

  return (
    <div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="text-center sticky top-0"
      >
        <input
          className="border-2 w-full border-gray-500 outline-none my-8 max-w-[600px] p-3 rounded-lg"
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
            onClick={() => setClickId(image.id)}
            className="w-full max-w-[500px] h-[333px] bg-gray-500 lg:cursor-pointer"
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
      {clickId && <Modal />}
    </div>
  );
};

export default Images;
