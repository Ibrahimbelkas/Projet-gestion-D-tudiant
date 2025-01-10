import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Edit({ student }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: student.user.name,
        email: student.user.email,
        programme: student.programme,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.students.update', student.id), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Student" />

            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    Edit Student Information
                </h1>

                <form onSubmit={submit}>
                    {/* Name Input */}
                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter student's name"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-sm mt-2">{errors.name}</div>
                        )}
                    </div>

                    {/* Email Input */}
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter student's email"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-sm mt-2">{errors.email}</div>
                        )}
                    </div>

                    {/* Programme Input */}
                    <div className="mb-6">
                        <label
                            htmlFor="programme"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Programme
                        </label>
                        <input
                            id="programme"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.programme}
                            onChange={(e) => setData('programme', e.target.value)}
                            placeholder="Enter programme name"
                        />
                        {errors.programme && (
                            <div className="text-red-500 text-sm mt-2">{errors.programme}</div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-8">
                        <Link
                            href={route('admin.students.index')}
                            className="text-blue-600 hover:text-blue-800 transition duration-200"
                        >
                            Back to List
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200 shadow-md disabled:opacity-50"
                            disabled={processing}
                        >
                            {processing ? "Updating..." : "Update Student"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
