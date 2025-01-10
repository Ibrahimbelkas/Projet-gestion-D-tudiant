// resources/js/Pages/Admin/Courses/Edit.jsx
// resources/js/Pages/Admin/Courses/Edit.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Head } from '@inertiajs/react';

export default function Edit({ course }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: course.name,
        description: course.description,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('courses.update', course.id), {
            onFinish: () => reset('name', 'description'),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Course" />
            <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-4xl font-bold text-white mb-8 text-center bg-gradient-to-r from-blue-500 to-indigo-600 py-4 rounded-lg shadow-md">
    <span className="uppercase tracking-wide">MODIFIER LE COURS</span>
</h1>

                <form onSubmit={submit}>
                    <div className="space-y-6">
                        {/* Course Name */}
                        <div>
                            <InputLabel htmlFor="name" value="Course Name" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        {/* Course Description */}
                        <div>
                            <InputLabel htmlFor="description" value="Description" />
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none h-32"
                                onChange={(e) => setData('description', e.target.value)}
                                required
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <PrimaryButton
                                className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                disabled={processing}
                            >
                                Update Course
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}




/*import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Head } from '@inertiajs/react';

export default function Edit({ course }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: course.name,
        description: course.description,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('courses.update', course.id), {
            onFinish: () => reset('name', 'description'),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Course" />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-xl sm:rounded-lg">
                    <form onSubmit={submit}>
                        <div className="px-4 py-5 sm:p-6">
                            <div>
                                <InputLabel htmlFor="name" value="Course Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="description" value="Description" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <PrimaryButton className="mt-4" disabled={processing}>
                                    Update Course
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
*/