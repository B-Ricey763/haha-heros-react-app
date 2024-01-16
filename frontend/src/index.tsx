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
import { volunteersLoader } from "./components/App";

// Using Reacter Router dom allows for
// multiple routes with data fetching included
// I don't know if this is the best way to work with react router,
// but it does the trick.
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Navigate to="/viewer" />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/viewer"
        element={<Viewer />}
        errorElement={<ErrorPage />}
        loader={volunteersLoader}
      />
      <Route
        path="/admin"
        element={<Admin />}
        errorElement={<ErrorPage />}
        loader={volunteersLoader}
      />
      <Route
        path="/:id/notes"
        element={<NotesPage />}
        errorElement={<ErrorPage />}
      ></Route>
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
