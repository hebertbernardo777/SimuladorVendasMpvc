import NavBar from "./components/header/NavBar";
import "./App.css";
import { Outlet } from "react-router-dom";
import FormMultistep from "./pages/FormMultstep/FormMultistep";

function App() {
  return (
    <>
      <NavBar />
      <FormMultistep/>
      <Outlet />
    </>
  );
}

export default App;
