<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




/*Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});*/
Route::get('/',[AuthenticatedSessionController::class, 'create']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'IsAdmin'])->group(function () {
    // Routes pour les cours
    Route::resource('courses', CourseController::class);

    // Routes pour les étudiants
    Route::get('/admin/students', [StudentController::class, 'AfficherEtudiant'])->name('admin.students.index');
    Route::get('students/{student}', [StudentController::class, 'show'])->name('students.show');
    Route::get('/admin/students/edit/{id}', [StudentController::class, 'edit'])->name('admin.students.edit');
    Route::put('/admin/students/update/{id}', [StudentController::class, 'update'])->name('amdin.students.update');
    Route::get('students/{student}/attendances', [StudentController::class, 'attendances'])->name('students.attendances');
    
    ///
    Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
    Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create');
    Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');
    Route::get('/courses/{course}', [CourseController::class, 'show'])->name('courses.show');

    Route::get('enrollments', [EnrollmentController::class, 'index'])->name('enrollments.index');
    Route::post('enrollments', [EnrollmentController::class, 'store'])->name('enrollments.store');
    Route::get('/enrollment/search-students', [EnrollmentController::class, 'searchStudents'])->name('enrollment.searchStudents');
    Route::post('/enrollment/assign-courses', [EnrollmentController::class, 'assignCourses'])->name('enrollment.assignCourses');
    // Routes pour les absences
    Route::get('attendance', [AttendanceController::class, 'index'])->name('attendance.index');
    Route::get('attendance/create', [AttendanceController::class, 'create'])->name('attendance.create');
    
    // Enregistrement d'une nouvelle absence
    Route::post('attendance', [AttendanceController::class, 'store'])->name('attendance.store');
    Route::get('attendance/{attendance}/edit', [AttendanceController::class, 'edit'])->name('attendance.edit');
   
    Route::put('attendances/{attendance}', [AttendanceController::class, 'update'])->name('attendance.update');
});
Route::middleware(['auth', 'IsAdmin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
});

Route::middleware('auth')->group(function () {

    Route::middleware(['auth'])->get('/students', [StudentController::class, 'index'])->name('student.index');
}
);
/*Route::middleware(['auth', 'is_admin'])->group(function () {
    // Route pour gérer les étudiants
    Route::get('/admin/students', [StudentController::class, 'index'])->name('admin.students.index');

    // Route pour gérer les cours
    Route::get('/admin/courses', [CourseController::class, 'index'])->name('admin.courses.index');

    // Route pour gérer les absences
    Route::get('/admin/attendances', [AttendanceController::class, 'index'])->name('admin.attendances.index');
});*/
require __DIR__.'/auth.php';
