<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Course;

class EnrollmentController extends Controller
{
    
    public function index()
    {
        $students = Student::with('user','courses')->get();
        //dd($students);
        $courses = Course::all();
        //dd($courses);
     
        return inertia('Admin/Enrollments/Index', compact('students', 'courses'));
    }
    

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'course_ids' => 'required|array',
            'course_ids.*' => 'exists:courses,id',
        ]);

        $student = Student::findOrFail($request->student_id);
        $student->courses()->sync($request->course_ids);

        return redirect()->route('enrollments.index')->with('success', 'Courses assigned successfully.');
    }


    public function searchStudents(Request $request)
{
    // Valider l'ID de l'étudiant
    $request->validate([
        'id' => 'required|integer|exists:students,id', // Valider l'ID de l'étudiant
    ]);

    $studentId = $request->input('id'); // Obtenir l'ID de l'étudiant depuis la requête

    // Rechercher l'étudiant par l'ID de l'étudiant
    $students = Student::where('id', $studentId)
                        ->with('user') // Inclure les informations de l'utilisateur si nécessaire
                        ->get();

    // Vérifier si des étudiants ont été trouvés
    if ($students->isEmpty()) {
        return response()->json([
            'message' => 'Aucun étudiant trouvé avec cet ID.',
            'students' => [],
        ], 404);
    }

    // Retourner les résultats sous forme de réponse JSON
    return response()->json([
        'message' => 'Étudiant trouvé avec succès.',
        'students' => $students,
    ], 200);
}

 /*   public function searchStudents(Request $request)
  {
    // Valider les données de recherche
    $request->validate([
        'query' => 'required|string|max:255',
    ]);

    $query = $request->input('query');

    // Rechercher les étudiants associés à des utilisateurs dont le nom ou l'email correspond à la requête
    $students = Student::whereHas('user', function ($q) use ($query) {
        $q->where('name', 'like', "%$query%")
          ->orWhere('email', 'like', "%$query%");
    })->with('user')->get();

    // Vérifier si des résultats sont trouvés
    if ($students->isEmpty()) {
        return response()->json([
            'message' => 'Aucun étudiant trouvé pour la requête donnée.',
            'students' => [],
        ], 404);
    }

    // Retourner les résultats sous forme de réponse JSON
    return response()->json([
        'message' => 'Étudiants trouvés avec succès.',
        'students' => $students,
    ], 200);
}*/


public function assignCourses(Request $request)
{
    try {
        // Valider les données entrantes
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'courses' => 'required|array',
            'courses.*' => 'exists:courses,id',
        ]);

        $student = Student::findOrFail($validated['student_id']);

        // Assigner les cours à l'étudiant
        $student->courses()->sync($validated['courses']);

        return response()->json(['message' => 'Courses assigned successfully!'], 200);
    } catch (\Exception $e) {
        // Log l'erreur pour le diagnostic
        \Log::error('Error in assignCourses: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to assign courses.'], 500);
    }
}



}
