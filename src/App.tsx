import { Route, Routes, useLocation } from "react-router-dom";
import History from "./pages/history/History";
import Main from "./pages/main/Main";
import Header from "./components/header/Header";
import useClickId from "./context/useClickContext";
import useOverflow from "./hooks/overflow/useOverflow";
import { useEffect, useState } from "react";

const App = () => {
  const { clickId } = useClickId();
  useOverflow(clickId);
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setQuery("");
    }
  }, [location.pathname]);

  return (
    <div className={`${clickId && "overflow-hidden"}`}>
      <Header />
      <Routes>
        <Route path="/" element={<Main query={query} setQuery={setQuery} />} />
        <Route
          path="/history"
          element={<History query={query} setQuery={setQuery} />}
        />
      </Routes>
    </div>
  );
};

export default App;
