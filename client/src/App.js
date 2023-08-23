
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Books from "./pages/Books";
import NewEntry from "./pages/NewEntry";
import Edit from "./pages/Edit";
import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/create" element={<NewEntry/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
