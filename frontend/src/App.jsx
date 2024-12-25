import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from "./page/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
