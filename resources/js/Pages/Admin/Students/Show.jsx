import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function StudentShow({ student }) {
    return (
        <AuthenticatedLayout>
            <Head title="Student Details" />
            
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">Student Details</h2>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Personal Information</h3>
                        <p><strong>Name:</strong> {student.user.name}</p>
                        <p><strong>Email:</strong> {student.user.email}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xl font-semibold">Program Information</h3>
                        <p><strong>Program:</strong> {student.programme}</p>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link 
                            href={route('admin.students.edit', student.id)} 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Edit
                        </Link>
                        
                        <Link 
                            href={route('admin.students.index')} 
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Back to List
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
