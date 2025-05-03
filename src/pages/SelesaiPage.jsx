import { useEffect, useState } from "react";
import axios from "axios";

function SelesaiPage() {
  const [students, setStudents] = useState([]);
  const targetPerStudent = 40;

  useEffect(() => {
    axios.get("https://betwtw-production.up.railway.app/students").then((response) => {
      setStudents(response.data.filter((s) => s.twtw_count >= targetPerStudent));
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
        Mahasiswa Sudah Selesai
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-blue-900 text-white rounded-lg p-4 shadow-md"
          >
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p className="text-sm text-gray-300">
              {student.twtw_count} / {targetPerStudent} orang TWTW ✅
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelesaiPage;
