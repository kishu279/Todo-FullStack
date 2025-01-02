export default function Delete({ handleDelete }) {
  return (
    <div>
      <button
        className="h-7 w-20 rounded-full bg-red-500 mt-10"
        onClick={() => {
          handleDelete();
        }}
      >
        X
      </button>
    </div>
  );
}
