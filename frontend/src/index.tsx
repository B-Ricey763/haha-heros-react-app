import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Admin from "./routes/admin";
import ErrorPage from "./routes/error-page";
import NotesPage from "./routes/notes";
import Viewer from "./routes/viewer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Navigate to="/viewer" />}
        errorElement={<ErrorPage />}
      />
      <Route path="/viewer" element={<Viewer />} errorElement={<ErrorPage />} />
      <Route path="/admin" element={<Admin />} errorElement={<ErrorPage />} />
      <Route path="/:id/notes" element={<NotesPage />}></Route>
    </>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
