import { DiBower } from "react-icons/di";
// import "./../App.css";

export default function HomePage() {
  return (
    <div>
      <nav className="display flex justify-between mt-3 shadow-2xl">
        <div className="ml-5 mb-2 border rounded-full h-14 w-14 p-4 shadow-lg shadow-neutral-500">
          <DiBower style={{ fontSize: "3rem" }} />
        </div>
        <div className="display flex mr-24 m-auto relative">
          <button
            className="h-14 w-28 border rounded-3xl relative right-8 pr-3 hover:bg-slate-200 bg-white z-10"
            onClick={() => {
              alert("Signup clicked");
            }}
          >
            Sign Up
          </button>
          <button
            className="h-14 w-28 border rounded-3xl absolute left-12 pl-4 hover:bg-slate-200 bg-white z-0"
            onClick={() => {
              alert("signin clicked");
            }}
          >
            Sign In
          </button>
        </div>
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
          <img src="./../../public/image1.png" alt="image1" className="-rotate-12 opacity-50"/>
          <img src="./../../public/image2.png" alt="image2" className="rotate-12 opacity-50" />
        </div>
      </nav>
    </div>
  );
}
