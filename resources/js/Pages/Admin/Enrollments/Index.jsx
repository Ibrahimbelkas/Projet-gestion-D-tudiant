import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";

export default function EnrollmentIndex() {
    const { courses } = usePage().props;
    const [students, setStudents] = useState([]);
    const [searchId, setSearchId] = useState(""); // Modifier pour rechercher par ID
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchId.trim()) return;
        setLoading(true);
        try {
            // Recherche par student_id
            const response = await axios.get(route("enrollment.searchStudents"), {
                params: { id: searchId },  // Utilisation de student_id pour rechercher
            });
            setStudents(response.data.students);
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAssignCourses = async () => {
        if (!selectedStudent || selectedCourses.length === 0) {
            alert("Please select a student and at least one course.");
            return;
        }

        try {
            const response = await axios.post(route("enrollment.assignCourses"), {
                student_id: selectedStudent.id,
                courses: selectedCourses,
            });
            alert(response.data.message);
            setSelectedStudent(null);
            setSelectedCourses([]);
        } catch (error) {
            console.error("Error assigning courses:", error);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestion des inscriptions" />

            <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                Gestion des inscriptions
                </h1>

                {/* Search Section */}
                <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center w-2/3">
                        <input
                            type="text"
                            placeholder="Search students by ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="ml-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        {loading ? "recherche..." : "recherche"}
                    </button>
                </div>

                {/* Student List */}
                {students.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-700">Résultats de la recherche :</h2>
                        <ul className="border border-gray-200 rounded mt-2 shadow-md">
                            {students.map((student) => (
                                <li
                                    key={student.id}
                                    className={`p-4 cursor-pointer rounded-lg ${
                                        selectedStudent?.id === student.id
                                            ? "bg-blue-100 border-l-4 border-blue-500"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => setSelectedStudent(student)}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-800">{student.user.name}</span>
                                        <span className="text-sm text-gray-500">{student.user.email}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Course Selection */}
                {selectedStudent && (
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Assign Courses to: {selectedStudent.user.name}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4">
                            {courses.map((course) => (
                                <div key={course.id} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value={course.id}
                                        checked={selectedCourses.includes(course.id)}
                                        onChange={(e) => {
                                            const courseId = parseInt(e.target.value);
                                            setSelectedCourses((prev) =>
                                                e.target.checked
                                                    ? [...prev, courseId]
                                                    : prev.filter((id) => id !== courseId)
                                            );
                                        }}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span className="text-gray-700">{course.name}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={handleAssignCourses}
                            className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                        >
                            Affecter
                        </button>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
