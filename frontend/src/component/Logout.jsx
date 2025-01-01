import { useState } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigator = useNavigate();
  function handleClick() {
    localStorage.removeItem("todo-auth-token");
    const timer = setTimeout(() => {
      navigator("/");
    }, 2000);

    // return clearTimeout(timer);
  }

  return (
    <div>
      <button
        className="h-14 w-28 border rounded-full mr-10 hover:bg-white hover:text-black bg-gray-900 text-white font-mono"
        onClick={() => {
          handleClick();
        }}
      >
        Logout
      </button>
    </div>
  );
}
