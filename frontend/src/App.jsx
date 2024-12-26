import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from "./page/HomePage";
import { SignUp, SignIn } from "./page/UserSignPage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        

        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/user/signup" element={<SignUp />} />
            <Route path="/user/signin" element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
