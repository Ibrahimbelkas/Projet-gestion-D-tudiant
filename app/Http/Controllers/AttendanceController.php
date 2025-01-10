<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;
use App\Models\Student;
use App\Models\Course;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        
        // Récupérer tous les cours
        $courses = Course::all();

        // Récupérer toutes les absences
        $attendancesQuery = Attendance::with(['student.user', 'course']);
       // dd($attendancesQuery);
        // Si un cours est sélectionné, filtrer les absences pour ce cours
        if ($request->has('course') && $request->input('course') != '') {
            $attendancesQuery->where('course_id', $request->input('course'));
        }

        // Obtenir les absences filtrées
        $attendances = $attendancesQuery->get();

        // Passer les données à la vue via Inertia
        return inertia('Admin/Attendance/Index', [
            'attendances' => $attendances,
            'courses' => $courses,
            'students' => Student::with('user')->get(),
        ]);
    }
    public function create(Request $request)
{
    $courses = Course::all();
    $students = Student::with('user','courses')->get();

    // Optionnel : Ajoutez un filtre pour les étudiants inscrits au cours sélectionné
    if ($request->has('course') && $request->input('course')) {
        $students = $students->filter(function ($student) use ($request) {
            return $student->courses->contains('id', $request->input('course'));
        });
    }

    return inertia('Admin/Attendance/Create', [
        'courses' => $courses,
        'students' => $students,
    ]);
}



public function store(Request $request)
{
    // Validation des données envoyées depuis le formulaire
    $validated = $request->validate([
        'attendances' => 'required|array',
        'attendances.*.student_id' => 'required|exists:students,id',
        'attendances.*.course_id' => 'required|exists:courses,id',
        'attendances.*.date' => 'required|date',
        'attendances.*.status' => 'required|in:present,absent',
    ]);

    // Enregistrement des absences pour chaque étudiant
    foreach ($validated['attendances'] as $attendanceData) {
        Attendance::create([
            'student_id' => $attendanceData['student_id'],
            'course_id' => $attendanceData['course_id'],
            'date' => $attendanceData['date'],
            'status' => $attendanceData['status'],
        ]);
    }

    // Retourner à la page des absences avec un message de succès
    return redirect()->route('attendance.index')->with('success', 'Absences enregistrées avec succès');
}


    // Modifier une absence
    public function edit($id)
    {
        $attendance = Attendance::with(['student.user', 'course'])->findOrFail($id);
        $courses = Course::all();
        
        return Inertia::render('Admin/Attendance/Edit', [
            'attendance' => $attendance,
            'courses' => $courses,
        ]);
    }
    

    // Mettre à jour une absence
    public function update(Request $request, $id)
{
    $request->validate([
        'course_id' => 'required|exists:courses,id',
        'student_id' => 'required|exists:students,id',
        'date' => 'required|date',
        'status' => 'required|in:present,absent,late',
    ]);

    $attendance = Attendance::findOrFail($id);
    $attendance->update($request->only(['course_id', 'student_id', 'date', 'status']));

    return redirect()->route('attendance.index')->with('success', 'Absence mise à jour avec succès');
}


    // Supprimer une absence
    public function destroy($id)
    {
        $attendance = Attendance::findOrFail($id);
        $attendance->delete();

        return redirect()->route('attendance.index')->with('success', 'Attendance deleted successfully!');
    }
}
