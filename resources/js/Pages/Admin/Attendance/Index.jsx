import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ClipboardIcon } from '@heroicons/react/outline'; // Assurez-vous que l'icône est correctement importée


export default function Index({ attendances, courses }) {
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleFilter = () => {
    router.get(route('attendance.index'), { course: selectedCourse });
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-white mb-10 flex items-center justify-center space-x-4 py-5 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
    <ClipboardIcon className="w-8 h-8 text-white" />
    <span>Gestion des Absences</span>
</h1>


<div className="bg-white shadow-lg rounded-lg p-8 w-1/2 mx-auto">
    <form>
      {/* Sélection du Cours */}
      <div className="mb-4">
        <label htmlFor="course" className="block text-gray-700 text-sm mb-2">Cours</label>
        <select
          id="course"
          name="course"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 text-sm"
        >
          <option value="">Sélectionner un cours</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Bouton Filtrer */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={handleFilter}
          className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Filtrer
        </button>
        <Link
          href={route('attendance.create')}
          className="w-1/2 bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
        >
          Ajouter une Absence
        </Link>
      </div>
    </form>
  </div>

  {/* Table des absences */}
  <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-3/4 xl:w-2/3 mx-auto mt-6">
  <table className="min-w-full table-auto border-collapse text-sm">
    <thead>
      <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <th className="px-6 py-3 text-left font-medium">Étudiant</th>
        <th className="px-6 py-3 text-left font-medium">Cours</th>
        <th className="px-6 py-3 text-left font-medium">Date</th>
        <th className="px-6 py-3 text-left font-medium">Statut</th>
        <th className="px-6 py-3 text-center font-medium">Actions</th>
      </tr>
    </thead>
    <tbody>
      {attendances.map((attendance) => (
        <tr key={attendance.id} className="border-t hover:bg-gray-100 transition duration-200">
          <td className="px-6 py-4">{attendance.student.user.name}</td>
          <td className="px-6 py-4">{attendance.course.name}</td>
          <td className="px-6 py-4">{attendance.date}</td>
          <td className="px-6 py-4">{attendance.status}</td>
          <td className="px-6 py-4 flex justify-center space-x-4">
            <Link
              href={route('attendance.edit', attendance.id)}
              className="text-blue-500 hover:text-blue-600 transition duration-300"
            >
               <PencilIcon className="h-5 w-5" />
            </Link>
            <form method="POST" action="#">
              <button
                type="submit"
                className="text-red-500 hover:text-red-600 transition duration-300"
                onClick={(e) => {
                  if (!confirm('Voulez-vous vraiment supprimer ?')) e.preventDefault();
                }}
              >
                 <TrashIcon className="h-5 w-5" />
              </button>
            </form>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div>

    </AuthenticatedLayout>
  );
}


/*import React, { useState } from 'react';
import { Head,Link, router } from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ attendances, courses }) {
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleFilter = () => {
    router.get(route('attendance.index'), { course: selectedCourse });
  };

  return (
    <AuthenticatedLayout>
            <Head title="Abcences" />
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Gestion des Absences</h1>

      <div className="mb-6 flex items-center space-x-4">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Tous les cours</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Filtrer
        </button>
        <Link
          href={route('attendance.create')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Ajouter une Absence
        </Link>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Étudiant</th>
            <th className="border px-4 py-2">Cours</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Statut</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance.id}>
              <td className="border px-4 py-2">{attendance.student.user.name}</td>
              <td className="border px-4 py-2">{attendance.course.name}</td>
              <td className="border px-4 py-2">{attendance.date}</td>
              <td className="border px-4 py-2">{attendance.status}</td>
              <td className="border px-4 py-2 flex space-x-2">
                <Link
                  href={route('attendance.edit', attendance.id)}
                  className="text-blue-500"
                >
                  Modifier
                </Link>
                <form
                  method="POST"
                  action="#"
                >
                  <button
                    type="submit"
                    className="text-red-500"
                    onClick={(e) => {
                      if (!confirm('Voulez-vous vraiment supprimer?')) e.preventDefault();
                    }}
                  >
                    Supprimer
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AuthenticatedLayout>
  );
}
*/