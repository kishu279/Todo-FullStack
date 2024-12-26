import { Outlet, useNavigate } from "react-router";

import Logo from "./../component/Logo";
import ButtonSign from "./../component/ButtonSign";

export default function HomePage() {
  return (
    <div>
      {/* Upper Layer */}
      <nav className="display flex justify-between mt-3 shadow-2xl">
        <Logo />
        <ButtonSign />
      </nav>

      <nav>
        <div className="display flex flex-col items-center">
          <div>
            <h1 className="font-sans font-extralight text-7xl mt-16">Todo's</h1>
          </div>
          <div className="mt-20 font-mono font-light text-xl flex flex-col items-center">
            <p>Your favorite app to stay organized and up-to-date.</p>
            <p>Sign up today to take the first step towards productivity!</p>
          </div>
        </div>
      </nav>

      <nav>
        <div className="display flex justify-around mt-10">
          <img
            src="./../../public/image1.png"
            alt="image1"
            className="-rotate-12 opacity-50"
          />
          <img
            src="./../../public/image2.png"
            alt="image2"
            className="rotate-12 opacity-50"
          />
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
