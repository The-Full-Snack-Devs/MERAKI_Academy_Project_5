import "./App.css";
import { Route, Routes } from "react-router-dom";

//===============================================================

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
