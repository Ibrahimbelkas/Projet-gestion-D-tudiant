import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function CreateCourse() {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("courses.store"));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create Course" />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center tracking-wide">
  Create a New Course
</h1>

          <form onSubmit={submit} className="space-y-6">
            {/* Course Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
                Course Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Course Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                className={`px-6 py-3 font-semibold text-white rounded-lg shadow ${
                  processing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={processing}
              >
                {processing ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
