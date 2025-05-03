import { Link } from "react-router-dom";

function StudentList({ students }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {students.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">
          Tidak ada mahasiswa.
        </p>
      ) : (
        students.map((student) => (
          <Link
            key={student.id}
            to={`/edit/${student.name}`}
            className="bg-blue-800 p-4 rounded-lg shadow hover:shadow-lg transition w-full text-center"
          >
            <h3 className="text-lg font-semibold text-white">{student.name}</h3>
            <p className="text-sm text-gray-300">{student.twtw_count} orang TWTW</p>
          </Link>
        ))
      )}
    </div>
  );
}

export default StudentList;
