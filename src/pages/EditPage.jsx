import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState("");
  const [studentId, setStudentId] = useState(null);

  // Fetch student detail to get ID
  useEffect(() => {
    axios.get("https://betwtw-production.up.railway.app/students")
      .then((res) => {
        const found = res.data.find((s) => s.name === name);
        if (found) {
          setStudentId(found.id);
          setCount(found.twtw_count);
        }
      })
      .catch(() => toast.error("Gagal memuat data mahasiswa"));
  }, [name]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://betwtw-production.up.railway.app/students/name/${name}`, {
        newName: name,
        twtw_count: parseInt(count),
      });
      toast.success("Data berhasil diupdate!");
      navigate("/");
    } catch (err) {
      toast.error("Gagal update!");
    }
  };

  const handleDelete = async () => {
    if (!studentId) {
      toast.error("ID mahasiswa tidak ditemukan");
      return;
    }
    try {
      await axios.delete(`https://betwtw-production.up.railway.app/students/${studentId}`);
      toast.success("Data berhasil dihapus!");
      navigate("/");
    } catch (err) {
      toast.error("Gagal menghapus data!");
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
      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 w-full"
        >
          Simpan Perubahan
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 w-full"
        >
          Hapus Data
        </button>
      </div>
    </div>
  );
}

export default EditPage;
