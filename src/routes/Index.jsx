import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import ShowDetails from "../pages/ShowDetails";

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/show" element={<ShowDetails />} />
    </Routes>
  );
};

export default RoutesIndex;
