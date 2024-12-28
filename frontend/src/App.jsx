import { BrowserRouter, Routes, Route } from "react-router";
import { RecoilRoot } from "recoil";

import HomePage from "./page/HomePage";
import { SignUp, SignIn } from "./page/UserSignPage";
import Dashboard from "./page/Dashboard";

export default function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}
