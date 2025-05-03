import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get("https://betwtw-production.up.railway.app/students/leaderboard").then((res) => {
      setLeaders(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {leaders.map((l, index) => (
        <Link
          key={l.id}
          to={`/edit/${l.name}`}
          className="bg-white rounded-xl shadow-md border border-blue-200 p-4 flex flex-col items-center hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
        >
          <div className="text-2xl font-bold text-blue-500 mb-2">
            #{index + 1}
          </div>
          <h3 className="text-lg font-semibold text-blue-700">{l.name}</h3>
          <p className="text-sm text-gray-600">{l.twtw_count} orang TWTW</p>
        </Link>
      ))}
    </div>
  );
}

export default Leaderboard;
