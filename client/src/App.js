import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { AddArticle } from "./pages/add-article-page";
import { SignIn } from "./pages/sign-in-page";

import { SignUp } from "./pages/sign-up-page";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/add-article" element={<AddArticle />} />
          <Route path="/" element={<SignUp />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
