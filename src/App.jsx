import RoutesIndex from "./routes/Index";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <RoutesIndex />
      </BrowserRouter>
    </>
  );
}

export default App;
