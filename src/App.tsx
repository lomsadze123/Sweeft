import { Route, Routes } from "react-router-dom";
import History from "./pages/history/History";
import Main from "./pages/main/Main";
import Header from "./components/header/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
};

export default App;
