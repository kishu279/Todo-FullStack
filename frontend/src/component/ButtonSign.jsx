import { useNavigate } from "react-router";

export default function ButtonSign() {
  const navigator = useNavigate();
  return (
    <div className="display flex mr-24 m-auto relative bottom-1">
      <button
        className="h-14 w-28 border rounded-3xl relative right-8 pr-3 hover:bg-slate-200 bg-white z-10"
        onClick={() => {
          alert("Signup clicked");
          navigator("/user/signup");
        }}
      >
        Sign Up
      </button>
      <button
        className="h-14 w-28 border rounded-3xl absolute left-12 pl-4 hover:bg-slate-200 bg-white z-0"
        onClick={() => {
          alert("signin clicked");
          navigator("/user/signin");
        }}
      >
        Sign In
      </button>
    </div>
  );
}
