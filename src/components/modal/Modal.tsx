import useClickId from "../../context/useClickContext";
import useModal from "../../hooks/showModal/useShowModal";

const Modal = () => {
  const { clickId, setClickId } = useClickId();
  const { image } = useModal(clickId);

  const handleParentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.getAttribute("aria-label") === "parent") {
      setClickId("");
    }
  };

  return (
    <div
      aria-label="parent"
      onClick={handleParentClick}
      className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex flex-col justify-center items-center"
    >
      <div className="w-1/2 mx-auto bg-white">
        <div className="w-full h-[634px]">
          {image && (
            <img
              className="w-full h-full object-cover"
              src={image.urls.full}
              alt={image.id}
            />
          )}
        </div>
        <div className="mt-4 text-xl p-6">
          <h3>
            <span className="font-bold">Downloads:</span>{" "}
            {image?.downloads.toLocaleString()}
          </h3>
          <h4>
            <span className="font-bold">Views:</span>{" "}
            {image?.views.toLocaleString()}
          </h4>
          <h2>
            <span className="font-bold">Likes:</span>{" "}
            {image?.likes.toLocaleString()}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Modal;
