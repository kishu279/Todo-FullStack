import { useState } from "react";
import { useNavigate } from "react-router";

function SignIn() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errormssg, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const navigator = useNavigate();

  async function handleSubmit() {
    if (!email || !pass) {
      setError("Recquired fields are necessary");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          pass: pass,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || `HTTP error status: ${res.status}`);
      }

      const body = await res.json();
      setResponse(body.message);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (response) {
    localStorage.setItem("todo-auth-token", response.token);

    setTimeout(() => {
      {
        navigator("/user/sourav");
      }
    }, 2000);
    return (
      <div className="border shadow-md shadow-green-400 h-14 text-3xl">
        <p>{response}</p>
      </div>
    );
  }

  if (errormssg) {
    return (
      <div className="boder shadow-md shadow-red-600 h-14 text-3xl">
        <p>{errormssg}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border shadow-lg drop-shadow-lg flex flex-col items-center justify-center h-[200px] w-[400px] gap-4">
        <input
          type="email"
          placeholder="Email ..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password ..."
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="border p-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errormssg, setErrorMessage] = useState(null);

  const navigator = useNavigate();

  async function handleSubmit() {
    if (!name || !email || !pass) {
      setErrorMessage("required fields are necessary");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          pass: pass,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || `HTTP error status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (response) {
    setTimeout(() => {
      navigator("/");
    }, 2000);

    return (
      <div className="border shadow-md shadow-green-400 h-14 text-3xl">
        <p>resoponse: {response}</p>
      </div>
    );
  }

  if (errormssg) {
    return (
      <div className="border shadow-md shadow-red-600 h-14 text-3xl">
        <p>error: {errormssg}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border flex flex-col items-center justify-center gap-4 h-[200px] w-[400px] shadow-lg drop-shadow-md">
        <input
          type="text"
          placeholder="Username ..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email ..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password ..."
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <button
          className="border rounded-lg p-2"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export { SignIn, SignUp };
