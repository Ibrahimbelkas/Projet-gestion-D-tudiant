<?php

namespace App\Http\Controllers;
use App\Models\Student;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\Course;


class StudentController extends Controller
{

    public function index()
    {
       // $student = auth()->user()->student; // Récupérer l'étudiant authentifié
       $student = auth()->user()->student()->with('user')->first(); 
       // dd($student);
        $courses = $student->courses; // Récupérer les cours auxquels l'étudiant est inscrit
        $attendances = $student->attendances; // Récupérer les absences de l'étudiant
    
        return Inertia::render('Student/Index', [
            'student' => $student,
            'courses' => $courses,
            'attendances' => $attendances,
        ]);
    }
    public function AfficherEtudiant()
    {

        $students=Student::with('user')->get();
        return Inertia::render('Admin/Students/Index',
            ['students'=>$students]
    );
    }

    public function show($id)
    {
        // Récupérer l'étudiant avec les informations de l'utilisateur
        $student = Student::with('user')->findOrFail($id);
    
        // Retourner la vue avec les données
        return Inertia::render('Admin/Students/Show', [
            'student' => $student
        ]);
    }

    public function edit($id)
    {
        // Récupérer l'étudiant par son ID
        $student = Student::with('user')->findOrFail($id);

        // Passer les données à la vue
        return Inertia::render('Admin/Students/Edit', [
            'student' => $student
        ]);
    }
    public function update(Request $request, $id)
    {
        // Validation des données
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'programme' => 'required|string|max:255',
        ]);
    
        // Récupérer l'étudiant avec l'utilisateur associé
        $student = Student::with('user')->findOrFail($id);
    
        // Mettre à jour les informations de l'utilisateur (nom et email)
        $student->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);
    
        // Mettre à jour les informations de l'étudiant (programme)
        $student->update([
            'programme' => $validated['programme'],
        ]);
    
        // Rediriger vers la page de l'étudiant ou une autre page appropriée
        return redirect()->route('students.show', $id)->with('success', 'Student updated successfully');
    }

    
    public function attendances($id)
    {
        // Afficher les absences d'un étudiant
        $student = Student::with('attendances.course')->findOrFail($id);
        return Inertia::render('Students/Attendances', compact('student'));
    }
}
