import { BrowserRouter, Routes, Route } from "react-router";
import { RecoilRoot } from "recoil";

import CustomErrorBoundary from "./component/CustomErrorBoundary";
import HomePage from "./page/HomePage";
import { SignUp, SignIn } from "./page/UserSignPage";
import Dashboard from "./page/Dashboard";
import ErrorPage from "./page/ErrorPage";

export default function App() {
  return (
    <div>
      <CustomErrorBoundary>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </CustomErrorBoundary>
    </div>
  );
}
