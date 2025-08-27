import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Search from "./pages/search";
import Create from "./pages/create";
import Detail from "./pages/detail";



const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 p-5 max-w-[1440px] mx-auto w-full">
        <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add-gig" element={<Create />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

