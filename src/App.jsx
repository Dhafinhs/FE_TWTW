import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import SelesaiPage from "./pages/SelesaiPage";
import EditPage from "./pages/EditPage";
import bannerImg from "./assets/banner.png";
import "./index.css";

function App() {
  const [counts, setCounts] = useState({ belum: 0, selesai: 0 });
  const targetPerStudent = 40;

  useEffect(() => {
    axios.get("http://localhost:3001/students").then((response) => {
      const data = response.data;
      const belum = data.filter((s) => s.twtw_count < targetPerStudent).length;
      const selesai = data.filter((s) => s.twtw_count >= targetPerStudent).length;
      setCounts({ belum, selesai });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-gray-100 font-sans flex flex-col">
      <nav className="sticky top-0 z-50 w-full bg-gray-800 border-b border-orange-400 shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={bannerImg} alt="Banner" className="h-10 w-auto rounded" />
          <Link to="/" className="text-xl font-bold text-orange-400">
            🏆 TWTW Tracker
          </Link>
        </div>

        <div className="flex gap-4">
          <Link
            to="/"
            className="relative bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition"
          >
            Belum Selesai
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2">
              {counts.belum}
            </span>
          </Link>
          <Link
            to="/selesai"
            className="relative bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
          >
            Sudah Selesai
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-2">
              {counts.selesai}
            </span>
          </Link>
        </div>
      </nav>

      <main className="flex-grow w-full px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/selesai" element={<SelesaiPage />} />
          <Route path="/edit/:name" element={<EditPage />} />
        </Routes>
      </main>

      <footer className="w-full text-center text-sm text-gray-400 py-4">
        © {new Date().getFullYear()} Dhafin 2306267145
      </footer>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
