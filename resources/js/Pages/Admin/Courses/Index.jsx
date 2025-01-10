import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PencilIcon, TrashIcon, PlusCircleIcon } from "@heroicons/react/solid";

export default function Index({ courses }) {
    return (
        <AuthenticatedLayout>
            <Head title="Courses" />

            <div className="container mx-auto p-6">
                <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl bg-blue-600 py-4 px-6 rounded-lg shadow-md">
                Cours de gestion
</h1>

                    <Link
                        href={route("courses.create")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <PlusCircleIcon className="h-5 w-5 mr-2" />
                        Ajouter un nouveau cours
                    </Link>
                </div>

                <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {courses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{course.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{course.description}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 flex space-x-4">
                                        <Link
                                            href={route("courses.edit", course.id)}
                                            className="inline-flex items-center px-2 py-1 text-blue-600 hover:text-blue-800"
                                        >
                                            <PencilIcon className="h-5 w-5" />
                                            <span className="sr-only">Edit</span>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                confirm("Are you sure you want to delete this course?") &&
                                                (window.location.href = route("courses.destroy", course.id))
                                            }
                                            className="inline-flex items-center px-2 py-1 text-red-600 hover:text-red-800"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                            <span className="sr-only">Delete</span>
                                        </button>
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


/*import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

export default function Index({ courses }) {
    return (
        <AuthenticatedLayout>
            <Head title="Courses" />

            <div className="container mx-auto">
                <h1 className="text-2xl font-bold mb-4">Courses</h1>

                <Link href={route("courses.create")} className="mb-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">
                    Add New Course
                </Link>

                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Description</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td className="border border-gray-300 p-2">{course.name}</td>
                                <td className="border border-gray-300 p-2">{course.description}</td>
                                <td className="border border-gray-300 p-2 flex">
                                    <Link href={route("courses.edit", course.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                                        <PencilIcon className="h-5 w-5" />
                                    </Link>
                                    <button
                                        onClick={() => confirm("Are you sure?") && (window.location.href = route("courses.destroy", course.id))}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
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