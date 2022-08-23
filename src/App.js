import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";

function App() {


  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path={'/'} element={<Homepage />} />
          <Route path={'/coins/:id'} element={<CoinPage />} />
        </Routes>
      </div>
  );
}

export default App;