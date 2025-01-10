<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'user_id', 'programme',
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_student');
    }

    // Relation one-to-one avec User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation one-to-many avec Attendance
    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
