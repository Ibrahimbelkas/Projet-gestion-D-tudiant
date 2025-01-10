<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'name', 'description',
    ];

    // Relation many-to-many avec Student (un cours peut avoir plusieurs étudiants)
    public function students()
    {
        return $this->belongsToMany(Student::class, 'course_student');
    }

    // Relation one-to-many avec Attendance
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    /*

       public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    // Relation avec Student via Enrollment
    public function students()
    {
        return $this->belongsToMany(Student::class, 'enrollments');
    }
    */
}    
