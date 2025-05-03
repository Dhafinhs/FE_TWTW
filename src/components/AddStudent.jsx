import { useState } from "react";
import axios from "axios";

function AddStudent() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/students", {
      name,
      twtw_count: count,
    });
    setName("");
    setCount(0);
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 justify-center"
    >
      <input
        className="border border-blue-300 p-3 rounded-lg w-full sm:w-auto flex-1 shadow focus:ring-2 focus:ring-blue-400"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border border-blue-300 p-3 rounded-lg w-full sm:w-32 shadow focus:ring-2 focus:ring-blue-400"
        type="number"
        placeholder="TWTW Count"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        required
      />
      <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
        Tambah
      </button>
    </form>
  );
}

export default AddStudent;
