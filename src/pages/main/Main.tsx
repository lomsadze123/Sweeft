import Images from "../../components/images/Images";
import { Query } from "../../types/Types";

const Main = ({ query, setQuery }: Query) => {
  return (
    <main>
      <Images query={query} setQuery={setQuery} />
    </main>
  );
};

export default Main;
