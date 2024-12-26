import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from "./page/HomePage";
import { SignUp, SignIn } from "./page/UserSignPage";
import UserPage from "./page/UserPage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/signin" element={<SignIn />} />
          <Route path="/user/sourav" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
