<?php

namespace App\Http\Controllers;
use App\Models\Course;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        // Afficher tous les cours
        $courses = Course::all();
        return inertia('Admin/Courses/Index', compact('courses'));
    }

    public function show($id)
    {
        // Afficher les détails d'un cours spécifique
        $course = Course::findOrFail($id);
        return Inertia::render('Courses/Show', compact('course'));
    }

    public function create()
    {
        // Retourner la vue pour créer un nouveau cours
        return Inertia::render('Admin/Courses/Create');
    }

    public function store(Request $request)
    {
        // Valider et stocker un nouveau cours
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);

        Course::create($validated);
        return redirect()->route('courses.index');
    }

    public function edit($id)
    {
        // Afficher la vue d'édition pour un cours
        $course = Course::findOrFail($id);
        return Inertia::render('Admin/Courses/Edit', compact('course'));
    }

    public function update(Request $request, $id)
    {
        // Mettre à jour les informations du cours
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $course = Course::findOrFail($id);
        $course->update($validated);

        return redirect()->route('courses.index');
    }
}
