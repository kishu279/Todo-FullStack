import { useEffect, useLayoutEffect, useState } from "react";
import Logo from "../component/Logo";
import Logout from "../component/Logout";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [errormssg, setErrormssg] = useState(null);
  const [todos, setTodo] = useState([]);
  const [add, setAdd] = useState("");
  const token = localStorage.getItem("todo-auth-token");

  async function handleView() {
    if (!token) {
      setErrormssg("sign in again!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/todo/view", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.mssg || `HTTP error status: ${res.status}`);
      }

      const data = await res.json();
      setTodo(data.data);
    } catch (err) {
      throw new Error(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleView();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (errormssg) {
    return <div>{errormssg}</div>;
  }

  async function handleAddTodo() {
    try {
      const res = await fetch("http://localhost:3000/todo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: add,
        }),
      });

      if (!res.ok) {
        const err = res.json();
        setErrormssg(err.message || `HTTP status error: ${res.status}`);
      }

      console.log("added");
      handleView();
    } catch (err) {
      throw new Error(err.message || "An unknown error occurred");
    }
  }

  return (
    <div>
      <nav className="mt-3 shadow-lg display flex justify-between">
        <Logo />
        <Logout />
      </nav>

      <nav>
        <div className="display flex justify-center mt-[50px] display gap-2">
          <input
            className="border w-[300px] font-mono text-xl"
            type="text"
            value={add}
            placeholder="add todos..."
            onChange={(e) => {
              setAdd(e.target.value);
            }}
          />
          <button
            className="border rounded-lg w-20"
            onClick={() => {
              handleAddTodo();
            }}
          >
            add
          </button>
        </div>
      </nav>

      <nav className="flex justify-center mt-[50px]">
        <div className="border shadow-lg h-[300px] w-[600px] display flex-col">
          {todos.length > 0
            ? todos.map((todo) => {
                return (
                  <ul
                    className="gap-2 shadow-md display flex justify-center"
                    key={todo._id}
                  >
                    {todo.title}
                  </ul>
                );
              })
            : "No todos"}
        </div>
      </nav>
    </div>
  );
}
