// resources/js/Pages/Admin/Courses/Show.jsx
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function Show({ course }) {
    return (
        <AuthenticatedLayout>
            <Head title="Course Details" />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-xl font-bold">{course.name}</h2>
                        <p className="mt-2">{course.description}</p>

                        <div className="mt-4">
                            <Link
                                href={route('courses.edit', course.id)}
                                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            >
                                Edit Course
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
