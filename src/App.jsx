import NavBar from "../src/components/header/NavBar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;
