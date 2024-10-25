import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App