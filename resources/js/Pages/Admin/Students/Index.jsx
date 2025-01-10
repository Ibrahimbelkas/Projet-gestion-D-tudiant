import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";


export default function Index({ students }) {
  return (
    <AuthenticatedLayout>
      <Head title="Students" />
      <div className="py-6">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-blue-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">{student.user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">{student.user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">{student.programme}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b border-gray-200">
                    <div className="flex space-x-4">
                      <Link
                        href={`/admin/students/edit/${student.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      
                    
                    </div>
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
