import { useEffect, useLayoutEffect, useState } from "react";
import Logo from "../component/Logo";
import Logout from "../component/Logout";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [errormssg, setErrormssg] = useState(null);
  const [todos, setTodo] = useState([]); //this is used to store and fetch the todos from backend
  const [add, setAdd] = useState(""); //this is used to set the todos and updating

  const [todoCheck, setTodoCheck] = useState(false); //the todo is checked or not

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

  async function handleAddTodo() {
    if (add.length == 0) {
      setErrormssg("The input field cannot be empty");
      return;
    }
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

  function handleCheck() {
    setTodoCheck(!todoCheck);
    console.log(todoCheck);
    // we will send the checked to backend and will render
    
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (errormssg) {
    return <div>{errormssg}</div>;
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
            className="border rounded-full w-[300px] font-mono text-xl"
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
              setAdd("");
            }}
          >
            add
          </button>
        </div>
      </nav>

      <nav className="flex justify-center mt-[50px] overflow-y-scroll">
        <div className="border shadow-lg h-[300px] w-[600px] display flex-col">
          {todos.length > 0
            ? todos.map((todo) => {
                return (
                  <ul
                    className="gap-2 shadow-md display flex justify-center"
                    key={todo._id}
                  >
                    <input
                      type="checkbox"
                      key={todo._id}
                      value={todoCheck}
                      onClick={() => {
                        handleCheck();
                      }}
                    />
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
