import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/students/leaderboard").then((res) => {
      setLeaders(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {leaders.map((l, index) => (
        <div
          key={l.id}
          className="bg-white rounded-xl shadow-md border border-blue-200 p-4 flex flex-col items-center hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <div className="text-2xl font-bold text-blue-500 mb-2">
            #{index + 1}
          </div>
          <h3 className="text-lg font-semibold text-blue-700">{l.name}</h3>
          <p className="text-sm text-gray-600">{l.twtw_count} orang TWTW</p>
        </div>
      ))}
    </div>
  );
}

export default Leaderboard;
