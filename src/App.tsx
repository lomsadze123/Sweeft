import { Route, Routes } from "react-router-dom";
import History from "./pages/history/History";
import Main from "./pages/main/Main";
import Header from "./components/header/Header";
import useClickId from "./context/useClickContext";
import useOverflow from "./hooks/overflow/useOverflow";

const App = () => {
  const { clickId } = useClickId();
  useOverflow(clickId);

  return (
    <div className={`${clickId && "overflow-hidden"}`}>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
};

export default App;
