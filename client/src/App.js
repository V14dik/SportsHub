import { Routes, Route } from "react-router-dom";
import { Articles } from "./components/Articles";
import { Header } from "./components/Header";
import { AddArticle } from "./pages/add-article-page";
import { SignIn } from "./pages/sign-in-page";
import { EventsPage } from "./pages/events-page";

import { SignUp } from "./pages/sign-up-page";
import { ArticlePage } from "./pages/article-page";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/add-article" element={<AddArticle />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/" element={<Articles />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
