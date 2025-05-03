import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import backgroundImg from "../assets/background.jpg";

function Home() {
  const [students, setStudents] = useState([]);
  const targetPerStudent = 40;

  useEffect(() => {
    axios.get("https://betwtw-production.up.railway.app/students").then((response) => {
      setStudents(response.data);
    });
  }, []);

  const sortedStudents = [...students].sort((a, b) => b.twtw_count - a.twtw_count);
  const top10 = sortedStudents.slice(0, 10);
  const belumSelesai = sortedStudents.filter((s) => s.twtw_count < targetPerStudent);

  return (
    <div className="space-y-10">
      {/* Welcome Slide */}
      <section
        className="min-h-screen flex flex-col justify-center items-center text-center text-white p-10"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-70 p-6 rounded-lg animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Selamat Datang di TWTW Tracker 🎯</h1>
          <p className="max-w-xl text-lg text-gray-300">
            Pantau progres teman-temanmu, capai target 40 TWTW sebelum deadline, dan lihat siapa yang menduduki leaderboard!
          </p>
        </div>
      </section>

      {/* Leaderboard Top 10 */}
      <section className="p-6 rounded-lg mx-4">
        <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center animate-fadeIn">
          🏆 Leaderboard Top 10
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {top10.map((student, index) => (
            <div
              key={student.id}
              className="bg-blue-900 text-white rounded-lg shadow p-4 flex flex-col items-center transform hover:scale-105 transition"
            >
              <span className="text-sm text-orange-300 mb-1">#{index + 1}</span>
              <h3 className="text-xl font-bold">{student.name}</h3>
              <p className="mb-2">{student.twtw_count} / 40 TWTW</p>
              <div className="w-full bg-gray-700 rounded h-2">
                <div
                  className="bg-orange-400 h-2 rounded"
                  style={{
                    width: `${Math.min((student.twtw_count / targetPerStudent) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mahasiswa Belum Selesai */}
      <section className="p-6 rounded-lg mx-4">
        <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center animate-fadeIn">
          ⏳ Mahasiswa Belum Selesai
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {belumSelesai.map((student) => (
            <Link
              key={student.id}
              to={`/edit/${student.name}`}
              className="bg-blue-900 text-white rounded-lg shadow p-4 flex flex-col items-center hover:bg-blue-800 transform hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold">{student.name}</h3>
              <p className="mb-2">{student.twtw_count} / 40 TWTW</p>
              <div className="w-full bg-gray-700 rounded h-2">
                <div
                  className="bg-orange-400 h-2 rounded"
                  style={{
                    width: `${Math.min((student.twtw_count / targetPerStudent) * 100, 100)}%`,
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
