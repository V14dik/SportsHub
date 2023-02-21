import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { AddArticle } from "./pages/add-article-page";

import { SingUp } from "./pages/sign-up-page";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/sign-up" element={<SingUp />} />
          <Route path="/add-article" element={<AddArticle />} />
          <Route path="/" element={<SingUp />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
