<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Course;
use App\Models\Attendance;

class AdminDashboardController extends Controller
{

    public function index()
    {
        return inertia('Admin/Dashboard', [
            'studentsCount' => Student::count(),
            'coursesCount' => Course::count(),
            'absencesCount' => Attendance::where('status', 'absent')->count(),
        ]);
    }

}
