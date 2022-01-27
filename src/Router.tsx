import {BrowserRouter, Routes, Route} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Header from "./Components/Header";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Coins />} />
        <Route path='/:coinId/*' element={<Coin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;