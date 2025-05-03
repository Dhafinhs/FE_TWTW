import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Link } from "react-router-dom";
import backgroundImg from "../assets/background.jpg";

function FadeInSection({ children }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

function Home() {
  const [students, setStudents] = useState([]);
  const targetPerStudent = 40;

  useEffect(() => {
    axios
      .get("https://betwtw-production.up.railway.app/students")
      .then((response) => {
        setStudents(response.data);
      });
  }, []);

  const sortedStudents = [...students].sort((a, b) => b.twtw_count - a.twtw_count);
  const top10 = sortedStudents.slice(0, 10);
  const belumSelesai = sortedStudents.filter((s) => s.twtw_count < targetPerStudent);

  return (
    <div className="space-y-10 font-sans">
      {/* Welcome Slide */}
      <section
        className=" flex flex-col justify-center items-center text-center text-white p-10"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
           backgroundRepeat: "no-repeat",
        }}
      >
        <div className=" animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Selamat Datang di TWTW Tracker</h1>
        </div>
      </section>

      {/* Leaderboard Top 10 */}
      <FadeInSection>
        <section className="p-6 rounded-lg mx-4">
          <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">🏆 Top 10 Leaderboard </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {top10.map((student, index) => {
              const percent = Math.min((student.twtw_count / targetPerStudent) * 100, 100);
              return (
                <FadeInSection key={student.id}>
                  <div className="card-animate bg-blue-900 bg-opacity-60 backdrop-blur-md text-white rounded-lg shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform">
                    <span className="text-sm text-orange-300 mb-1 font-semibold">#{index + 1}</span>
                    <h3 className="text-xl font-bold">{student.name}</h3>
                    <p className="mb-2">{student.twtw_count} / 40 TWTW</p>
                    <div className="w-full bg-gray-700 rounded h-2">
                      <div
                        className={`h-2 rounded ${
                          percent >= 100 ? "bg-green-400" : percent >= 50 ? "bg-yellow-400" : "bg-orange-400"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </section>
      </FadeInSection>

      {/* Mahasiswa Belum Selesai */}
      <FadeInSection>
        <section className="p-6 rounded-lg mx-4">
          <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">⏳ Mahasiswa Belum Selesai</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {belumSelesai.map((student) => {
              const percent = Math.min((student.twtw_count / targetPerStudent) * 100, 100);
              return (
                <FadeInSection key={student.id}>
                  <Link
                    to={`/edit/${student.name}`}
                    className="card-animate bg-blue-900 bg-opacity-60 backdrop-blur-md text-white rounded-lg shadow-xl p-6 flex flex-col items-center hover:bg-blue-800 transform hover:scale-105 transition-transform"
                  >
                    <h3 className="text-xl font-bold">{student.name}</h3>
                    <p className="mb-2">{student.twtw_count} / 40 TWTW</p>
                    <div className="w-full bg-gray-700 rounded h-2">
                      <div
                        className={`h-2 rounded ${
                          percent >= 100 ? "bg-green-400" : percent >= 50 ? "bg-yellow-400" : "bg-orange-400"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </Link>
                </FadeInSection>
              );
            })}
          </div>
        </section>
      </FadeInSection>
    </div>
  );
}

export default Home;
