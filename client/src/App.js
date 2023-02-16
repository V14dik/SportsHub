import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";

import { SingUp } from "./pages/sign-up-page";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<SingUp />} />
        <Route path="/" element={<SingUp />} />
      </Routes>
    </>
  );
}

export default App;
