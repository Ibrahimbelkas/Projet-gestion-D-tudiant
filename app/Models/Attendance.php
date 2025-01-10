<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'student_id', 'course_id', 'date', 'status',
    ];
    /*
    
Textes complets
id	
student_id	
course_id
    */
    
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    // Relation many-to-one avec Course
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
