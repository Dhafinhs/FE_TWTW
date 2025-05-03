import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState("");

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/students/name/${name}`, {
        newName: name,
        twtw_count: parseInt(count),
      });
      toast.success("Data berhasil diupdate!");
      navigate("/");
    } catch (err) {
      toast.error("Gagal update!");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-blue-800 rounded-lg shadow p-6 mt-10 text-white">
      <h2 className="text-2xl font-bold mb-4">Edit {name}</h2>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        placeholder="Jumlah TWTW baru"
        className="w-full px-4 py-2 rounded mb-4 text-black"
      />
      <button
        onClick={handleUpdate}
        className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600"
      >
        Simpan Perubahan
      </button>
    </div>
  );
}

export default EditPage;
