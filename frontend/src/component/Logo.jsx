import { DiBower } from "react-icons/di";
import { useNavigate } from "react-router";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/");
      }}
      className="ml-5 mb-3 border rounded-full h-14 w-14 p-4 shadow-lg shadow-neutral-500"
    >
      <DiBower style={{ fontSize: "3rem" }} />
    </div>
  );
}
