import { Routes, Route } from "react-router-dom";
import { Articles } from "./components/Articles";
import { Header } from "./components/Header";
import { AddArticle } from "./pages/add-article-page";
import { SignIn } from "./pages/sign-in-page";
import { EventsPage } from "./pages/events-page";

import { SignUp } from "./pages/sign-up-page";
import { ArticlePage } from "./pages/article-page";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CoursesPage } from "./pages/courses-page";
import { AddEvent } from "./pages/add-event-page";
import { CoursePage } from "./pages/course-page";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { EventPage } from "./pages/event-page";
import { CreateCoursePage } from "./pages/create-course-page";
import { ProfilePage } from "./pages/profile-page";
import { SubsPage } from "./pages/subs-page";
import { EditArticle } from "./pages/edit-article-page";

function App() {
  return (
    <>
      <Header />
      <main>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Routes>
            <Route path="/subscriptions" element={<SubsPage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/edit-article/:id" element={<EditArticle />} />
            <Route path="/create-course" element={<CreateCoursePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/" element={<Articles />} />
          </Routes>
        </LocalizationProvider>
      </main>
    </>
  );
}

export default App;
