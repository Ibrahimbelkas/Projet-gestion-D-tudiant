import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({ courses = [], students = [] }) {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const { data, setData, post, processing, errors } = useForm({
    attendances: [],
  });

  // Filtrer les étudiants en fonction du cours sélectionné
  useEffect(() => {
    if (selectedCourse) {
      const studentsInCourse = students.filter(
        (student) =>
          Array.isArray(student.courses) &&
          student.courses.some((course) => course.id === parseInt(selectedCourse))
      );
      setFilteredStudents(studentsInCourse);
    } else {
      setFilteredStudents([]);
    }
  }, [selectedCourse, students]);

  // Mettre à jour les absences lors de la sélection
  const handleCheckboxChange = (studentId, checked) => {
    if (checked) {
      setData("attendances", [
        ...data.attendances,
        {
          student_id: studentId,
          course_id: selectedCourse,
          date: selectedDate,
          status: "absent",
        },
      ]);
    } else {
      setData(
        "attendances",
        data.attendances.filter((a) => a.student_id !== studentId)
      );
    }
  };

  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("attendance.store"));
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-8">
          Ajouter une Absence
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sélection du cours */}
              <div>
                <label
                  htmlFor="course"
                  className="block text-lg font-medium text-gray-700"
                >
                  Choisir un cours
                </label>
                <select
                  id="course"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">-- Sélectionner un cours --</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sélection de la date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-lg font-medium text-gray-700"
                >
                  Choisir une date
                </label>
                <input
                  type="date"
                  id="date"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>

            {/* Liste des étudiants */}
            {selectedCourse && selectedDate && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Étudiants inscrits
                </h2>
                <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                        Nom de l'Étudiant
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                        Marquer comme absent
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, index) => (
                      <tr
                        key={student.id}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-6 py-4 text-gray-700">
                          {student.user.name}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            onChange={(e) =>
                              handleCheckboxChange(student.id, e.target.checked)
                            }
                            checked={data.attendances.some(
                              (a) => a.student_id === student.id
                            )}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Affichage des erreurs */}
            {errors.attendances && (
              <p className="text-red-500 text-sm">{errors.attendances}</p>
            )}

            {/* Bouton de soumission */}
            <div className="text-right">
              <button
                type="submit"
                className={`px-6 py-3 text-white font-bold rounded-lg shadow ${
                  processing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={processing}
              >
                {processing ? "Enregistrement..." : "Enregistrer les absences"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}


  /*import React, { useState, useEffect } from "react";
  import { useForm } from "@inertiajs/react";

  export default function Create({ courses = [], students = [] }) {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);
    const { data, setData, post, errors } = useForm({
      attendances: [], // Table des absences à soumettre
    });

    // Filtrer les étudiants en fonction du cours sélectionné
    useEffect(() => {
      if (selectedCourse) {
        const studentsInCourse = students.filter(
          (student) =>
            Array.isArray(student.courses) &&
            student.courses.some(
              (course) => course.id === parseInt(selectedCourse)
            )
        );
        setFilteredStudents(studentsInCourse);
      } else {
        setFilteredStudents([]);
      }
    }, [selectedCourse, students]);

    // Mettre à jour les absences lorsque l'on coche/décoche une case
    const handleCheckboxChange = (studentId) => {
      const existingEntry = data.attendances.find((a) => a.student_id === studentId);

      if (existingEntry) {
        setData("attendances", data.attendances.filter((a) => a.student_id !== studentId));
      } else {
        setData("attendances", [
          ...data.attendances,
          {
            student_id: studentId,
            course_id: selectedCourse,
            date: selectedDate,
            status: "absent", // Statut par défaut
          },
        ]);
      }
    };

    // Soumettre le formulaire
    const handleSubmit = (e) => {
      e.preventDefault();

      // Formater les attendances
      const attendancesData = filteredStudents.map((student) => ({
        student_id: student.id,
        course_id: selectedCourse,
        date: selectedDate,
        status: data.attendances.some((a) => a.student_id === student.id) ? "absent" : "present", // Statut basé sur la sélection
      }));

      // Mettre à jour les données de la soumission
      setData("attendances", attendancesData);

      // Soumettre les données
      post(route("attendance.store"));
    };

    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Ajouter une Absence</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="course" className="block font-medium">
              Choisir un cours
            </label>
            <select
              id="course"
              className="border-gray-300 rounded mt-1 block w-full"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">-- Sélectionner un cours --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block font-medium">
              Choisir une date
            </label>
            <input
              type="date"
              id="date"
              className="border-gray-300 rounded mt-1 block w-full"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {selectedCourse && selectedDate && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Étudiants inscrits</h2>
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Nom de l'Étudiant</th>
                    <th className="border px-4 py-2">Marquer comme absent</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="border px-4 py-2">{student.user.name}</td>
                      <td className="border px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(student.id)}
                          checked={data.attendances.some((a) => a.student_id === student.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {errors.attendances && (
            <p className="text-red-500 text-sm mt-2">{errors.attendances}</p>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Enregistrer les absences
          </button>
        </form>
      </div>
    );
  }*/