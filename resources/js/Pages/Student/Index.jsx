import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { UserCircleIcon, BookOpenIcon, ClipboardListIcon } from "@heroicons/react/solid";

export default function Index({ student, courses, attendances }) {
  return (
    <AuthenticatedLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord Étudiant</h1>
            <p className="text-gray-500 mt-1">
              Consultez vos informations, vos cours et vos absences.
            </p>
          </div>

          {/* Informations Étudiant */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <UserCircleIcon className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-700">Informations de l'Étudiant</h2>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg shadow-sm">
              {student ? (
                <ul className="space-y-1">
                  <li><strong>Nom :</strong> {student.user?.name || "Nom non disponible"}</li>
                  <li><strong>Email :</strong> {student.user?.email || "Email non disponible"}</li>
                </ul>
              ) : (
                <p className="text-gray-200">Aucune information trouvée pour l'étudiant.</p>
              )}
            </div>
          </div>

          {/* Cours Inscrits */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <BookOpenIcon className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-700">Cours Inscrits</h2>
            </div>
            {courses && courses.length > 0 ? (
              <ul className="space-y-3">
                {courses.map((course) => (
                  <li
                    key={course.id}
                    className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded shadow-sm flex items-center"
                  >
                    <BookOpenIcon className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-sm font-medium text-gray-700">{course.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Aucun cours inscrit.</p>
            )}
          </div>

          {/* Absences */}
          <div>
            <div className="flex items-center mb-4">
              <ClipboardListIcon className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-700">Absences</h2>
            </div>
            {attendances && attendances.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2 text-gray-700">Cours</th>
                      <th className="border px-4 py-2 text-gray-700">Date</th>
                      <th className="border px-4 py-2 text-gray-700">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendances.map((attendance) => (
                      <tr key={attendance.id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">
                          {attendance.course?.name || "Non disponible"}
                        </td>
                        <td className="border px-4 py-2">{attendance.date || "N/A"}</td>
                        <td
                          className={`border px-4 py-2 font-medium ${
                            attendance.status === "Absent"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {attendance.status || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">Aucune absence enregistrée.</p>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
