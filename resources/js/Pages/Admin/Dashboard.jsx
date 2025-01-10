import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ studentsCount, coursesCount, absencesCount }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Student" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white border-b border-gray-200 shadow-sm sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-700">
                                Total Students
                            </h3>
                            <p className="mt-2 text-3xl font-bold text-indigo-600">
                                {studentsCount}
                            </p>
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200 shadow-sm sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-700">
                                Total Courses
                            </h3>
                            <p className="mt-2 text-3xl font-bold text-indigo-600">
                                {coursesCount}
                            </p>
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200 shadow-sm sm:rounded-lg">
                            <h3 className="text-lg font-medium text-gray-700">
                                Total Absences
                            </h3>
                            <p className="mt-2 text-3xl font-bold text-indigo-600">
                                {absencesCount}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a
                            href={route('admin.students.index')}
                            className="block p-6 bg-white border-b border-gray-200 shadow-sm sm:rounded-lg hover:bg-gray-100"
                        >
                            <h3 className="text-lg font-medium text-gray-700">
                                Manage Students
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                View, add, edit, and delete student records.
                            </p>
                        </a>
                        <a
                            href={route('courses.index')}
                            className="block p-6 bg-white border-b border-gray-200 shadow-sm sm:rounded-lg hover:bg-gray-100"
                        >
                            <h3 className="text-lg font-medium text-gray-700">
                                Manage Courses
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                View, add, edit, and delete courses.
                            </p>
                        </a>
                        <a
                            href={route('attendance.index')}
                            className="block p-6 bg-white border-b border-gray-200 shadow-sm sm:rounded-lg hover:bg-gray-100"
                        >
                            <h3 className="text-lg font-medium text-gray-700">
                                Manage Absences
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Track and manage student attendance records.
                            </p>
                        </a>
                          <a
                            href={route('enrollments.index')}
                            className="block p-6 bg-white border-b border-gray-200 shadow-sm sm:rounded-lg hover:bg-gray-100"
                        >
                            <h3 className="text-lg font-medium text-gray-700">
                                Affecter Etudiant
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Track and manage student attendance records.
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
