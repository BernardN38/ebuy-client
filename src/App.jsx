import React from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Layout from "./shared/Layout/Layout";
// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
