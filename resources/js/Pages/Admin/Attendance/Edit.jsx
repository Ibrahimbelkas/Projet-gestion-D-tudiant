
import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { PencilIcon, XIcon } from '@heroicons/react/outline'; // Icônes importées
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function Edit({ attendance, courses }) {
  const { data, setData, put, errors } = useForm({
    course_id: attendance.course.id,
    student_id: attendance.student.id,
    date: attendance.date,
    status: attendance.status,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('attendance.update', attendance.id), {
      onSuccess: () => {
        // Actions après succès (rediriger ou afficher un message)
      },
    });
  };

  return (
    <AuthenticatedLayout>
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-white mb-8 flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md">
        <PencilIcon className="w-6 h-6 text-white" />
        <span>Modifier l'Absence</span>
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-3/4 xl:w-1/2 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sélection du Cours */}
          <div>
            <label htmlFor="course_id" className="block text-sm font-medium text-gray-700">Cours</label>
            <select
              id="course_id"
              name="course_id"
              value={data.course_id}
              onChange={(e) => setData('course_id', e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            {errors.course_id && <p className="text-red-500 text-sm mt-1">{errors.course_id}</p>}
          </div>

          {/* Étudiant (readonly) */}
          <div>
            <label htmlFor="student_id" className="block text-sm font-medium text-gray-700">Étudiant</label>
            <input
              type="text"
              id="student_id"
              name="student_id"
              value={attendance.student.user.name}
              disabled
              className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Sélection de la Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={data.date}
              onChange={(e) => setData('date', e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          {/* Sélection du Statut */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Statut</label>
            <select
              id="status"
              name="status"
              value={data.status}
              onChange={(e) => setData('status', e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            >
              <option value="present">Présent</option>
              <option value="absent">Absent</option>
              <option value="late">En retard</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
          </div>

          <div className="flex space-x-4 justify-center mt-8">
            {/* Bouton Enregistrer */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <PencilIcon className="w-5 h-5 inline mr-2" /> Enregistrer
            </button>

            {/* Bouton Annuler */}
            <Link
              href={route('attendance.index')}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
            >
              <XIcon className="w-5 h-5 inline mr-2" /> Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
    </AuthenticatedLayout>
  );
}



/*import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Edit({ attendance, courses }) {
  const { data, setData, put, errors } = useForm({
    course_id: attendance.course.id,
    student_id: attendance.student.id,
    date: attendance.date,
    status: attendance.status,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('attendance.update', attendance.id), {
      onSuccess: () => {
        // Actions après succès (rediriger ou afficher un message)
      },
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier l'Absence</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="course_id" className="block text-sm font-medium">Cours</label>
          <select
            id="course_id"
            name="course_id"
            value={data.course_id}
            onChange={(e) => setData('course_id', e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.course_id && <p className="text-red-500 text-sm">{errors.course_id}</p>}
        </div>

        <div>
          <label htmlFor="student_id" className="block text-sm font-medium">Étudiant</label>
          <input
            type="text"
            id="student_id"
            name="student_id"
            value={attendance.student.user.name}
            disabled
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={data.date}
            onChange={(e) => setData('date', e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium">Statut</label>
          <select
            id="status"
            name="status"
            value={data.status}
            onChange={(e) => setData('status', e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          >
            <option value="present">Présent</option>
            <option value="absent">Absent</option>
            <option value="late">En retard</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Enregistrer
          </button>
          <Link
            href={route('attendance.index')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}*/
