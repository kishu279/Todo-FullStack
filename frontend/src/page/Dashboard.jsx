import { useEffect, useLayoutEffect, useState } from "react";
import Logo from "../component/Logo";
import Logout from "../component/Logout";

import "./../App.css";
import Delete from "../component/Delete";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [errormssg, setErrormssg] = useState(null);
  const [todos, setTodo] = useState([]); //this is used to store and fetch the todos from backend
  const [add, setAdd] = useState(""); //this is used to set the todos and updating
  const [selectTodo, setSelectTodo] = useState("");

  const token = localStorage.getItem("todo-auth-token");

  if (!token) {
    setErrormssg("sign in again!");
    return;
  }

  async function handleView() {
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

  // function handleSelect() {}

  async function handleDelete() {
    // we will send the checked to backend and will render
    if (selectTodo.length <= 0) {
      setErrormssg("first choose");
    }

    try {
      console.log(selectTodo);
      const response = await fetch(
        `http://localhost:3000/todo/remove?id=${selectTodo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const err = await response.json();
        setErrormssg(err.message || `An HTTP error status: ${err.status}`);
      }
      const data = await response.json();
      console.log(data.message);
    } catch (err) {
      throw new Error(err.message || "An unexpected error occurred");
    } finally {
      handleView();
      setSelectTodo("");
    }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setDeleteTodo(false);
  //   }, 2000);
  // }, [deleteTodo]);

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

      <nav
        style={{
          justifyItems: "center",
          marginTop: "100px",
        }}
      >
        <div
          style={{
            border: "2px solid black",
            height: "400px",
            width: "600px",
            fontSize: "22px",
            overflowY: "auto",
            textAlign: "center",
            boxShadow: "15px 10px 10px gray",
          }}
        >
          {todos.length > 0
            ? todos.map((todo) => (
                <ul
                  style={{
                    border: "1px solid black",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                  onClick={() => {
                    setSelectTodo(todo._id);
                  }}
                  key={todo._id}
                >
                  {todo.title}
                </ul>
              ))
            : "no todos"}
        </div>

        {selectTodo.length != 0 ? (
          <Delete handleDelete={handleDelete} />
        ) : (
          <div></div>
        )}
      </nav>
    </div>
  );
}
